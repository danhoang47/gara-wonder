import { useRef, useState, useCallback } from "react"

export type GarageFormState = {
    name: string,
    description: string
}

export type FieldConstraint = {
    required?: string,
    min?: [number, string],
    max?: [number, string],
    pattern?: [string | RegExp, string],
}

const validate = (value: string | number, constraint: FieldConstraint) => {
    let errorMessage = ""

    if (constraint.required) {
        errorMessage = value.toString().length === 0 ? constraint.required : ""
    } else if (constraint.min) {
        const [min, message] = constraint.min
        errorMessage = value.toString().length < min ? message : ""
    } else if (constraint.max) {
        const [max, message] = constraint.max
        errorMessage = value.toString().length > max ? message : ""
    } else if (constraint.pattern) {
        const [pattern, message] = constraint.pattern
        errorMessage = value.toString().match(pattern) ? message : ""
    }

    return errorMessage
}

export default function useGarageForm(submitHandler: (data: GarageFormState) => void) {
    const formStateKeys = useRef<Array<keyof GarageFormState>>([]);
    const [errors, setErrors] = useState<Record<keyof GarageFormState, string>>({} as GarageFormState)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget)
        const formState = formStateKeys.current.reduce((acc, key) => ({ ...acc, [key]: formData.get(key) }), {} as GarageFormState)

        submitHandler(formState)
    }

    const register = useCallback(<K extends keyof GarageFormState>(name: K, constraint: FieldConstraint = {}) => {
        if (!formStateKeys.current.includes(name)) {
            formStateKeys.current.push(name)
        }
            
        return {
            name,
            errorMessage: errors?.[name],
            isInvalid: Boolean(errors?.[name]),
            onValueChange: (value: GarageFormState[K]) => {
                const errorMessage = validate(value, constraint)
                if (errorMessage) {
                    setErrors(err => ({...err, [name]: errorMessage}))
                } else {
                    if (!errors?.[name]) return;

                    const newErrors = {...errors}
                    delete newErrors[name]
                    setErrors(newErrors)
                }
            }
        }
    }, [errors])

    return { onSubmit, register }
}