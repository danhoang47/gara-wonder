import axios, { AxiosRequestConfig, HttpStatusCode } from "axios";
import { EnhancedStore } from "@reduxjs/toolkit";
import { auth } from "@/components/firebase";
import { updateToken } from "@/features/user/user.slice";
import { Message, Room } from "@/core/types/model";
import { Response } from "@/core/types";

// 401 => refresh
// auth.currentUser?.getIdToken().then()

const chatInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/room",
});

export const setup = (store: EnhancedStore) => {
    chatInstance.interceptors.request.use(async (request) => {
        const token = await auth.currentUser?.getIdToken();
        request.headers.Authorization = "Bearer " + token;

        return request;
    });

    chatInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { config } = error;

            if (!config || !config.retry) {
                return Promise.reject(error);
            }
            config.retry -= 1;

            if (error.response.status === HttpStatusCode.Unauthorized) {
                const newToken = await auth.currentUser?.getIdToken();
                store?.dispatch(updateToken(newToken));
                config.headers["Authorization"] = "Bearer " + newToken;
            }
            const delayRetryRequest = new Promise<void>((resolve) => {
                setTimeout(() => {
                    console.log("retry the request", config.url);
                    resolve();
                }, config.retryDelay || 1000);
            });
            return delayRetryRequest.then(() => chatInstance(config));
        },
    );
};

interface RetryConfig extends AxiosRequestConfig {
    retry: number;
    retryDelay: number;
}

const globalConfig: RetryConfig = {
    retry: 3,
    retryDelay: 1000,
};

export const getRooms = async () => {
    try {
        const result = await chatInstance.get<Response<Room[]>>(
            "/",
            globalConfig,
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export type TrackingStatus = Pick<Room, "isOnline" | "lastActiveAt" | "_id">;

export const trackingActivity = async (
    userId: string,
    garageId: string,
    roomId: string,
) => {
    try {
        const result = await chatInstance.post<Response<TrackingStatus>>(
            "/trackingActivity",
            {
                userId,
                garageId,
                roomId,
            },
            globalConfig,
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createRoom = async (userId: string, garageId: string) => {
    try {
        const result = await chatInstance.post<Response<Room>>(
            "/",
            {
                userId,
                garageId,
            },
            globalConfig,
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteRoom = async (roomId: string) => {
    try {
        const result = await chatInstance.delete<Response<Room>>(
            `/${roomId}`,
            globalConfig,
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getMessages = async (
    roomId: string,
    limit?: number,
    cursor?: string,
) => {
    try {
        let url: string = `/${roomId}/message?limit=${limit}`;

        if (cursor) {
            url += `&cursor=${cursor}`;
        }

        const result = await chatInstance.get<Response<Message[]>>(
            url,
            globalConfig,
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
