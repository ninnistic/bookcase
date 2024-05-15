import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Sign In to Create a Bookcase</CardTitle>
          <CardDescription>Make your own Bookcase!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
