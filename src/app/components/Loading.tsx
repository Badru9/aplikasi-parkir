import { CircleNotch } from "@phosphor-icons/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-3">
      <CircleNotch size={24} className="animate-spin" />
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
}
