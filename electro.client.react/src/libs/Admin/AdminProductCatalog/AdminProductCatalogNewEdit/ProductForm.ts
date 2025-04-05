import { ProductStatus } from "@/libs/api-contract/api-contract";
import { IProductForm } from "./interfaces";
import * as yup from "yup";

export const initialValues: IProductForm = {
	id: undefined,
	name: "",
	amount: 0,
	currency: "",
	status: ProductStatus.Draft,
	stockQuantityDelta: 0,
	groupId: undefined,
	categoryId: undefined,
	subCategoryId: undefined,
	description: "",
	photos: [],
	attributes: [],
	promotionAmount: 0,
	promotionCurrency: "",
	promotionStartDate: undefined,
	promotionEndDate: undefined,
	promotionIsActive: false,
};

const checkPromotionFieldsDependency = (fieldName: string) => {
	return function (value: any | undefined, context: yup.TestContext<yup.AnyObject>) {
		const promotionFields = {
			promotionAmount: context.parent.promotionAmount,
			promotionCurrency: context.parent.promotionCurrency,
			promotionStartDate: context.parent.promotionStartDate,
			promotionEndDate: context.parent.promotionEndDate,
		};

		delete promotionFields[fieldName as keyof typeof promotionFields];

		const isAnyOtherFieldFilled = Object.values(promotionFields).some((field) => field !== undefined && field !== null && field !== "" && field !== 0);

		if (isAnyOtherFieldFilled) {
			return value !== undefined && value !== null && value !== "";
		}
		return true;
	};
};

export const validationSchema = yup.object<IProductForm>({
	name: yup.string().required("Nazwa jest wymagana"),
	amount: yup.number().required("Cena jest wymagana"),
	currency: yup.string().required("Waluta jest wymagana"),
	status: yup.string().required("Status jest wymagany"),
	stockQuantityDelta: yup.number().required("Stan magazynowy jest wymagany"),
	groupId: yup.number().optional(),
	categoryId: yup.number().optional(),
	subCategoryId: yup.number().optional(),
	photos: yup.array().of(yup.string()).required("Zdjęcia są wymagane"),
	description: yup.string().required("Opis jest wymagany"),
	attributes: yup.array().of(
		yup.object({
			id: yup.string().required(),
			value: yup.string().required("Wartość atrybutu jest wymagana"),
			isPrimary: yup.boolean().required(),
		})
	),
	promotionAmount: yup
		.number()
		.test("is-amount", "Niepoprawna kwota", (value) => !value || /^[0-9]*\.?[0-9]{0,2}$/.test(value.toString()))
		.test("promotion-fields-dependency", "Cena promocyjna jest wymagana", checkPromotionFieldsDependency("promotionAmount")),
	promotionCurrency: yup.string().test("promotion-fields-dependency", "Waluta promocji jest wymagana", checkPromotionFieldsDependency("promotionCurrency")),
	promotionStartDate: yup.date().test("promotion-fields-dependency", "Data rozpoczęcia promocji jest wymagana", checkPromotionFieldsDependency("promotionStartDate")),
	promotionEndDate: yup
		.date()
		.test("promotion-fields-dependency", "Data zakończenia promocji jest wymagana", checkPromotionFieldsDependency("promotionEndDate"))
		.test("date-min", "Data końca musi być późniejsza niż data początku", function (value) {
			const { promotionStartDate } = this.parent;
			if (value && promotionStartDate) {
				return new Date(value) > new Date(promotionStartDate);
			}
			return true;
		}),
	promotionIsActive: yup.boolean().optional(),
});
