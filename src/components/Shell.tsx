
import { Header } from "@/components/Header";
import { PageFooter } from "@/components/PageFooter";

interface ShellProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

export function Shell({ children, hideHeader = false }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      <PageFooter />
    </div>
  );
}
