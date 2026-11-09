"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { buttonClass } from "./button";

const inputClass =
  "w-full rounded-xl border border-line bg-surface-1 px-4 py-3 text-fg placeholder:text-fg-muted/60 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400";

const defaultValues: ContactInput = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues });

  const onSubmit = async (data: ContactInput) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      reset();
      setStatus("sent");
    } catch {
      // Keep the user's input so nothing they typed is lost.
      setStatus("error");
    }
  };

  const field = (name: keyof ContactInput) => ({
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    ...register(name),
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
      <Field label="Name" name="name" error={errors.name?.message}>
        <input {...field("name")} autoComplete="name" className={inputClass} />
      </Field>
      <Field label="Email" name="email" error={errors.email?.message}>
        <input {...field("email")} type="email" autoComplete="email" className={inputClass} />
      </Field>
      <Field label="Company (optional)" name="company" error={errors.company?.message}>
        <input {...field("company")} autoComplete="organization" className={inputClass} />
      </Field>
      <Field label="What do you need?" name="service" error={errors.service?.message}>
        <select {...field("service")} className={inputClass}>
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </Field>
      <Field
        label="Tell us about your project"
        name="message"
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <textarea {...field("message")} rows={6} className={inputClass} />
      </Field>

      <div aria-hidden className="hidden">
        <label>
          Website
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClass("primary", "disabled:opacity-60")}
        >
          {isSubmitting ? "Sending…" : "Send message"}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-accent">Thanks — your message is on its way to our team.</span>
          )}
          {status === "error" && (
            <span className="text-red-400">
              Something went wrong. Please try again or email{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  className,
  children,
}: {
  label: string;
  name: keyof ContactInput;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-fg-muted mb-2 block text-sm">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
