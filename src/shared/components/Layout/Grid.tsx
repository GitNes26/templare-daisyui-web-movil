// shared/components/Layout/Grid.tsx
import { ReactNode } from "react";
import { GridSize } from "@/shared/types/form.types";

interface GridProps {
   children: ReactNode;
   spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
   className?: string;
}

interface GridItemProps {
   children: ReactNode;
   xs?: GridSize;
   sm?: GridSize;
   md?: GridSize;
   lg?: GridSize;
   xl?: GridSize;
   className?: string;
}

export const Grid = ({ children, spacing = 3, className = "" }: GridProps) => {
   const spacingClasses = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10"
   };

   return <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${spacingClasses[spacing]} ${className}`}>{children}</div>;
};

export const GridItem = ({ children, xs = 12, sm, md, lg, xl, className = "" }: GridItemProps) => {
   const colClasses = [];

   // Mobile first
   if (xs !== 12) colClasses.push(`col-span-${xs}`);

   // Responsive
   if (sm) colClasses.push(`sm:col-span-${sm}`);
   if (md) colClasses.push(`md:col-span-${md}`);
   if (lg) colClasses.push(`lg:col-span-${lg}`);
   if (xl) colClasses.push(`xl:col-span-${xl}`);

   return <div className={`${colClasses.join(" ")} ${className}`}>{children}</div>;
};
