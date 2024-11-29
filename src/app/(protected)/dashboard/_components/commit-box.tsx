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
import { cn } from "~/lib/utils";
import Image from "next/image";
import GlassCard from "~/components/glass-card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import useRefetch from "~/hooks/use-refetch";

const CommitBox = () => {
  const refetch = useRefetch();
  const { projectId, project } = useProject();
  const { data: commits, refetch: refetchCommits } = api.project.getCommits.useQuery({ projectId });

  React.useEffect(() => {
    if (commits) {
      refetch();
    }
  }, [commits, refetch]);
  return (
    <div>
      <ul className="space-y-6">
        {commits?.map((commit, commitIdx) => (
          <li key={commit.id} className="relative flex gap-x-4">
            <div
              className={cn(
                commitIdx === commits.length - 1 ? "h-6" : "-bottom-6",
                "absolute left-0 top-0 flex w-6 justify-center",
              )}
            >
              <div className="w-px translate-x-1 translate-y-5 bg-purple-200/40"></div>
            </div>
            <>
              <Image
                src={commit.commitAuthorAvatar}
                alt="author avatar"
                width={46}
                height={46}
                className="relative mt-5 size-8 flex-none rounded-full bg-gray-50"
              />
              <GlassCard className="w-full">
                <CardHeader className="flex flex-col items-start justify-start space-y-0 border-b p-0 px-3 py-4 max-sm:flex-row">
                  <CardTitle className="font-medium">
                    <Link
                      target="_blank"
                      href={`${project?.githubUrl}/commits/${commit.commitHash}`}
                      className="flex items-center justify-center gap-x-1 py-0.5 text-sm leading-5 transition-colors duration-300 hover:text-foreground"
                    >
                      <span className="text-foreground">
                        {commit.commitAuthorName}
                      </span>
                      <span className="inline-flex items-center justify-center text-primary/60 transition-colors duration-300 hover:text-foreground">
                        commited
                        <ExternalLink size={12} className="ml-2" />
                      </span>
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-md font-semibold leading-5 text-primary">
                    {commit.commitMessage}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                  <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/70">{commit.summary}</pre>
                </CardContent>
              </GlassCard>
            </>
          </li>
        ))}
      </ul>
      {/* */}
    </div>
  );
};

export default CommitBox;
