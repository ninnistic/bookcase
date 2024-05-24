import React from "react";
import Link from "next/link";

import { SignUpForm } from "@/components/custom/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <main className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Make your own Bookcase!</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm">
        Have an account?
        <Link className="underline ml-2" href="signin">
          Sign In
        </Link>
      </div>
    </main>
  );
}
