import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ModalBody } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

export type OTPFormProps = {
    phoneNumber?: string;
    onSave: (code: string | undefined) => void;
    onBack: () => void;
    onFail: () => void;
};

const DEFAULT_OTP_LENGTH = 6;
const otpInputs = Array.from(new Array(DEFAULT_OTP_LENGTH));
const HIDDEN_SYMBOLS = "****";

function OTPForm({ phoneNumber = "", onBack, onSave, onFail }: OTPFormProps) {
    const [otpCode, setOtpCode] = useState<string>("");
    const otpCodeCharacters = otpCode.split("");
    const displayPhoneNumber = useMemo(() => {
        return `+84 ${phoneNumber.slice(
            0,
            phoneNumber.length - 4,
        )}${HIDDEN_SYMBOLS}`;
    }, [phoneNumber]);

    const onCodeChange = (event: React.FormEvent<HTMLDivElement>) => {
        const range = document.createRange();
        const code = event.currentTarget.textContent;

        if (code === null || code.length > DEFAULT_OTP_LENGTH) return;

        const placeHolders = event.currentTarget.querySelectorAll(
            "[data-index]",
        ) as NodeListOf<HTMLDivElement>;
        let elementWillReceiveFocus: HTMLDivElement;
        const isAdded = code.length > otpCode.length;

        if (!code) {
            elementWillReceiveFocus = placeHolders[0];
        } else if (code.length !== DEFAULT_OTP_LENGTH) {
            if (isAdded) {
                elementWillReceiveFocus = placeHolders[code.length];
            } else {
                elementWillReceiveFocus = placeHolders[code.length - 1];
            }
        } else {
            elementWillReceiveFocus = placeHolders[DEFAULT_OTP_LENGTH - 1];
        }

        range.selectNodeContents(elementWillReceiveFocus);
        range.collapse(false);
        const selection = window.getSelection();

        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }

        setOtpCode(code);
    };

    return (
        <ModalBody>
            <div className="flex flex-col items-center px-10 pt-10 relative">
                <Button
                    isIconOnly
                    className="bg-background absolute -left-6 -top-2"
                    radius="full"
                    onPress={onBack}
                >
                    <FontAwesomeIcon icon={faAngleLeft} className="text-foreground-500"/>
                </Button>

                <h1 className="font-semibold text-large">Xác nhận tài khoản</h1>
                <p className="font-medium text-small text-center">
                    Chúng tôi đã gửi mã OTP xác nhận tới số điện thoại{" "}
                    {displayPhoneNumber}
                </p>
            </div>
            <div className="mt-16">
                <div
                    className="flex gap-6 justify-center mb-6"
                    onInputCapture={onCodeChange}
                    tabIndex={-1}
                >
                    {otpInputs.map((_, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "px-2 pb-2 font-semibold text-3xl text-center",
                                "outline-none border-b-2 min-w-[36px]",
                                otpCodeCharacters[index] && "border-b-primary",
                            )}
                            contentEditable
                            tabIndex={-1}
                            suppressContentEditableWarning
                            data-index={index}
                            onBeforeInput={(event) => {
                                if (otpCodeCharacters[index]) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            {otpCodeCharacters[index] || ""}
                        </div>
                    ))}
                </div>
            </div>
            <Button onPress={() => onSave(otpCode)} color="primary">
                <span className="font-medium">Xác nhận</span>
            </Button>
            <p className="mb-4 mt-16 text-default-400 italic text-center text-small">
                Không nhận được mã? <span className="">Nhận lại mã</span>
            </p>
        </ModalBody>
    );
}

export default OTPForm;
