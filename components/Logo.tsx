import Image from "next/image";
import Link from "next/link";

// logo.png is cropped tight; it has a transparent background.
export default function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <Link href="/" aria-label="TechLinks home" className="inline-flex shrink-0">
      <Image
        src="/logo.png"
        alt="TechLinks: Connect, Hire, Get It Done"
        width={1555}
        height={463}
        priority
        className={`${className} w-auto`}
      />
    </Link>
  );
}
