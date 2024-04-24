import { forwardRef } from "react";

const PageHeader = forwardRef(({ children, id }, ref) => {
    return (
        <header id={id} ref={ref} className="header">
            {children}
        </header>
    );
});

export default PageHeader;