// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
		},
	},
	app: {
		head: {
			script: [
				process.env.NODE_ENV === "production"
					? {
							src: "https://umami.durundur.online/getinfo",
							defer: "true",
							"data-website-id": "ce5b3686-ef1d-4b1b-a8b7-4c888436a587",
					  }
					: {},
			],
		},
	},
	vuetify: {
		moduleOptions: {
			/* module specific options */
		},
	},
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
});
