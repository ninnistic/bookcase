import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
    </main>
  );
}
