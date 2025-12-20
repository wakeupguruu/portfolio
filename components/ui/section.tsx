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
      className={cn("mb-24 md:mb-36", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-2xl px-5 md:px-16", className)} {...props}>
      {children}
    </div>
  );
}
