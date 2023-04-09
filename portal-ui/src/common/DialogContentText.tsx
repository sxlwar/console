import { PropsWithChildren } from "react";

interface DialogContentTextProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogContentText({
  style,
  children,
  ...rest
}: PropsWithChildren<DialogContentTextProps>) {
  return (
    <div {...rest} style={{ ...(style || {}), padding: 25, paddingBottom: 0 }}>
      {children}
    </div>
  );
}
