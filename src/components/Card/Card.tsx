import { type HTMLAttributes } from "react";
import styles from "./Card.module.scss";
export function Card({
  interactive,
  selected,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  selected?: boolean;
}) {
  return (
    <div
      className={[
        styles.card,
        interactive && styles.interactive,
        selected && styles.selected,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.header} {...props} />;
}
export function CardContent(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.content} {...props} />;
}
export function CardFooter(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.footer} {...props} />;
}
