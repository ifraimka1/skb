import { ReactNode } from "react";

interface PageContentProps {
  children?: ReactNode;
  id?: string;
  className?: string;
}

export default function PageContent({
  children,
  id = "",
  className,
}: PageContentProps) {
  return (
    <div className={className} id={id}>
      {children}
    </div>
  );
}
