import { SplitText } from "@/components/motion/split-text";
import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  className,
}: {
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12", className)}>
      <p className="micro-label pt-3 md:col-span-3">[ {label} ]</p>
      <SplitText
        as="h2"
        text={title}
        className="font-display text-display font-semibold tracking-tight md:col-span-9"
      />
    </div>
  );
}
