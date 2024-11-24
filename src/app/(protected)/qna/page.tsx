"use client";

import { useUser } from "@clerk/nextjs";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function qna() {
  const { user } = useUser();

  return (
    <Card>
      <CardHeader className="flex flex-col items-start space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="capitalize">qna</CardTitle>
          <CardDescription>
            {user?.emailAddresses[0]?.emailAddress}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">hello</CardContent>
    </Card>
  );
}
