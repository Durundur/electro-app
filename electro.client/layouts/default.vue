<template>
	<v-app>
		<NavBar />
		<v-main>
			<LoadingContainer>
				<slot></slot>
			</LoadingContainer>
		</v-main>
		<Footer />
	</v-app>
</template>
<style>
	body {
		font-size: 14px;
	}

	.nowrap-text {
		white-space: break-spaces;
	}
	.default-text {
		white-space: break-spaces;
		opacity: 1;
		line-height: 1rem;
	}

	.font-600 {
		font-weight: 600 !important;
	}
	.text-body-3 {
		font-size: 12px !important;
		font-weight: inherit;
	}
	.invisible {
		visibility: hidden;
	}
	.min-main-content-height {
		min-height: 322.2px;
	}

	.card-title {
		padding: unset 0;
	}

	.h-inherit {
		height: inherit;
	}
</style>
