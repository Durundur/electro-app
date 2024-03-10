// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	modules: ['vuetify-nuxt-module'],
	vuetify: {
		moduleOptions: {
			/* module specific options */
		}
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false
		}
	]
});
