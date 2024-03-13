import { Notification, Response } from "@/core/types";
import { notificationsInstance } from ".";


export default async function getNotifications(currentId: string | undefined, limit: number | undefined, cursor: string | undefined | null) {
    try {
        let queryParams: string = ""

        if (currentId) {
            queryParams += `&currentId=${currentId}`
        }
        if (limit) {
            queryParams += `&limit=${limit}`
        } 
        if (cursor) {
            queryParams += `&cursor=${cursor}`
        }
        if (queryParams.length !== 0) {
            queryParams = queryParams.slice(1)
        }
        
        const result = await notificationsInstance.get<Response<Notification[]>>(`?${queryParams}`)
        return result.data
    } catch (err) {
        throw new Error(JSON.stringify(err))
    }
}