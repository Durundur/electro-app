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
