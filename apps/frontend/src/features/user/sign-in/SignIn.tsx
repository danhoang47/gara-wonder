/* eslint-disable react-refresh/only-export-components */
import { Modal, ModalContent } from "@nextui-org/react";
import { SignInForm } from "./sign-in-form";
import {  useRef, useState } from "react";
import { getAdditionalUserInfo, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/components/firebase";
import OTPForm from "./otp-form";
import { OTPFormRef } from "./otp-form/OTPForm";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { Type, signUp } from "../user.slice";
import ProfileForm from "./profile-form";

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
    const dispatch = useAppDispatch();
    const type = useAppSelector(state => state.user.type)
    const [step, setStep] = useState<SignInStep>(SignInStep.OTP);
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [isSignInLoading, setSignInLoading] = useState<boolean>(false)
    const otpFormRef = useRef<OTPFormRef>(null)

    const onOTPSubmit = (code: string | undefined) => {
        if (!code) return;

        otpFormRef.current?.showLoading()
        window.confirmationResult
            .confirm(code)
            .then((userCredential) => {
                window.userCredential = userCredential;
                const additionalUserInfo = getAdditionalUserInfo(userCredential);
                if (additionalUserInfo && additionalUserInfo.isNewUser || type === Type.SignUp) {
                    dispatch(signUp())
                    setStep(SignInStep.Profile)
                } else {
                    onClose()
                }
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
        setSignInLoading(true)
        signInWithPhoneNumber(
            auth,
            "+84" + formattedPhoneNumber,
            window.recaptchaVerifier,
        ).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setStep(SignInStep.OTP);
        }).finally(() => {
            setSignInLoading(false)
        })
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
                        isLoading={isSignInLoading}
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
            case SignInStep.Profile: 
                return (
                    <ProfileForm 
                        onClose={onClose}
                    />
                )
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>{onRender()}</ModalContent>
        </Modal>
    );
}

export default SignIn;
