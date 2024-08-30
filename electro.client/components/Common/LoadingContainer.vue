<template>
	<div class="loading-container">
		<div
			v-if="isLoading"
			class="loading-overlay">
			<div
				class="loading-spinner-container"
				:style="spinnerStyle">
				<LoadingSpinner />
			</div>
		</div>
		<div
			class="h-100"
			:class="{ 'content-dimmed': isLoading }">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	const loading = useLoadingIndicator();
	const spinnerStyle = ref({});
	const isLoading = computed(() => loading.isLoading.value);
	const checkScrollAndAdjustPosition = () => {
		const content = document.querySelector(".loading-container");
		if (content.scrollHeight > window.innerHeight) {
			spinnerStyle.value = {
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			};
		} else {
			spinnerStyle.value = {
				position: "relative",
			};
		}
	};

	onMounted(() => {
		checkScrollAndAdjustPosition();
		window.addEventListener("resize", checkScrollAndAdjustPosition);
		window.addEventListener("scroll", checkScrollAndAdjustPosition);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("resize", checkScrollAndAdjustPosition);
		window.removeEventListener("scroll", checkScrollAndAdjustPosition);
	});

	watch(
		() => loading.isLoading.value,
		(isLoading) => {
			if (isLoading) {
				checkScrollAndAdjustPosition();
			}
		},
	);
</script>

<style>
	.loading-container {
		position: relative;
		height: 100%;
	}

	.loading-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.15);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		pointer-events: none;
	}

	.loading-spinner-container {
		z-index: 1100;
	}

	.content-dimmed {
		pointer-events: none;
	}
</style>
