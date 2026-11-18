import { LegalPage, legalMetadata } from "@/components/sections/legal-page";
import { terms } from "@/content/legal";

export const metadata = legalMetadata(terms);

export default function Page() {
  return <LegalPage doc={terms} />;
}
