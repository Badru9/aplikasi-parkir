import { CircleNotch } from "@phosphor-icons/react";

interface LoadingProps {
  color?: string;
}

export default function Loading({ color }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center gap-3 text-${color}`}>
      <CircleNotch size={24} className="animate-spin " />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
}
