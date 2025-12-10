"use client";

import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import type { Lead } from "@/components/table/types";

export function ExportButtons({ data }: { data: Lead[] }) {
  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "lqe_results.csv";
    a.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lqe_results.json";
    a.click();
  };

  return (
    <div className="flex gap-2">
      <Button onClick={exportCSV}>Export CSV</Button>
      <Button onClick={exportJSON} variant="secondary">
        Export JSON
      </Button>
    </div>
  );
}
