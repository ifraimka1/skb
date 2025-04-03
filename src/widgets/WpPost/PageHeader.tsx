import { forwardRef } from "react";
import { ForwardedRef, ReactNode } from "react";

interface PageHeaderProps {
  children?: ReactNode;
  id?: string;
  className?: string;
}

const PageHeader = forwardRef(
  (
    { children, id, className }: PageHeaderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div id={id} ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

PageHeader.displayName = "PageHeader";

export default PageHeader;
