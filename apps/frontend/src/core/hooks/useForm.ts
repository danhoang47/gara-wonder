import { useRef, useState } from "react";

export type FieldConstraint = {
    required?: string;
    min?: [number, string];
    max?: [number, string];
    pattern?: [string | RegExp, string];
};

export type FieldAttrs<T> = {
    name: keyof T;
    role: "textbox" | "combobox";
    constraint?: FieldConstraint;
};

export type FieldRegister<T> = <K extends keyof T>(
    name: K,
    role?: string,
    constraint?: FieldConstraint,
) => {
    name: K;
    isInvalid: boolean;
    onValueChange: (value: T[K]) => void;
    errorMessage?: string;
};

const validate = (
    value: unknown,
    constraint: FieldConstraint,
): [boolean, string | undefined] => {
    if (constraint.required && Boolean(!value)) {
        return [false, constraint.required];
    }
    if (typeof value === "string") {
        if (constraint.required && !value) {
            return [false, constraint.required];
        }
        if (constraint.min) {
            const [min, errorMessage] = constraint.min;
            if (value.length < min) return [false, errorMessage];
        }
        if (constraint.max) {
            const [max, errorMessage] = constraint.max;
            if (value.length > max) return [false, errorMessage];
        }
    }
    if (Array.isArray(value)) {
        if (constraint.required && value.length === 0) {
            return [false, constraint.required];
        }
    }

    return [true, undefined];
};

export default function useForm<T>() {
    const formStateFields = useRef<FieldAttrs<T>[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const formRef = useRef<HTMLFormElement>(null);

    const onFormSubmit = (formSubmitHandler: (data: T) => void) => {
        return (e: React.FormEvent<HTMLFormElement>) => {
            if (formRef.current) {
                e.preventDefault();
                const formData = new FormData(formRef.current);
                const formState = formStateFields.current.reduce<T>(
                    (acc, { name }) => ({
                        ...acc,
                        [name]: formData.get(name as string),
                    }),
                    {} as T,
                );
                formSubmitHandler(formState);
            }
        };
    };

    const register = <K extends keyof T>(
        name: K,
        role: "textbox" | "combobox" = "textbox",
        constraint: FieldConstraint = {},
    ) => {
        if (!formStateFields.current.some((field) => field.name === name)) {
            formStateFields.current.push({
                name,
                role,
                constraint,
            });
        }

        return {
            name,
            errorMessage: errors?.[name],
            isInvalid: Boolean(errors?.[name]),
            onValueChange: (value: T[K]) => {
                const [isValid, errorMessage] = validate(value, constraint);
                if (!isValid) {
                    const alreadyError = errors[name] === errorMessage;
                    !alreadyError &&
                        setErrors((prev) => ({
                            ...prev,
                            [name]: errorMessage,
                        }));
                    return;
                }
                if (errors[name]) {
                    const newError = { ...errors };
                    delete newError[name];
                    setErrors(newError);
                }
            },
        };
    };

    const getCurrentErrors = () => {
        const newErrors: Partial<Record<keyof T, string>> = {};

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            formStateFields.current.forEach(({ name, role, constraint }) => {
                const [isValid, errorMessage] = validate(
                    formData.get(name as string),
                    constraint || {},
                );
                if (!isValid) {
                    newErrors[name as keyof T] = errorMessage;
                }
            });

            return newErrors;
        }

        return {};
    };

    const onSubmitButtonPressed = (handlePressed: () => void) => {
        return (e: React.MouseEvent) => {
            const newErrors = getCurrentErrors();
            if (Object.keys(newErrors).length) {
                e.preventDefault();
                setErrors(newErrors);
                return;
            }

            handlePressed();
        };
    };

    return { formRef, onFormSubmit, register, onSubmitButtonPressed };
}
