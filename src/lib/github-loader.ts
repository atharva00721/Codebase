import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summariseCode } from "./gemini";
import { db } from "~/server/db";

class GitHubRateLimitError extends Error {
  constructor() {
    super('GitHub API rate limit exceeded. Please provide a GitHub token for higher rate limits.');
    this.name = 'GitHubRateLimitError';
  }
}

export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  try {
    const loader = new GithubRepoLoader(githubUrl, {
      accessToken: githubToken || "",
      branch: "main",
      ignoreFiles: [
        "pnpm-lock.yaml",
        "package-lock.json",
        "yarn.lock",
        "bun.lockb",
        "dist",
        "build",
      ],
      recursive: true,
      unknown: "warn",
      maxConcurrency: 5,
    });
    return await loader.load();
  } catch (error: any) {
    if (error.message?.includes('API rate limit exceeded')) {
      throw new GitHubRateLimitError();
    }
    throw error;
  }
}

const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc) => {
      console.log(`Summarizing file: ${doc.metadata.src}`);
      const summary = await summariseCode(doc);
      const embedding = await generateEmbedding(summary);
      return {
        summary,
        embedding,
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        fileName: doc.metadata.src,
      };
    }),
  );
};

export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  const docs = await loadGithubRepo(githubUrl, githubToken);
  const allEmbeddings = await generateEmbeddings(docs);
  for (const [index, embedding] of allEmbeddings.entries()) {
    console.log(`Indexing ${index + 1}/${allEmbeddings.length}`);
    if (!embedding) {
      continue;
    }
    const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
      data: {
        summary: embedding.summary,
        sourceCode: embedding.sourceCode,
        fileName: embedding.fileName,
        projectId,
      },
    });

    await db.$executeRaw`
    UPDATE "sourceCodeEmbedding"
    SET "summaryEmbedding" = ${embedding.embedding}::vector
    WHERE "id" = ${sourceCodeEmbedding.id}`;

    
  }
};
