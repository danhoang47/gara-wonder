/* eslint-disable react-refresh/only-export-components */
import { Modal, ModalContent } from "@nextui-org/react";
import { SignInForm } from "./sign-in-form";
import { useEffect, useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/components/firebase";
import OTPForm from "./otp-form";

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

const DEFAULT_TRY_TIME = 3;

function SignIn({ isOpen, onClose }: SignInProps) {
    const [step, setStep] = useState<SignInStep>(SignInStep.SignIn);
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [otpError, setOTPError] = useState<boolean>(false);
    const [tryAgainTime, setTryAgainTime] = useState<number>(DEFAULT_TRY_TIME);

    const onSignInWithPhoneNumberPress = () => {
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

    const onOTPSubmitFail = () => {
        if (tryAgainTime === 1) {
            setStep(SignInStep.SignIn)
            setOTPError(false)
            return;
        } 

        setOTPError(true)
    };

    const onOTPSubmit = (code: string | undefined) => {
        if (!code) return;

        window.confirmationResult
            .confirm(code)
            .then((userCredential) => {
                userCredential.user;
            })
            .catch(onOTPSubmitFail);
    };

    const sendOTPCode = () => {
                
    }

    const onRender = () => {
        switch (step) {
            case SignInStep.SignIn:
                return (
                    <SignInForm
                        phoneNumber={phoneNumber}
                        onPhoneNumberChange={setPhoneNumber}
                        onClose={onClose}
                        onSave={onSignInWithPhoneNumberPress}
                    />
                );
            case SignInStep.OTP:
                return (
                    <OTPForm
                        phoneNumber={phoneNumber}
                        onBack={() => setStep(SignInStep.SignIn)}
                        onSave={onOTPSubmit}
                        onFail={onOTPSubmitFail}
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
