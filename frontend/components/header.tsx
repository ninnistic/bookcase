import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <nav className="flex justify-end w-full p-6">
      <ModeToggle />
    </nav>
  );
}
