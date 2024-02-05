import { createContext, useState, useMemo, useCallback } from "react";

import { ContainerProps, Garage } from "@/core/types";
import { FieldConstraint } from "@/core/hooks/useForm";

export type GarageRegistration = Partial<Omit<Garage, "images" | "backgroundImage">> & {
    backgroundImage?: File,
    images?: File[]
}

export type GarageRegistrationErrors = {
    [K in keyof GarageRegistration]: string;
};

export type GarageRegistrationContextType = {
    garageRegistrationState: GarageRegistration;
    setGarageRegistrationStateValue: <K extends keyof GarageRegistration>(
        key: K,
        value: GarageRegistration[K],
    ) => void;
    garageRegistrationErrors: GarageRegistrationErrors;
    // TODO: Need implement 
    // validateGarageState: () => void;
};

const GarageRegistrationContext = createContext<GarageRegistrationContextType>(
    {} as GarageRegistrationContextType,
);

type GarageRegistrationConstraints = {
    [K in keyof GarageRegistration]?: FieldConstraint;
};

const garageRegistrationConstraints: GarageRegistrationConstraints = {
    name: {
        required: "Garage's name is required",
        min: [3, "Garage's name is must be larger than 3 characters"],
        max: [100, "Garage's name is must be smaller than 100 characters"],
    },
    province: {
        required: "Province is required"
    },
    district: {
        required: "District is required"
    },
    ward: {
        required: "Ward is required"
    },
    streetAddress: {
        required: "Address is required"
    }
};

const validate = (
    value: unknown,
    constraint: FieldConstraint | undefined,
): [boolean, string | undefined] => {
    if (!constraint) return [true, undefined];

    if (constraint.required && !value) {
        return [false, constraint.required];
    }

    if (typeof value === "string") {
        if (constraint.min) {
            const [min, errorMessage] = constraint.min;

            if (value.length < min) return [false, errorMessage];
        }

        if (constraint.max) {
            const [max, errorMessage] = constraint.max;

            if (value.length > max) return [false, errorMessage];
        }
    }

    return [true, undefined];
};

export function GarageRegistrationContextProvider({
    children,
}: ContainerProps) {
    const [garageRegistrationState, setGarageRegistrationState] =
        useState<GarageRegistration>({});
    const [garageRegistrationErrors, setGarageRegistrationErrors] =
        useState<GarageRegistrationErrors>({});

    const setGarageRegistrationStateValue = useCallback(
        <K extends keyof GarageRegistration>(
            key: K,
            value: GarageRegistration[K],
        ) => {
            const [isValid, errorMessage] = validate(
                value,
                garageRegistrationConstraints[key],
            );

            setGarageRegistrationState((prev) => ({
                ...prev,
                [key]: value,
            }));

            if (isValid) {
                setGarageRegistrationErrors((prev) => {
                    if (prev[key]) {
                        const newErrors = {...prev};
                        delete newErrors[key];

                        return newErrors;
                    }

                    return prev;
                });
                return;
            }

            setGarageRegistrationErrors((prev) => {
                if (prev[key] !== errorMessage) {
                    return {
                        ...prev,
                        [key]: errorMessage,
                    };
                }

                return prev;
            });
        },
        [],
    );

    const contextValue = useMemo(
        () => ({
            garageRegistrationState,
            garageRegistrationErrors,
            setGarageRegistrationStateValue,
        }),
        [
            garageRegistrationState,
            garageRegistrationErrors,
            setGarageRegistrationStateValue,
        ],
    );

    return (
        <GarageRegistrationContext.Provider value={contextValue}>
            {children}
        </GarageRegistrationContext.Provider>
    );
}

export default GarageRegistrationContext;
