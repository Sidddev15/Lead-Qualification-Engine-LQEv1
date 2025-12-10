import { Badge } from "@/components/ui/badge";

const tierColors: Record<string, string> = {
  HOT: "bg-red-600",
  WARM: "bg-yellow-500 text-black",
  COLD: "bg-blue-600",
  IGNORE: "bg-gray-600",
};

export function TierBadge({ tier }: { tier: string }) {
  return (
    <Badge className={`${tierColors[tier] || ""} px-2 py-1`}>{tier}</Badge>
  );
}
