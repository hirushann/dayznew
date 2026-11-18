// Policy pages required by PayHere (https://support.payhere.lk/policy-samples), adapted to a services business.
// TODO: confirm — have the business owner review windows (14 days, 7–14 business days) and minimum age before going live.
import { site } from "./site";

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

const updated = "18 November 2026";
const contact = `${site.email}, or by post to ${site.name}, ${site.address.street}, ${site.address.locality} ${site.address.postalCode}, Sri Lanka`;

export const terms: LegalDoc = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  updated,
  intro: `These Terms and Conditions govern your use of ${site.url.replace("https://", "")} and the purchase of services and products from ${site.name}. By accessing this website or paying for our services, you agree to these terms. Please read them carefully before making a payment.`,
  sections: [
    {
      heading: "Use of the website",
      body: [
        "You must be at least 18 years old, or have the consent of a parent or guardian, to use this website or make a purchase.",
        "You are responsible for keeping any account details and passwords we provide confidential.",
        "You agree to give accurate, current and complete information when contacting us, signing up or paying.",
        "You may not use this website for any unlawful or unauthorised purpose.",
      ],
    },
    {
      heading: "Services, products and pricing",
      body: [
        "We provide custom software development, web and mobile app development, UI/UX design, quality assurance and related services, and software products such as eZearch.",
        "We make every reasonable effort to describe our services and products accurately. The scope, deliverables, timeline and price of custom work are set out in the written proposal or quotation you accept.",
        "Prices are in Sri Lankan Rupees (LKR) unless stated otherwise and may change without notice. A price confirmed in an accepted proposal or invoice will not change for that order.",
      ],
    },
    {
      heading: "Orders and payments",
      body: [
        "Accepting a proposal or paying an invoice is an offer to buy the services or products described in it.",
        "We may refuse or cancel an order, for example if a service is unavailable, there is an error in the price or description, or we suspect fraud. If we cancel after you have paid, we refund you in full.",
        "You agree to provide valid payment details and authorise us to charge the total amount shown, including any applicable taxes.",
        "Online payments are processed securely by PayHere (PayHere (Pvt) Ltd), a third-party payment gateway. We do not store or have access to your full card details.",
      ],
    },
    {
      heading: "Delivery of services",
      body: [
        "Services are delivered digitally: by email, through a shared repository or online workspace, or by deploying to your hosting. No physical goods are shipped.",
        "Delivery dates and milestones are agreed in your proposal. They are estimates and may change if requirements change or we are waiting on information from you; we will keep you informed of any delay.",
        "Subscriptions to our software products are activated once payment is confirmed, normally within 1 business day.",
      ],
    },
    {
      heading: "Cancellations, returns and refunds",
      body: [
        "Cancellations and refunds are governed by our Refund Policy at /refund-policy, which forms part of these terms.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "All content on this website, including text, images, logos and graphics, is owned by or licensed to us and may not be used, reproduced, distributed or modified without our prior written consent.",
        "Ownership of work we create for you is set out in your proposal or agreement. Unless it says otherwise, ownership of custom deliverables passes to you once they are paid for in full.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, we are not liable for any indirect, incidental, special or consequential damages arising from your use of this website or of our services and products.",
        "Our total liability for any claim relating to an order is limited to the amount you paid for that order.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of the Democratic Socialist Republic of Sri Lanka, and the courts of Sri Lanka have jurisdiction over any dispute.",
      ],
    },
    {
      heading: "Changes to these terms",
      body: [
        "We may change or update these terms at any time without prior notice. Changes take effect when posted on this page, so please review it from time to time.",
      ],
    },
    {
      heading: "Contact us",
      body: [`Questions about these terms can be sent to ${contact}.`],
    },
  ],
};

export const privacy: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  updated,
  intro: `${site.name} is committed to protecting the privacy and security of your personal information. This policy explains how we collect, use and protect your information when you visit our website, contact us or buy our services and products. By using this website, you agree to this policy.`,
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Personal identification information, such as your name, email address, phone number and company name, which you give us through our contact form, by email or when you pay.",
        "Payment and billing information needed to process your payment. Card payments are handled securely by our payment gateway, PayHere; we never receive or store your full card details.",
        "Browsing information, such as your IP address, browser type and device information, collected automatically through cookies and similar technologies.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To respond to your enquiries and prepare proposals.",
        "To process payments and deliver the services and products you buy.",
        "To communicate with you about your project, order or subscription, and to provide support.",
        "To improve our website, services and products.",
        "To detect and prevent fraud and misuse.",
      ],
    },
    {
      heading: "Sharing your information",
      body: [
        "We do not sell, trade or rent your personal information to third parties.",
        "We share information only with trusted service providers who help us run our website, process payments (such as PayHere) and deliver our services, and who are required to keep it secure and confidential.",
        "We may disclose information when required by law or in response to a valid legal request.",
      ],
    },
    {
      heading: "Data security",
      body: [
        "We use industry-standard measures to protect your information against unauthorised access, alteration, disclosure or destruction. No method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Data retention and your rights",
      body: [
        "We keep personal information only as long as needed for the purposes above, or as required by law, such as for accounting records.",
        `You may ask us to access, correct or delete the personal information we hold about you by emailing ${site.email}.`,
      ],
    },
    {
      heading: "Cookies",
      body: [
        "We use cookies to keep the website working, understand how it is used and improve your experience. You can disable cookies in your browser settings, but some parts of the website may not work as intended.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy at any time. Changes are posted on this page with a revised “last updated” date, so please review it from time to time.",
      ],
    },
    {
      heading: "Contact us",
      body: [`For any question or request about your privacy, contact us at ${contact}.`],
    },
  ],
};

export const refund: LegalDoc = {
  slug: "refund-policy",
  title: "Refund Policy",
  updated,
  intro: `Thank you for choosing ${site.name}. We want you to be satisfied with our services and products. If you are not, this policy explains when and how you can cancel and get a refund.`,
  sections: [
    {
      heading: "Custom development and design services",
      body: [
        "You can cancel a project before work starts and receive a full refund of any amount paid.",
        "If you cancel after work has started, we refund the amount paid less the value of work already completed, based on the milestones in your proposal.",
        "Payments for milestones you have reviewed and approved are non-refundable.",
      ],
    },
    {
      heading: "Software products and subscriptions",
      body: [
        "You can request a full refund within 14 days of your first payment for a software product or subscription such as eZearch.",
        "Renewal payments can be refunded if you request it within 14 days of the renewal date and have not used the product during that period. You can cancel a subscription at any time to stop future renewals.",
      ],
    },
    {
      heading: "Non-refundable items",
      body: [
        "Third-party costs paid on your behalf, such as domain names, hosting, licences and app store fees.",
        "Work completed and approved by you.",
      ],
    },
    {
      heading: "Faulty or incorrect deliverables",
      body: [
        "If something we deliver does not match the agreed scope or does not work as agreed, tell us as soon as possible. We will fix it at no extra cost or, if we cannot, refund the amount paid for that part.",
      ],
    },
    {
      heading: "How to request a refund",
      body: [
        `Email ${site.email} with your name, invoice or order number and the reason for your request. We will review it and let you know whether it is approved within 5 business days.`,
      ],
    },
    {
      heading: "Processing time",
      body: [
        "Approved refunds are processed within 7–14 business days to the original payment method. Depending on your bank or card issuer, it may take a few more days for the refund to appear in your account.",
      ],
    },
    {
      heading: "Contact us",
      body: [`If you have any question about this policy, contact us at ${contact}.`],
    },
  ],
};
