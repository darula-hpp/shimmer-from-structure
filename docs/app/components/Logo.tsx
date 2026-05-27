import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 28, className = '' }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      priority
    />
  );
}
