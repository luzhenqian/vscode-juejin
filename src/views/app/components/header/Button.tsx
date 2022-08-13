import * as React from "react";

export const Button = React.forwardRef<any, any>((props, ref) => {
  const { children, className = "", style = {} } = props;
  return (
    <div
      className={`inline-flex gap-2 rounded-md p-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-800 dark:text-gray-400 dark:ring-0 dark:shadow-highlight/4 ${className}`}
      style={style}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
