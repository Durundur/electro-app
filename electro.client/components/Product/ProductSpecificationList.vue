<template>
	<v-table :hover="true">
		<tbody>
			<tr
				:class="{ 'event-items-bg': index % 2 === 0 }"
				v-for="(spec, index) in specification">
				<td class="font-weight-bold">{{ spec.fieldName }}</td>
				<td>
					<div class="d-flex flex-column">
						<span v-for="item in spec.fieldValue">{{ item }}</span>
					</div>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>
<script>
	export default {
		props: {
			specification: {
				type: Object,
				required: true,
				default: () => {},
			},
		},
	};
</script>
<style scoped>
	.event-items-bg {
		background-color: #fafafa;
	}
</style>
