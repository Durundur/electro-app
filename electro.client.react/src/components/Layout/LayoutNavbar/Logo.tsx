import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: FC = () => {
	return (
		<Link href={"/"}>
			<Image src={`/logo2.png`} alt="electro" width="112" height="28" />
		</Link>
	);
};

export default Logo;
