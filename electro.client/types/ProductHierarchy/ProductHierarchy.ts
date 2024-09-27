export interface IProductHierarchyBase {
	id: string;
	name: string;
}

export interface IProductHierarchyGroup {
	id: number;
	name: string;
	photo: string;
	icon: string;
	categories: IProductHierarchyCategory[];
}

export interface IProductHierarchyCategory {
	id: number;
	groupId: number;
	name: string;
	subCategories: IProductHierarchySubCategory[];
}

export interface IProductHierarchySubCategory {
	categoryId: number;
	id: number;
	name: string;
}
