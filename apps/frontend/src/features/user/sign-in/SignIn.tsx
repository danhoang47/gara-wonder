/* eslint-disable react-refresh/only-export-components */
import { Modal, ModalContent } from "@nextui-org/react";
import { SignInForm } from "./sign-in-form";
import {  useRef, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/components/firebase";
import OTPForm from "./otp-form";
import { OTPFormRef } from "./otp-form/OTPForm";

export type SignInProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => void;
};

export enum SignInStep {
    SignIn = 0,
    OTP,
    Profile,
}

function SignIn({ isOpen, onClose }: SignInProps) {
    const [step, setStep] = useState<SignInStep>(SignInStep.SignIn);
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const otpFormRef = useRef<OTPFormRef>(null)

    const onOTPSubmit = (code: string | undefined) => {
        if (!code) return;

        otpFormRef.current?.showLoading()
        window.confirmationResult
            .confirm(code)
            .then((userCredential) => {
                userCredential.user;
            })
            .catch(() => {
                otpFormRef.current?.showError()
                setPhoneNumber("")
            })
            .finally(() => otpFormRef.current?.clearLoading())
    };

    const sendOTPCode = () => {
        const formattedPhoneNumber = phoneNumber?.startsWith("0")
            ? phoneNumber?.slice(1)
            : phoneNumber;
        signInWithPhoneNumber(
            auth,
            "+84" + formattedPhoneNumber,
            window.recaptchaVerifier,
        ).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setStep(SignInStep.OTP);
        });
    };

    const onRender = () => {
        switch (step) {
            case SignInStep.SignIn:
                return (
                    <SignInForm
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={setPhoneNumber}
                        onClose={onClose}
                        onSave={sendOTPCode}
                    />
                );
            case SignInStep.OTP:
                return (
                    <OTPForm
                        ref={otpFormRef}
                        phoneNumber={phoneNumber}
                        onBack={() => setStep(SignInStep.SignIn)}
                        onSave={onOTPSubmit}
                    />
                );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>{onRender()}</ModalContent>
        </Modal>
    );
}

export default SignIn;
