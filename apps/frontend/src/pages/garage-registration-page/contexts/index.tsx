import { createContext, useState, useMemo, useCallback } from "react";

import { ContainerProps, Garage } from "@/core/types";

export type FieldConstraint = {
    required?: string;
    min?: [number, string];
    max?: [number, string];
};

export type GarageRegistration = Partial<
    Omit<Garage, "images" | "backgroundImage" | "additionalServices">
> & {
    backgroundImage?: File;
    images?: File[];
    additionalServices?: string[];
};

export type GarageRegistrationErrors = {
    [K in keyof GarageRegistration]?: string;
};

export type GarageRegistrationContextType = {
    garageRegistrationState: GarageRegistration;
    setGarageRegistrationStateValue: <K extends keyof GarageRegistration>(
        key: K,
        value: GarageRegistration[K],
    ) => void;
    garageRegistrationErrors: GarageRegistrationErrors;
};

const GarageRegistrationContext = createContext<GarageRegistrationContextType>(
    {} as GarageRegistrationContextType,
);

type GarageRegistrationConstraints = {
    [K in keyof GarageRegistration]?: FieldConstraint;
};

const garageRegistrationConstraints: GarageRegistrationConstraints = {
    name: {
        required: "Tên của garage là bắt buộc",
        min: [3, "Tên của garage phải dài hơn 3 ký tự"],
        max: [100, "Tên của garage phải ngắn hơn 100 ký tự"],
    },
    address: {
        required: "Địa chỉ là bắt buộc",
    },
    location: {
        required: "Địa điểm trên bản đồ là bắt buộc",
    },
    services: {
        required: "Garage của bạn phải có ít nhất một dịch vụ",
    },
};

const validate = (
    value: unknown,
    constraint: FieldConstraint | undefined,
): [boolean, string | undefined] => {
    if (!constraint) return [true, undefined];

    if (constraint?.required) {
        if (!value) return [false, constraint.required];

        const isArray = Array.isArray(value);

        if (isArray && (value.length === 0 || !value)) {
            return [false, constraint.required];
        }
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
        useState<GarageRegistration>({
            defaultSlot: 10,
            address: "",
            name: "",
        });
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
                        const newErrors = { ...prev };
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
