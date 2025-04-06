import { AttributeType } from "@/libs/api-contract/api-contract";

export const translateAttributeType = (attributeType: AttributeType): string => {
	const attributeTypeMap: { [key in AttributeType]: string } = {
		Boolean: "Loginczny",
		List: "Lista",
		Text: "Tekst",
	};

	return attributeTypeMap[attributeType] || attributeType;
};
