import {
    faFileLines,
    faGear,
    faLayerGroup,
    faMoneyBills,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const ProgressBar = ({
    status,
    isProvideEvaluation,
}: {
    status?: number;
    isProvideEvaluation: boolean;
}) => {
    const checkProgress = (stat: number) => {
        if (status === stat) return `text-primary-500 border-primary-500 `;
        // @ts-expect-error type number
        if (status > stat) return `text-white border-primary bg-primary`;
        // @ts-expect-error type number
        if (status < stat) return `text-default-500 border-default-500`;
    };
    const checkProgressLine = (stat: number) => {
        // @ts-expect-error type number
        if (status > stat) return `bg-primary text-primary`;
        // @ts-expect-error type number
        if (status <= stat) return `bg-default-500`;
    };
    const checkProgressText = (stat: number) => {
        // @ts-expect-error type number
        if (status >= stat) return `text-primary`;
        // @ts-expect-error type number
        if (status < stat) return `text-default-500`;
    };
    return (
        <div className=" flex  items-center justify-center px-auto py-5 pb-10 ">
            {isProvideEvaluation ? (
                <div
                    className={clsx(
                        "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                        checkProgress(0),
                    )}
                >
                    <FontAwesomeIcon icon={faFileLines} size="2xl" />
                    <p
                        className={clsx(
                            "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                            checkProgressText(0),
                        )}
                    >
                        Đánh giá
                    </p>
                </div>
            ) : (
                <div
                    className={clsx(
                        "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                        checkProgress(0),
                    )}
                >
                    <FontAwesomeIcon icon={faFileLines} size="2xl" />
                    <p
                        className={clsx(
                            "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                            checkProgressText(0),
                        )}
                    >
                        Xem xét
                    </p>
                </div>
            )}

            <div className={clsx("min-w-32 h-1", checkProgressLine(0))} />
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(1),
                )}
            >
                <FontAwesomeIcon icon={faLayerGroup} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(1),
                    )}
                >
                    Chuẩn bị
                </p>
            </div>
            <div className={clsx("min-w-32 h-1", checkProgressLine(1))} />
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(2),
                )}
            >
                <FontAwesomeIcon icon={faGear} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(2),
                    )}
                >
                    Chỉnh sửa
                </p>
            </div>
            <div className={clsx("min-w-32 h-1", checkProgressLine(2))} />
            <div
                className={clsx(
                    "relative flex justify-center items-center rounded-full border-3 w-16 h-16 p-3",
                    checkProgress(3),
                )}
            >
                <FontAwesomeIcon icon={faMoneyBills} size="2xl" />
                <p
                    className={clsx(
                        "absolute -bottom-7 text-sm font-semibold whitespace-nowrap",
                        checkProgressText(3),
                    )}
                >
                    Thanh toán
                </p>
            </div>
        </div>
    );
};

export default ProgressBar;
