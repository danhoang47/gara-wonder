import axios, { AxiosError, HttpStatusCode } from "axios";

const SERVER_URL_TESTING_PURPOSE = "https://garage-wonder.onrender.com/api";

export default async function getUser(params: unknown) {
    try {
        const result = await axios.post(
            SERVER_URL_TESTING_PURPOSE + "/payment/persist",
            params
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
