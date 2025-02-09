import { configureStore } from "@reduxjs/toolkit";
import LayoutStoreReducer from "@/libs/Layout/slice";
import AdminProductHierarchyPageStoreReducer from "@/libs/Admin/AdminProductHierarchy/slice";
import AdminProductCatalogListPageStoreReducer from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogList/slice";
import AdminProductCatalogNewEditPageStoreReducer from "@/libs/Admin/AdminProductCatalog/AdminProductCatalogNewEdit/slice";
import AdminOrdersStoreReducer from "@/libs/Admin/AdminOrders/slice";
import ProductPageStoreReducer from "@/libs/ProductPage/slice";
import PhotoUploaderStoreReducer from "@/libs/PhotoUploader/slice";
import SearchProductsPageStoreReducer from "@/libs/SearchProducts/slice";
import AuthReducer from "@/libs/Auth/slice";
import CartStoreReducer from "@/libs/Cart/slice";
import AccountReducer from "@/libs/Account/slice";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

const store = configureStore({
	reducer: {
		LayoutStore: LayoutStoreReducer,
		CartStore: CartStoreReducer,
		AdminProductHierarchyPageStore: AdminProductHierarchyPageStoreReducer,
		AdminProductCatalogListPageStore: AdminProductCatalogListPageStoreReducer,
		AdminProductCatalogNewEditPageStore: AdminProductCatalogNewEditPageStoreReducer,
		AdminOrdersStore: AdminOrdersStoreReducer,
		ProductPageStore: ProductPageStoreReducer,
		PhotoUploaderStore: PhotoUploaderStoreReducer,
		SearchProductsPageStore: SearchProductsPageStoreReducer,
		AuthStore: AuthReducer,
		AccountStore: AccountReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
