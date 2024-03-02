import { BentoGridItem } from "@/components/ui/bento-grid";

export interface GridItemProps {
  className?: string;
  header?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function GridItem({ className, header, title, description, icon }: GridItemProps) {
  return (
    <BentoGridItem
      className={className}
      header={header}
      title={title}
      description={description}
      icon={icon}
    />
  );
}