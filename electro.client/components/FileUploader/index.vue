<template>
	<v-container fluid>
		<v-row>
			<v-col
				v-for="(photo, index) in photos"
				v-bind="props"
				cols="6"
				sm="4"
				md="3">
				<FileSquare
					:index="index"
					:file="photo"
					:filesLenght="photos.length"
					@delete-file="deleteFile(index)"
					@move-file-forward="moveFile(index, 1)"
					@move-file-backward="moveFile(index, -1)"></FileSquare>
			</v-col>

			<v-col
				cols="6"
				sm="4"
				md="3">
				<v-responsive :aspect-ratio="4 / 3">
					<v-hover>
						<template v-slot:default="{ isHovering, props }">
							<v-card
								link
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
									class="rounded-lg w-100 h-100 cursor-pointer"
									style="position: absolute"></label>
								<input
									@input="newFileHandler"
									id="uploader"
									class="d-none"
									type="file"
									multiple
									accept=".jpg,.png" />
							</v-card>
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
			moveFile(index, direction) {
				const files = [...this.modelValue];
				const file = files.splice(index, 1);
				files.splice(index + direction, 0, ...file);
				this.updateModelValue(files);
			},
		},
		computed: {
			photos() {
				const photos = [];
				this.modelValue.forEach((element) => {
					if (element instanceof File) {
						photos.push(URL.createObjectURL(element));
					} else {
						photos.push(element);
					}
				});
				return photos;
			},
		},
	};
</script>
<style></style>
