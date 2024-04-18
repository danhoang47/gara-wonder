export const baseSupplierUrl = `${import.meta.env.VITE_API_URL}/supplier`;

export { default as uploadProductCsv } from "./uploadProductCsv";
export { default as getSampleCSV } from "./getSampleCSV";
export { default as getProductTypes } from "./getProductTypes";
export { default as createSupplier } from "./createSupplier";
export { default as uploadSupplierPhotos } from "./uploadSupplierPhotos";
export { default as getProducts } from "./getProducts";
export { default as getProductById } from "./getProductById";
export { default as createSupplierReview } from "./createSupplierReview";
export { default as getReviewableStatus } from "./getReviewableStatus";
