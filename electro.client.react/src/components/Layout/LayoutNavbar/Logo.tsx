import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	href?: string;
}

const Logo: FC<LogoProps> = ({ href }) => {
	const logo = <Image src="/logo2.png" alt="electro" width={112} height={28} style={{ display: "block" }} />;

	return href ? <Link href={href}>{logo}</Link> : logo;
};

export default Logo;
