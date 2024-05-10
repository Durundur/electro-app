<template>
	<v-container fluid>
		<v-row>
			<template v-for="(photo, index) in photosUrls">
				<v-col
					cols="6"
					sm="3"
					md="2">
					<v-hover>
						<template v-slot:default="{ isHovering, props }">
							<v-sheet
								v-bind="props"
								flat
								border
								rounded="lg"
								height="100%"
								style="position: relative">
								<v-img
									cover
									height="100%"
									rounded="lg"
									:aspect-ratio="4 / 3"
									:src="photo"></v-img>
								<div v-if="isHovering">
									<v-btn
										style="
											position: absolute;
											bottom: 5%;
											left: 50%;
											transform: translateX(-50%);
										"
										v-bind="props"
										density="comfortable"
										size="small"
										variant="elevated"
										color="error"
										@click="deleteFile(index)"
										icon="mdi-trash-can-outline"></v-btn>
								</div>
							</v-sheet>
						</template>
					</v-hover>
				</v-col>
			</template>

			<v-col
				cols="6"
				sm="3"
				md="2">
				<v-responsive :aspect-ratio="4 / 3">
					<v-hover>
						<template v-slot:default="{ isHovering, props }">
							<v-sheet
								v-bind="props"
								flat
								border
								rounded="lg"
								height="100%"
								class="text-body-2 d-flex flex-column justify-center align-center"
								style="position: relative">
								<v-icon style="font-size: 38px">
									mdi-cloud-upload-outline
								</v-icon>
								<p>Dodaj plik</p>
								<label
									for="uploader"
									class="rounded-lg w-100 h-100"
									style="position: absolute"></label>
								<input
									@input="newFileHandler"
									id="uploader"
									class="d-none"
									type="file"
									multiple
									accept=".jpg,.png" />
							</v-sheet>
						</template>
					</v-hover>
				</v-responsive>
			</v-col>
		</v-row>
	</v-container>
</template>
<script>
	export default {
		props: {
			modelValue: {
				type: Array,
				default: [],
			},
		},
		data() {
			return {};
		},
		methods: {
			updateModelValue(value) {
				this.$emit("update:modelValue", value);
			},
			newFileHandler(event) {
				const files = event.target.files;
				this.updateModelValue([...this.modelValue, ...files]);
			},
			deleteFile(index) {
				const files = [...this.modelValue];
				files.splice(index, 1);
				this.updateModelValue(files);
			},
		},
		computed: {
			photosUrls() {
				const urls = [];
				this.modelValue.forEach((element) => {
					if (element instanceof File) {
						urls.push(URL.createObjectURL(element));
					} else {
						urls.push(element);
					}
				});
				return urls;
			},
		},
	};
</script>
<style></style>
