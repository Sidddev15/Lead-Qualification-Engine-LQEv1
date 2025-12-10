import { ColumnDef } from "@tanstack/react-table";
import { TierBadge } from "./TierBadge";
import { ScoreBadge } from "./ScoreBadge";
import { RowExpand } from "./RowExpand";
import { Lead } from "./types";

export const leadColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => (
      <span className="font-semibold">{row.original.companyName}</span>
    ),
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => <TierBadge tier={row.original.tier} />,
  },
  {
    accessorKey: "scores.finalScore",
    header: "Score",
    cell: ({ row }) => <ScoreBadge score={row.original.scores.finalScore} />,
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => (
      <a
        href={row.original.website}
        className="text-blue-400 underline"
        target="_blank"
      >
        {row.original.website}
      </a>
    ),
  },
  {
    accessorKey: "expand",
    header: "",
    cell: ({ row }) => <RowExpand lead={row.original} />,
  },
];
