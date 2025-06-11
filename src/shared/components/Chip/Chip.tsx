import React, { FC } from "react";

interface IChipProps {
  label: string;
}
export const Chip: FC<IChipProps> = ({ label }) => {
  return (
    <span className="px-3 py-1.5 bg-background-main border border-accent/30 text-text-main text-sm font-body font-medium rounded-lg">
      {label}
    </span>
  );
};
