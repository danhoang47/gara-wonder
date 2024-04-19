export const baseSupplierUrl = `${import.meta.env.VITE_API_URL}/supplier`;
export const baseSupplierUrlWithoutSupplier = `${
    import.meta.env.VITE_API_URL
}/`;

export { default as uploadProductCsv } from "./uploadProductCsv";
export { default as getSampleCSV } from "./getSampleCSV";
export { default as getProductTypes } from "./getProductTypes";
export { default as createSupplier } from "./createSupplier";
export { default as uploadSupplierPhotos } from "./uploadSupplierPhotos";
export { default as getProducts } from "./getProducts"
export { default as getProductById } from './getProductById'