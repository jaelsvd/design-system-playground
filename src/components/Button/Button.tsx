import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.scss'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type Size = 'small' | 'medium' | 'large'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size; loading?: boolean; iconOnly?: boolean; children?: ReactNode }
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'medium', loading, iconOnly, disabled, className = '', children, ...props }, ref) => (
  <button ref={ref} className={[styles.button, styles[variant], styles[size], iconOnly && styles.iconOnly, className].filter(Boolean).join(' ')} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    {loading && <LoaderCircle className={styles.spinner} size={16} aria-hidden="true" />}{children}
  </button>
))
Button.displayName = 'Button'
