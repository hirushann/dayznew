import Image from "next/image";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

export function ProductLogo({
  product,
  className,
  eager,
}: {
  product: Product;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={product.logo.src}
      alt={product.name}
      width={product.logo.width}
      height={product.logo.height}
      sizes="240px"
      loading={eager ? "eager" : "lazy"}
      className={cn("h-8 w-auto", className)}
    />
  );
}
