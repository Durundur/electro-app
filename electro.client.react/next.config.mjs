/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "files.durundur.online",
				port: "",
				pathname: "/file/**",
			},
		],
	},
};

export default nextConfig;
