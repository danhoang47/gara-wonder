import { ContainerProps, Evaluation } from "@/core/types";
import { createContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export type EvaluationInfo = {
    orderId: string;
    services: { serviceId: string; price: number }[];
    description: string;
    evaluationImages: File[];
} & Evaluation;

export type EvaluationContextType = {
    evaluation?: Partial<EvaluationInfo>;
    setEvaluationValue: <K extends keyof EvaluationInfo>(
        key: K,
        value: EvaluationInfo[K],
    ) => void;
};

export const EvaluationContext = createContext<EvaluationContextType>(
    {} as EvaluationContextType,
);

export default function EvaluationContextProvider({
    children,
}: ContainerProps) {
    const { orderId } = useParams();
    const [evaluation, setEvaluation] = useState<Partial<EvaluationInfo>>({
        orderId: orderId,
    });

    const setEvaluationValue = <K extends keyof EvaluationInfo>(
        k: K,
        v: EvaluationInfo[K],
    ) => {
        setEvaluation((prev) => ({
            ...prev,
            [k]: v,
        }));
    };

    const EvaluationContextValue = useMemo(
        () => ({
            evaluation,
            setEvaluationValue,
        }),
        [evaluation],
    );

    return (
        <EvaluationContext.Provider value={EvaluationContextValue}>
            {children}
        </EvaluationContext.Provider>
    );
}
