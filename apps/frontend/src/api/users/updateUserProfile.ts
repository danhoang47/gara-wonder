import { Response, User } from "@/core/types"
import axios from "axios"
import { baseUsersUrl } from "."
import { auth } from "@/components/firebase"


export default async function updateUserProfile(formData: FormData) {
    try {
        const token = await auth.currentUser?.getIdToken();
        const result = await axios<Response<User>>({
            method: "post",
            url: `${baseUsersUrl}/update`,
            data: formData,
            headers: { 
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + token
            }
        })
        return result.data
    } catch(_error) {
        return Promise.reject(_error)
    }
}