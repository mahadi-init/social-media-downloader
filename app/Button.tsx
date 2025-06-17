"use client";

import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{ padding: 10, marginLeft: 10 }}
    >
      {pending ? "Downloading..." : "Download"}
    </button>
  );
}
