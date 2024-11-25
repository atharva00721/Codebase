import React from "react";
import useProject from "~/hooks/useProject";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
const CommitBox = () => {
  const { projectId } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });
  return (
    <div>
      {commits?.map((commit) => (
        <div key={commit.id} className="flex w-full gap-4">
          <Card className="w-full rounded-lg">
            <CardHeader className="flex flex-col items-start space-y-0 border-b p-0 sm:flex-row">
              <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle className="capitalize">
                  {commit.commitAuthorName}
                </CardTitle>
                <CardDescription>
                  {commit.commitDate.toString()}
                  <br />
                  {commit.commitMessage}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">{commit.summary}</CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CommitBox;
