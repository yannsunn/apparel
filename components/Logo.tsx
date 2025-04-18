import Image from 'next/image';

export function Logo() {
  return (
    <Image 
      src="/logo.svg" 
      width={100} 
      height={50}
      priority={true}
      alt="Logo" 
    />
  );
} 