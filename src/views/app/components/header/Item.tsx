import * as React from "react";

export const Item = React.forwardRef<any, any>((props, ref) => {
  const { onClick = () => {}, children, className = "" } = props;
  return (
    <div
      className={`cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 ${className}`}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
