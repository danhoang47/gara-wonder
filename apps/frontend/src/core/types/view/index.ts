import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";

export type StylableProps = {
    className?: string;
};

export type ContainerProps = {
    children?: React.ReactNode;
};

export type Toast = {
    id: string;
    type: "success" | "failure" | "warning";
    title: string;
    description?: string;
    delay?: number;
};

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        confirmationResult: ConfirmationResult;
    }
}
