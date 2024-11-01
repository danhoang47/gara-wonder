import { createContext, useState, useMemo, useCallback } from "react";

import { ContainerProps, Product, Supplier } from "@/core/types";
import { ObjectId } from "bson";

export type FieldConstraint = {
    required?: string;
    min?: [number, string];
    max?: [number, string];
};

export type RegistrationProduct = Partial<
    Omit<Product, "images" | "_id"> & {
        images?: File[];
        _id: ObjectId;
    }
>;

export type SupplierRegistration = Omit<Partial<Supplier>, "products"> & {
    products: RegistrationProduct[];
};

export type SupplierRegistrationErrors = {
    [K in keyof Supplier]?: string;
};

export type SupplierRegistrationContextType = {
    supplierRegistrationState: SupplierRegistration;
    setSupplierRegistrationStateValue: <K extends keyof Supplier>(
        key: K,
        value: SupplierRegistration[K],
    ) => void;
    supplierRegistrationErrors: SupplierRegistrationErrors;
};

const SupplierRegistrationContext =
    createContext<SupplierRegistrationContextType>(
        {} as SupplierRegistrationContextType,
    );

type SupplierRegistrationConstraints = {
    [K in keyof Supplier]?: FieldConstraint;
};

const supplierRegistrationConstraints: SupplierRegistrationConstraints = {
    name: {
        required: "Tên nhà cung cấp bắt buộc",
        min: [3, "Tên nhà cung cấp phải lớn hơn 3 ký tự"],
        max: [100, "Tên nhà cung cấp không được vượt quá 100 ký tự"],
    },
    address: {
        required: "Bắt buộc phải có địa chỉ",
    },
    location: {
        required: "Required",
    },
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

export function SupplierRegistrationContextProvider({
    children,
}: ContainerProps) {
    const [supplierRegistrationState, setSupplierRegistrationState] =
        useState<SupplierRegistration>({
            products: [],
        });
    const [supplierRegistrationErrors, setSupplierRegistrationErrors] =
        useState<SupplierRegistrationErrors>({});

    const setSupplierRegistrationStateValue = useCallback(
        <K extends keyof SupplierRegistration>(
            key: K,
            value: SupplierRegistration[K],
        ) => {
            const [isValid, errorMessage] = validate(
                value,
                supplierRegistrationConstraints[key],
            );

            setSupplierRegistrationState((prev) => ({
                ...prev,
                [key]: value,
            }));

            if (isValid) {
                setSupplierRegistrationErrors((prev) => {
                    if (prev[key]) {
                        const newErrors = { ...prev };
                        delete newErrors[key];

                        return newErrors;
                    }

                    return prev;
                });
                return;
            }

            setSupplierRegistrationErrors((prev) => {
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
            supplierRegistrationState,
            supplierRegistrationErrors,
            setSupplierRegistrationStateValue,
        }),
        [
            supplierRegistrationState,
            supplierRegistrationErrors,
            setSupplierRegistrationStateValue,
        ],
    );

    return (
        <SupplierRegistrationContext.Provider value={contextValue}>
            {children}
        </SupplierRegistrationContext.Provider>
    );
}

export default SupplierRegistrationContext;
