// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || "localhost:5555",
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
