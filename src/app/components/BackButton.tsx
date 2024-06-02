import { CaretLeft } from "@phosphor-icons/react";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <CaretLeft
      size={36}
      weight="bold"
      className=" p-1 rounded-full absolute top-5 left-5 text-primary border-2 border-primary cursor-pointer hover:bg-primary hover:text-white"
      onClick={onClick}
    />
  );
}
