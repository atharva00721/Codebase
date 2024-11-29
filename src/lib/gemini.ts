import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const AISummarizeCommits = async (diff: string) => {
  const response = await model.generateContent([
    `You are an expert programmer, and you are trying to summarize a git diff.
Reminders about the git diff format:
For every file, there was a few metadata lines, like (for example):
\`\`\`
diff --git a/lib/index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
\`\`\`
This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
Then there is a specifier of the lines that were modified.
A line starting with \`+\` means it was added.
A line that starting with \`-\` means that line was deleted.
A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
It is not part of the diff.
[...]
EXAMPLE SUMMARY COMMENTS:
\`\`\`
* Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
* Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
* Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
* Added an OpenAI API for completions [packages/utils/apis/openai.ts]
* Lowered numeric tolerance for test files
\`\`\`
Most commits will have less comments than this examples list.
The last comment does not include the file names,
because there were more than two relevant files in the hypothetical commit.
Do not include parts of the example in your summary.
It is given only as an example of appropriate comments.
`,
    `Please summarize the following diff files:, \n\n${diff}`,
  ]);
  console.log(response.response.text());
  return response.response.text();
};

export const summariseCode = async (doc: Document) => {
  console.log("Summarizing code for: ", doc.metadata.src);
  const code = doc.pageContent.slice(0, 10000);
  const response = await model.generateContent([
    `You are an intelligent senior software engineer, Who specialises in onboarding junior software engineers onto projects.`,
    `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.src} file
    here is the code:
    ---
    ${code}
    ---
    Give a summary no more than 100 words of above code`,
  ]);
  // console.log(response.response.text());
  return response.response.text();
};

export async function generateEmbedding(summary: string) {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  const result = await model.embedContent(summary);
  const embedding = result.embedding;
  return embedding.values;
}

console.log(await generateEmbedding("This is a test"));
