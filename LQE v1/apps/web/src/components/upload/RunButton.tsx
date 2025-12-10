// apps/web/components/upload/RunButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

interface Props {
  mode: "manual" | "pdf_zip" | "excel";
  manualCompanies: string;
  files: File[];
  onResult: (data: any) => void;
}

export default function RunButton({
  mode,
  manualCompanies,
  files,
  onResult,
}: Props) {
  const mutation = useMutation({
    mutationFn: async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
      }

      const form = new FormData();
      form.append("inputMode", mode);

      if (mode === "manual") {
        form.append("manualCompanies", manualCompanies);
      } else {
        files.forEach((f) => form.append("files", f));
      }

      const res = await api.post(`${baseUrl}/api/lqe/run`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => onResult(data),
  });

  return (
    <Button
      className="mt-4 rounded"
      variant="outline"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? "Processing..." : "Run LQE"}
    </Button>
  );
}
