<template>
	<Container>
		<v-row class="py-4">
			<v-col>
				<v-card>
					<v-card-title>Zaloguj się</v-card-title>
					<v-card-text>
						<LoginForm></LoginForm>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<v-card flat>
					<v-card-title>Nie masz konta?</v-card-title>
					<v-card-text>
						<v-btn
							to="/auth/register"
							block
							color="primary"
							variant="tonal"
							class="text-none">
							Załóż konto
						</v-btn>
					</v-card-text>
				</v-card>
				<BenefitsList />
			</v-col>
		</v-row>
	</Container>
</template>
