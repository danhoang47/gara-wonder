import axios, { AxiosError, HttpStatusCode } from "axios";

export default async function persistPayment(params: unknown) {
    try {
        const result = await axios.post(
            import.meta.env.VITE_BASE_URL + "/payment/persist",
            params,
        );
        return result.data;
    } catch (_error) {
        const error = _error as AxiosError;
        const { response } = error;

        if (response?.status !== HttpStatusCode.NotFound) {
            return Promise.reject(error);
        }
    }
}
