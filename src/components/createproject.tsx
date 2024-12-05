"use client";
import React from "react";
import {
  Aether,
  AetherContent,
  AetherDescription,
  AetherHeader,
  AetherTitle,
  AetherTrigger,
} from "./responsive-modal";
import { Plus } from "lucide-react";

import Image from "next/image";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useRefetch from "~/hooks/use-refetch";
import { api } from "~/trpc/react";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreateProject = () => {
  const refetch = useRefetch();
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProject = api.project.createProject.useMutation();
  function onSubmit(data: FormInput) {
    createProject.mutate(
      {
        name: data.projectName,
        repoUrl: data.repoUrl,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          reset();
          refetch();
        },
        onError: (error) => {
          toast.error("Failed to create project");
        },
      },
    );
    return true;
  }
  return (
    <Aether>
      <AetherTrigger
        className={
          "hover:bg-background/670 flex gap-2 rounded-xl bg-background p-2"
        }
      >
        <div className="flex size-6 items-center justify-center rounded-lg border bg-background">
          <Plus className="size-4" />
        </div>
        <div className="text-mute d-foreground mr-2 font-light">
          Add Project
        </div>
      </AetherTrigger>

      <AetherContent
        className={
          "dark:glassmorphism2 light:bg-white rounded-lg bg-opacity-90 bg-clip-padding px-4 py-8 backdrop-blur-3xl backdrop-filter dark:border-themeGray"
        }
      >
        <AetherHeader>
          <AetherTitle className="text-2xl font-semibold dark:text-white">
            Link Your Github Repository
          </AetherTitle>
          <AetherDescription className="text-xs text-muted-foreground">
            Enter the URL of the repo to link it to codebase
          </AetherDescription>
        </AetherHeader>
        <div className="mx-auto flex h-full flex-col items-center justify-center gap-12 max-md:w-full md:flex-row">
          <Image
            src="/images/shycat.png"
            alt="Create"
            width={200}
            height={200}
          />
          <div>
            <div className="h-4" />
            <div className="">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-y-2"
              >
                <Input
                  {...register("repoUrl", { required: true })}
                  placeholder="Repository URL"
                  required
                />
                <Input
                  {...register("projectName", { required: true })}
                  placeholder="Project Name"
                  required
                />
                <Input
                  {...register("githubToken")}
                  placeholder="Github Token"
                />
                <Button type="submit" disabled={createProject.isPending}>
                  Create Project
                </Button>
              </form>
            </div>
          </div>
        </div>
      </AetherContent>
    </Aether>
  );
};

export default CreateProject;
