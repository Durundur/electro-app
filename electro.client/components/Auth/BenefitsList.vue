<template>
	<v-card flat>
		<v-card-title>Dlaczego warto mieć konto?</v-card-title>
		<v-card-text>
			<v-list>
				<v-list-item>
					<template v-slot:prepend>
						<v-img width="64" height="64" src="/fastorder.svg"></v-img>
					</template>
					<p class="ml-4 text-subtitle-2">zamawiaj szybciej</p>
				</v-list-item>
				<v-list-item>
					<template v-slot:prepend>
						<v-img width="64" height="64" src="/history.svg"></v-img>
					</template>
					<p class="ml-4 text-subtitle-2">sprawdzaj poprzednie zamówienia</p>
				</v-list-item>
				<v-list-item>
					<template v-slot:prepend>
						<v-img width="64" height="64" src="/track.svg"></v-img>
					</template>
					<p class="ml-4 text-subtitle-2">śledź status zamówienia</p>
				</v-list-item>
				<v-list-item>
					<template v-slot:prepend>
						<v-img width="64" height="64" src="/promotions.svg"></v-img>
					</template>
					<p class="ml-4 text-subtitle-2">korzystaj z rabatów i promocji</p>
				</v-list-item>
			</v-list>
		</v-card-text>
	</v-card>
</template>
