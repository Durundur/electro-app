<template>
	<v-table :hover="true">
		<tbody>
			<tr :class="{ 'event-items-bg': index % 2 === 0 }" v-for="(key, index) in Object.keys(specification)">
				<td class="font-weight-bold">{{ key }}</td>
				<td v-if="Array.isArray(specification[key])">
					<div class="d-flex flex-column">
						<span v-for="item in specification[key]">{{ item }}</span>
					</div>
				</td>
				<td v-else>{{ specification[key] }}</td>
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
			default: () => {}
		}
	}
};
</script>
<style scoped>
.event-items-bg {
	background-color: #fafafa;
}
</style>
