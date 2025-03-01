/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	reactStrictMode: false,
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
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

export default nextConfig;
