import axios from 'axios'

import { baseGaragesUrl } from './index'

export default async function uploadGarageImages(backgroundImage?: File, images?: File[]): Promise<Response> {
    try {
        const formData = new FormData()
        
        if (backgroundImage) {
            formData.append("backgroundImage", backgroundImage)
        }
        
        if (images) {
            images.forEach(file => {
                formData.append("images", file)
            })    
        }

        const result = await axios.post<Response>(baseGaragesUrl + "/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return await result.data
    } catch (error) {
        throw new Error(JSON.stringify(error))
    } 
}