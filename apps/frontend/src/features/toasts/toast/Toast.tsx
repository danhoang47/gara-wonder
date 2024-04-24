import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faCircleExclamation,
    faXmark,
    faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "@/core/hooks";
import { removeToast } from "../toasts.slice";
import { Toast as ToastType } from "@/core/types";

export type ToastProps = {
    item: ToastType;
};

function Toast({ item }: ToastProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(removeToast(item.id));
        }, item.delay);
    }, [dispatch, item.delay, item.id]);

    const getIcon = () => {
        switch (item.type) {
            case "success":
                return faCheckCircle;
            case "failure":
                return faXmarkCircle;
            case "warning":
                return faCircleExclamation;
            default:
                throw new Error("Invalid Toast Type");
        }
    };

    return (
        <div
            className={`toast flex shadow-small w-80 p-4 rounded-medium bg-background hover:opacity-80 transition-opacity`}
        >
            <div className="pr-4 flex items-center">
                <FontAwesomeIcon
                    icon={getIcon()}
                    size="lg"
                    className={`text-${item.type === "failure" ? "danger" : item.type}`}
                />
            </div>
            <div className="grow text-ellipsis overflow-x-hidden whitespace-nowrap flex flex-col justify-center">
                <p className="text-small font-medium">{item.title}</p>
                <span className="text-xs text-default-400">
                    {item.description}
                </span>
            </div>
            <div
                onClick={() => dispatch(removeToast(item.id))}
                className="flex ml-auto cursor-pointer"
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    className="text-foreground-400 hover:text-foreground"
                />
            </div>
        </div>
    );
}

export default Toast;
