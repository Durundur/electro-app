import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";
import colors from "vuetify/util/colors";

export default defineVuetifyConfiguration({
	theme: {
		themes: {
			light: {
				colors: {
					primary: colors.yellow.darken1,
				},
			},
		},
	},
});
