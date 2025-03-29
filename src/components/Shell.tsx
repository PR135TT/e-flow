
import { Header } from "@/components/Header";
import { PageFooter } from "@/components/PageFooter";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <PageFooter />
    </div>
  );
}
