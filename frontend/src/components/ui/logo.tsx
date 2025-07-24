import Image from "next/image";

export function Logo({ ...props }: React.HTMLAttributes<HTMLImageElement>) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Image
        priority
        {...props}
        src="/task.svg"
        alt="Logo 1"
        width={32}
        height={32}
      />
    </div>
  );
}
