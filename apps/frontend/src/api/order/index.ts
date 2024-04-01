import axios from "axios";

export const orderInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/order`,
});
export const managementOrderInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/garage`,
});

export { default as createOrders } from "./createOrders";
export { default as getOrders } from "./getOrders";
export { default as getOrderById } from "./getOrderById";
export { default as handleEvaluation } from "./handleEvaluation";
export { default as uploadEvaluationImage } from "./uploadEvaluationImage";
export { default as moveNextStep } from "./moveNextStep";
