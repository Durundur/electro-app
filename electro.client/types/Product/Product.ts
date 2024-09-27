import type { IPaginationParams } from "../Api/PagedResult";
import type { IProductPrice } from "../Common/Price";
import type { IProductHierarchyBase } from "../ProductHierarchy/ProductHierarchy";
import type { IFeature } from "./Feature";

export interface IProductBase {
	id: string;
	name: string;
	price: IProductPrice;
	group: IProductHierarchyBase;
	category: IProductHierarchyBase;
	subCategory: IProductHierarchyBase;
	features: IFeature[];
	stockQuantity: number;
	isArchived: boolean;
	isPublished: boolean;
	opinionsCount: number;
	averageOpinionsRating: number;
}

export interface IProductOverview extends IProductBase {
	photo: string;
}

export interface IProduct extends IProductBase {
	photos: string[];
	description: string;
	specification: Record<string, any>;
}

