"use client";

import Image from "next/image";
import React from "react";
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

const CreatePage = () => {
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
    <div className="mx-auto flex h-full flex-col items-center justify-center gap-12 max-md:w-full md:flex-row">
      <Image src="/images/shycat.png" alt="Create" width={200} height={200} />
      <div>
        <h1 className="text-3xl font-semibold">Link Your Github Repository</h1>
        <p className="text-sm text-muted-foreground">
          Enter the URL of the repo to link it to codebase
        </p>
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
            <Input {...register("githubToken")} placeholder="Github Token" />
            <Button type="submit" disabled={createProject.isPending}>
              Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
