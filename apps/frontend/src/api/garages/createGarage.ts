import axios from "axios";

import { baseGaragesUrl } from ".";
import { Model, Response } from "@/core/types";
import { GarageRegistration } from "@/pages/garage-registration-page/contexts";

export default async function createGarage(garage: GarageRegistration): Promise<Response> {
    try {   
        const formData = new FormData();

        Object.keys(garage).forEach(key => {
            const value = garage[key as keyof GarageRegistration]

            if (value instanceof File) {
                return;
            }

            if (typeof value === "string" || typeof value === "number") {
                formData.append(key, String(value))
                return
            }

            if (Array.isArray(value)) {
                value.forEach(val => {
                    if (typeof val === "object" && "_id" in val) {
                        delete val._id
                    }
                })
            }
            
            formData.append(key, JSON.stringify(value).replace(/\s+/g, ''))
        })

        const result = await axios.post<Response>(baseGaragesUrl + "/createGarage", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return result.data
    } catch (error) {
        throw new Error("Server Error")
    }
}