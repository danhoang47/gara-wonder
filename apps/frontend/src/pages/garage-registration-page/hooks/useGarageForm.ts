import { useForm } from "react-hook-form";

import { Garage } from "@/core/types";

export default function useGarageForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<Garage>()

    const onGarageFormSectionSubmit = handleSubmit((data: Garage) => {
        console.log(data)
    })

    

    return { register, onGarageFormSectionSubmit, errors, control }
}