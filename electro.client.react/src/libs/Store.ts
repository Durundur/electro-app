import { configureStore } from "@reduxjs/toolkit";
import LayoutReducer from "@/libs/Layout/slice";
import AdminProductHierarchyReducer from "@/libs/Admin/AdminProductHierarchy/slice";
import AdminProductCatalogListReducer from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/slice";
import AdminProductCatalogNewEditReducer from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";
import ProductPageReducer from "@/libs/ProductPage/slice";
import PhotoUploaderReducer from "@/libs/PhotoUploader/slice";
import SearchProductsReducer from "@/libs/SearchProducts/slice";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

const store = configureStore({
	reducer: {
		Layout: LayoutReducer,
		AdminProductHierarchy: AdminProductHierarchyReducer,
		AdminProductCatalogList: AdminProductCatalogListReducer,
		AdminProductCatalogNewEdit: AdminProductCatalogNewEditReducer,
		ProductPage: ProductPageReducer,
		PhotoUploader: PhotoUploaderReducer,
		SearchProducts: SearchProductsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
