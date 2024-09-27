// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	modules: ["vuetify-nuxt-module", "@pinia/nuxt", "@nuxtjs/i18n"],
	routeRules: {
		"/checkout/**": { appMiddleware: ["checkout"] },
	},
	runtimeConfig: {
		public: {
			API_BASE: process.env.API_BASE,
		},
	},
	vuetify: {
		moduleOptions: {
			/* module specific options */
		},
	},
	i18n: {
		locales: [
			{
				code: "en",
				name: "English",
				file: "en.json",
			},
			{
				code: "pl",
				name: "Polski",
				file: "pl.json",
			},
		],
		defaultLocale: "pl",
		langDir: "locales/",
		lazy: true,
	},
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
});
