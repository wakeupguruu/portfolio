import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("mb-16 md:mb-24", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-0" {...props}>
      {children}
    </div>
  );
}
