/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	reactStrictMode: true,
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
