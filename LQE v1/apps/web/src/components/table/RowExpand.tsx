"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lead } from "./types";

export function RowExpand({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2 text-black">
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        {open ? "Hide details" : "Show details"}
      </Button>

      {open && (
        <div className="mt-3 p-3 bg-slate-800 rounded-lg text-sm space-y-2">
          <div>
            <strong>Website:</strong> {lead.website || "N/A"}
          </div>

          <div>
            <strong>Emails:</strong>{" "}
            {lead.emails.length ? lead.emails.join(", ") : "None"}
          </div>

          <div>
            <strong>Phones:</strong>{" "}
            {lead.phones.length ? lead.phones.join(", ") : "None"}
          </div>

          <div>
            <strong>LinkedIn:</strong> {lead.linkedin || "N/A"}
          </div>

          <div>
            <strong>Reasons:</strong>
            <ul className="list-disc ml-6 text-slate-300">
              {lead.reasons.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Notes:</strong>
            <p className="text-slate-400">{lead.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}
