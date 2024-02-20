import axios from "axios";

import { baseUrl } from ".";
import { GarageRegistration } from "@/pages/garage-registration-page/contexts";

export default async function createGarage(garage: GarageRegistration) {
    try {   
        const formData = new FormData();

        Object.keys(garage).forEach(key => {
            const value = garage[key as keyof GarageRegistration]

            if (value instanceof File) {
                return;
            }
            
            formData.append(key, JSON.stringify(value))
        })

        console.log(formData)
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}