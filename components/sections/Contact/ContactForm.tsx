"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // No backend yet — simulate.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 3500);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-border bg-surface p-7 md:p-10 flex flex-col gap-6"
    >
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Organization" name="org" />
      <Field label="Message" name="message" textarea required />

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className="mt-2 inline-flex items-center justify-center gap-2 label-lg px-7 py-4 rounded-full bg-primary text-midnight hover:bg-primary-light disabled:opacity-50 transition-colors"
      >
        {status === "submitting"
          ? "Sending…"
          : status === "sent"
            ? "Received — Thank you"
            : "Send Inquiry"}
      </motion.button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-text placeholder:text-faint transition-colors";
  return (
    <label className="flex flex-col gap-2">
      <span className="label-sm text-faint">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} required={required} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
