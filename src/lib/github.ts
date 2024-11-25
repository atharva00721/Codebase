import { Octokit, App } from "octokit";
import { db } from "~/server/db";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const gitUrl = "https://github.com/docker/genai-stack";

type Response = {
  commitMessage: string;
  commitHash: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

export const gitCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  const { data } = await octokit.rest.repos.listCommits({
    owner: "docker",
    repo: "genai-stack",
  });
  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  ) as any[];
  return sortedCommits.slice(0, 15).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author?.date ?? "",
  }));
  //   const [owner, repo] = githubUrl.split("/").slice(-2);
  //   const response = await octokit.request(`GET /repos/${owner}/${repo}/commits`);
  //   return response.data.map((commit: any) => ({
  //     commitMessage: commit.commit.message,
  //     commitHash: commit.sha,
  //     commitAuthorName: commit.commit.author.name,
  //     commitAuthorAvatar: commit.author.avatar_url,
  //     commitDate: commit.commit.author.date,
  //   }));
};

export const pullCommits = async (projectId: string) => {
  const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
  const commitHashes = await gitCommitHashes(githubUrl);
  const unprocessedCommits = await filterUnprocessedCommits(
    commitHashes,
    projectId,
  );
  console.log(unprocessedCommits);
  return unprocessedCommits;
};

async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { githubUrl: true },
  });
  if (!project) {
    throw new Error("Project has no github Url");
  }
  return { project, githubUrl: project?.githubUrl };
}

async function filterUnprocessedCommits(
  commitHashes: Response[],
  projectId: string,
) {
  const processedCommits = await db.commit.findMany({
    where: { projectId },
  });
  const unprocessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some(
        (processedCommits) => processedCommits.commitHash === commit.commitHash,
      ),
  );
  return unprocessedCommits;
}

await pullCommits("cm3w7e62d0000zf84hzjjem7k").then(console.log);
