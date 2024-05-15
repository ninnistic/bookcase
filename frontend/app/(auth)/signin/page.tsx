import Link from "next/link";

import { SignInForm } from "@/components/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function SignInPage() {
  return (
    <main className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Make your own Bookcase!</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <Link className="underline ml-2" href="signup">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
