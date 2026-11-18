import { LegalPage, legalMetadata } from "@/components/sections/legal-page";
import { refund } from "@/content/legal";

export const metadata = legalMetadata(refund);

export default function Page() {
  return <LegalPage doc={refund} />;
}
