<template>
	<v-card
		flat
		border
		rounded="lg">
		<v-card-subtitle>
			<div class="d-flex mt-4 align-center">
				<v-rating
					v-model="opinion.rating"
					half-increments
					color="primary"
					hover
					readonly
					size="x-small"
					density="comfortable"></v-rating>
				<v-spacer></v-spacer>
				<span>{{ $formatters.dateFormatter(opinion.createdAt) }}</span>
			</div>
		</v-card-subtitle>
		<!-- <v-card-title>{{ opinion.title }}</v-card-title> -->
		<v-card-text>
			{{ opinion.review }}
		</v-card-text>
		<v-card-text class="pt-0">
			<div class="d-flex align-center ga-2">
				<v-icon size="x-large">mdi-account-outline</v-icon>
				<div>
					<span class="text-body-1">{{ opinion.authorDisplayName }}</span>
					<div
						v-if="true"
						class="text-caption d-flex ga-2 align-center">
						<span>Potwierdzony zakup</span>
						<v-icon color="success">mdi-check-circle</v-icon>
					</div>
				</div>
			</div>
		</v-card-text>
		<v-card-text class="pt-0">
			<v-btn
				slim
				density="comfortable"
				color="success"
				variant="text"
				:active="opinion.userAction === UserOpinionAction.Like.toString()"
				prepend-icon="mdi-thumb-up-outline"
				@click="onRateOpinion(UserOpinionAction.Like)">
				{{ opinion.likes }}
			</v-btn>
			<v-btn
				slim
				density="comfortable"
				class="ml-4"
				color="error"
				variant="text"
				:active="opinion.userAction === UserOpinionAction.Dislike.toString()"
				prepend-icon="mdi-thumb-down-outline"
				@click="onRateOpinion(UserOpinionAction.Dislike)">
				{{ opinion.dislikes }}
			</v-btn>
		</v-card-text>
	</v-card>
</template>
<script setup lang="ts">
	import {
		type IOpinionWithUserAction,
		UserOpinionAction,
	} from "~/types/Opinion/Opinion";
	const opinionStore = useOpinionStore();
	const props = defineProps<{
		opinion: IOpinionWithUserAction;
	}>();
	const emit = defineEmits<{
		(e: "update-opinion", v: IOpinionWithUserAction): void;
	}>();
	const { $toast } = useNuxtApp();

	async function onRateOpinion(action: UserOpinionAction) {
		try {
			const result = await opinionStore.rateProductOpinion(
				props.opinion.id,
				action,
			);
			if (result) {
				$toast.success("Opinia oceniona pomyślnie");
				emit("update-opinion", result);
				return;
			}
			throw new ApiError(500, "");
		} catch (e) {
			console.log(e);
			$toast.error("Błąd podczas oceny opinii, spróbuj ponownie");
		}
	}
</script>
