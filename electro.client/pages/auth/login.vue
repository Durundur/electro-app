<template>
	<Container class="h-inherit">
		<v-container class="px-0">
			<v-row>
				<v-col>
					<v-card
						rounded="lg"
						:elevation="4">
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
		</v-container>
	</Container>
</template>
