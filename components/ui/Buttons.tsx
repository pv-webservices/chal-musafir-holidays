import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ocean' | 'sun' | 'ghost' | 'on-dark';
type Size = 'sm' | 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ocean: 'btn-ocean',
  sun: 'btn-sun',
  ghost: 'btn-ghost',
  'on-dark': 'btn-on-dark',
};

const sizeClass: Record<Size, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  const classes = `btn ${variantClass[variant]} ${sizeClass[size]} focus-ring ${className}`.trim();
  const body = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </>
  );

  // External links, tel: and mailto: need a plain anchor.
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {body}
    </Link>
  );
}

export function ButtonAction({
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`btn ${variantClass[variant]} ${sizeClass[size]} focus-ring ${className}`.trim()} {...rest}>
      <span>{children}</span>
      {withArrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </button>
  );
}

/** Kept for backwards compatibility with existing imports. */
export const PrimaryButton = ({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) => (
  <ButtonLink href={href} variant="primary" className={className}>
    {children}
  </ButtonLink>
);

export const SecondaryButton = ({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) => (
  <ButtonLink href={href} variant="ghost" className={className}>
    {children}
  </ButtonLink>
);
