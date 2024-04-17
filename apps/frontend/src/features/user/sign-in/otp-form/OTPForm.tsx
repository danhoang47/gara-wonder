import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, CircularProgress, ModalBody } from "@nextui-org/react";
import clsx from "clsx";
import moment from "moment";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";

export type OTPFormProps = {
    phoneNumber?: string;
    onSave: (code: string | undefined) => void;
    onBack: () => void;
};

export type OTPFormRef = {
    showError: () => void;
    clearError: () => void;
    showLoading: () => void;
    clearLoading: () => void;
};

const DEFAULT_OTP_LENGTH = 6;
const DEFAULT_TRY_AGAIN_TIME = 3;
const DEFAULT_EXPIRED_TIME = 15000;
const otpInputs = Array.from(new Array(DEFAULT_OTP_LENGTH));
const HIDDEN_SYMBOLS = "****";

const OTPForm = forwardRef<OTPFormRef, OTPFormProps>(
    ({ phoneNumber = "", onBack, onSave }, ref) => {
        const [otpCode, setOtpCode] = useState<string>("");
        const [isError, setError] = useState<boolean>(false);
        const [hasFocus, setFocus] = useState<boolean>(false);
        const [isLoading, setLoading] = useState<boolean>(false);
        const [expiredTime, setExpiredTime] =
            useState<number>(DEFAULT_EXPIRED_TIME);
        const [tryAgainTime, setTryAgainTime] = useState<number>(
            DEFAULT_TRY_AGAIN_TIME,
        );
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

            setOtpCode(code);
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
                event.currentTarget.blur();
                window.getSelection()?.removeAllRanges();
                return;
            }

            range.selectNodeContents(elementWillReceiveFocus);
            range.collapse(false);
            const selection = window.getSelection();

            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };

        const onCodeRemove = (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Backspace") {
                const placeHolders = event.currentTarget.querySelectorAll(
                    "[data-index]",
                ) as NodeListOf<HTMLDivElement>;
                placeHolders[otpCode.length - 1].focus();
                setOtpCode((prev) => prev.slice(0, prev.length - 1));
            }
        };

        useEffect(() => {
            if (otpCode.length === DEFAULT_OTP_LENGTH) {
                onSave(otpCode);
            }
        }, [onSave, otpCode]);

        useEffect(() => {
            const id = setInterval(() => {
                setExpiredTime((prev) => prev - 1000);
            }, 1000);

            return () => clearInterval(id);
        }, []);

        useEffect(() => {
            if (expiredTime === 0) onBack();
        }, [expiredTime, onBack]);

        useImperativeHandle(
            ref,
            () => ({
                clearError: () => {
                    setError(false);
                },
                showError: () => {
                    setError(true);
                    setOtpCode("");
                    if (tryAgainTime === 0) {
                        onBack();
                    } else {
                        setTryAgainTime((prev) => prev - 1);
                    }
                },
                clearLoading: () => {
                    setLoading(false);
                },
                showLoading: () => {
                    setLoading(true);
                },
            }),
            [],
        );

        return (
            <ModalBody>
                <div className="flex flex-col items-center px-10 pt-10 relative">
                    <Button
                        isIconOnly
                        className="bg-background absolute -left-6 -top-2"
                        radius="full"
                        onPress={onBack}
                    >
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="text-foreground-500"
                        />
                    </Button>

                    <h1 className="font-semibold text-large">
                        Xác nhận tài khoản
                    </h1>
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
                        onKeyDown={onCodeRemove}
                        onFocusCapture={(event) => {
                            if (!hasFocus) {
                                const placeholders =
                                    event.currentTarget.querySelectorAll(
                                        "[data-index]",
                                    ) as NodeListOf<HTMLDivElement>;
                                placeholders[otpCode.length].focus();
                            }

                            setFocus(true);
                        }}
                        onBlur={() => setFocus(false)}
                    >
                        {otpInputs.map((_, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    "px-2 pb-2 font-semibold text-3xl text-center",
                                    "outline-none border-b-2 min-w-[36px]",
                                    otpCodeCharacters[index] &&
                                        "border-b-primary",
                                    isError && "border-danger",
                                )}
                                contentEditable
                                suppressContentEditableWarning
                                data-index={index}
                            >
                                {otpCodeCharacters[index] || ""}
                            </div>
                        ))}
                    </div>
                    {isLoading && (
                        <div className="flex justify-center">
                            <CircularProgress aria-labelledby="OTP Loading Progress" />
                        </div>
                    )}
                    {isError && !hasFocus && (
                        <p className="text-danger text-center text-small">
                            Mã xác nhận không hợp lệ, bạn còn {tryAgainTime} lần
                            thử
                        </p>
                    )}
                </div>
                <div className="mb-4 mt-16">
                    <p
                        className={clsx(
                            "text-center pb-4 text-small font-medium",
                            expiredTime <= 60000 && "text-danger",
                        )}
                    >
                        Còn lại {moment.utc(expiredTime).format("mm:ss")}
                    </p>
                    <p className="text-default-400 italic text-center text-small">
                        Không nhận được mã?{" "}
                        <span className="">Nhận lại mã</span>
                    </p>
                </div>
            </ModalBody>
        );
    },
);

export default OTPForm;
