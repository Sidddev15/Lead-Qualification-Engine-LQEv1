"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { leadColumns } from "@/components/table/columns";
import { ExportButtons } from "@/components/export/ExportButtons";
import type { Lead } from "@/components/table/types";

export default function LQEResultsPage() {
  const [data, setData] = useState<Lead[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("lqe_result");
    if (raw) {
      const parsed = JSON.parse(raw) as { leads?: Lead[] };
      setData(parsed.leads || []);
    }
  }, []);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">LQE Results</h1>

      <ExportButtons data={data} />

      <div className="mt-6">
        <DataTable columns={leadColumns} data={data} />
      </div>
    </main>
  );
}
