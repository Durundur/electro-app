export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide("v", {
		required: [(v) => (!!v && v.trim().length > 0) || "Pole jest wymagane."],
		checkBoxRequired: [(v) => v === true || "Pole jest wymagane."],
		email: [
			(v) => (!!v && v.trim().length > 0) || "Pole jest wymagane.",
			(v) =>
				/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(
					v,
				) || "Nieprawidłowy adres email.",
			(v) => (v && v.length < 256) || "Adres email jest za długi.",
		],
	});
});
