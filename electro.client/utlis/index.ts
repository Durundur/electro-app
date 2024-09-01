import type { IOrderProuct } from "~/types/Order/Order";

function convertFileToBase64Async(file: File) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
}

async function convertFilesToBase64Async(files: (File | string)[]) {
	const base64Files = await Promise.all(
		files.map((file) => {
			if (file instanceof File) {
				return convertFileToBase64Async(file);
			} else {
				return Promise.resolve(file);
			}
		}),
	);
	return base64Files;
}

function countTotalOrderProductsQuantity(products: IOrderProuct[]) {
	return products.reduce((acc, item) => acc + item.quantity, 0);
}

function paramsToString(...args: Partial<object[]>): string {
	const mergedParams = args.reduce((acc, obj) => ({ ...acc, ...obj }), {});

	const filteredParams = Object.entries(mergedParams as object).reduce(
		(acc, [key, value]) => {
			if (value != null && value !== "") {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, any>,
	);
	const paramsString = new URLSearchParams(filteredParams).toString();
	return paramsString;
}

export default {
	convertFileToBase64Async,
	convertFilesToBase64Async,
	countTotalOrderProductsQuantity,
	paramsToString,
};
