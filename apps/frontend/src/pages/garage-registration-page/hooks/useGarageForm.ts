import { useForm } from "@/core/hooks"

export type GarageFormState = {
    name: string,
    description: string
}

export default function useGarageForm() {
    const { formRef, onFormSubmit, register, onSubmitButtonPressed } = useForm<GarageFormState>();



    return { formRef, register }
}