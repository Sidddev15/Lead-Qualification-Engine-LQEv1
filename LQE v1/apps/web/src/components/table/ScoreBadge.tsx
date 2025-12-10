import { Badge } from "@/components/ui/badge";

export function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "bg-red-600"
      : score >= 70
        ? "bg-yellow-500 text-black"
        : score >= 40
          ? "bg-blue-600"
          : "bg-gray-700";

  return <Badge className={`${color} px-2 py-1`}>{score}</Badge>;
}
