import {
    Button,
    Divider,
    Input,
    ModalBody,
    ModalHeader,
} from "@nextui-org/react";
import { RecaptchaVerifier } from "firebase/auth";

import { useAppDispatch } from "@/core/hooks";
import { notify } from "@/features/toasts/toasts.slice";
import GoogleSignInButton from "./GoogleSignInButton";
import FBSignInButton from "./FBSignInButton";
import { useEffect, useId, useMemo, useState } from "react";
import { isPhoneNumber } from "@/utils";
import { auth } from "@/components/firebase";
import clsx from "clsx";

export type SignInModalProps = {
    phoneNumber?: string;
    onPhoneNumberChange: (value: string) => void;
    onClose: () => void;
    onSave?: () => void;
    isLoading: boolean;
};

function SignInForm({
    onClose,
    phoneNumber,
    onPhoneNumberChange,
    onSave,
    isLoading,
}: SignInModalProps) {
    const dispatch = useAppDispatch();
    const [hasInputFocus, setInputFocus] = useState<boolean>(true);
    const isPhoneNumberValid = useMemo(
        () => isPhoneNumber(phoneNumber),
        [phoneNumber],
    );
    const signInButtonId = useId();
    const shouldShowInputError =
        !isPhoneNumberValid && !hasInputFocus && Boolean(phoneNumber?.length);

    const onError = () => {
        dispatch(
            notify({
                title: "Error while sign in",
                type: "failure",
                description:
                    "An error occurred while sign in, please try again",
            }),
        );
    };

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, signInButtonId, {
            size: "invisible",
            callback: (response: unknown) => {
                console.log(response);
            },
        });
    }, [signInButtonId]);

    useEffect(() => {
        onPhoneNumberChange("");
    }, []);

    return (
        <>
            <ModalHeader className="border-b">
                <h3 className="w-full text-center font-semibold text-base">
                    Đăng nhập hoặc đăng ký
                </h3>
            </ModalHeader>
            <ModalBody className="pb-8 pt-4">
                <div>
                    <p className="text-xl font-semibold">
                        Chào mừng tới Garage Wonder
                    </p>
                </div>
                <div className="overflow-hidden">
                    <Input
                        classNames={{
                            inputWrapper:
                                "bg-white border-t border-x rounded-t-lg",
                        }}
                        label="Country"
                        placeholder="Select your country"
                        variant="flat"
                        radius="none"
                        value="+84 (Việt Nam)"
                        isReadOnly
                    />
                    <Input
                        autoFocus
                        classNames={{
                            inputWrapper: clsx(
                                "bg-white border rounded-b-lg group-data-[focus-visible=true]:ring-0",
                                shouldShowInputError && "border-danger",
                            ),
                        }}
                        label="Phone Number"
                        placeholder="Enter your Phone number"
                        variant="flat"
                        value={phoneNumber}
                        onValueChange={onPhoneNumberChange}
                        radius="none"
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                        errorMessage={
                            shouldShowInputError &&
                            "Vui lòng nhập đúng số điện thoại"
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && isPhoneNumberValid) {
                                onSave && onSave();
                            }
                        }}
                    />
                </div>
                <Button
                    color="primary"
                    className="h-12"
                    id={signInButtonId}
                    isDisabled={!isPhoneNumberValid}
                    onPress={onSave}
                    isLoading={isLoading}
                >
                    <span className="font-semibold text-base">Đăng nhập</span>
                </Button>
                <Divider className="my-4" />
                <div className="flex flex-col gap-2">
                    <GoogleSignInButton onSuccess={onClose} onError={onError} />
                    <FBSignInButton />
                </div>
            </ModalBody>
        </>
    );
}

export default SignInForm;
