import Image from "next/image";
import "./SourcdLogo.css";
import image from "public/soursd_logo.svg";

export interface SourcdLogoProps {
  className?: string;
}

export default function SourcdLogo({ className }: SourcdLogoProps) {
  return (
    <div className={`sourcd-logo ${className}`}>
      <Image src={image} alt="image" width={200} />
      <h1 className="heading">SOURCD</h1>
    </div>
  );
}
