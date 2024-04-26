import { auth } from "@/components/firebase";
import axios, { AxiosError, HttpStatusCode } from "axios";

const SERVER_URL_TESTING_PURPOSE = "https://garage-wonder.onrender.com/api";

export default async function persistPayment(params: unknown) {
    try {
        const token = await auth.currentUser?.getIdToken(true)
        const result = await axios.post(
            SERVER_URL_TESTING_PURPOSE +
                "/payment/persist" +
                (params?.type ? "/bill" : ""),
            params,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
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
