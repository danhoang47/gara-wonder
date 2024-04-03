import { createContext, useCallback, useMemo, useState } from "react";
import Lottie from "react-lottie";

import { ContainerProps } from "../types";
import { ProfileDialog, SignInModal } from "@/features/user";
import { Dialog } from "../ui";
import locationAnimation from "@/assets/location_tracking.json";
import orderSuccessAnimation from "@/assets/order_success.json";

export type ModalType = "signIn" | "signOut" | "location" | "orderSuccess" | "profile";

export type ModalContextType<T = unknown> = {
    open: (type: ModalType, params: T) => void;
};

export const ModalContext = createContext<ModalContextType>(
    {} as ModalContextType,
);

export default function ModalContextProvider({ children }: ContainerProps) {
    const [currentModalType, setCurrentModalType] = useState<ModalType>();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [params, setParams] = useState<unknown>()

    const onModalClose = useCallback(() => {
        setModalOpen(false);
        setParams({})
        setCurrentModalType(undefined)
    }, []);

    const renderModal = () => {
        switch (currentModalType) {
            case "signIn":
                return (
                    <SignInModal isOpen={isModalOpen} onClose={onModalClose} />
                );
            case "location":
                return (
                    <Dialog
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        title="Cho phép sử dụng vị trí"
                        description="Cho phép chế độ sử dụng vị trí qua GPS. Điều này giúp chúng tôi cải thiện kết quả tìm kiếm của bạn"
                        showNegativeButton={false}
                        icon
                        IconComponent={
                            <div className="w-32 h-32">
                                <Lottie
                                    options={{
                                        animationData: locationAnimation,
                                        autoplay: true,
                                        loop: true,
                                    }}
                                />
                            </div>
                        }
                    />
                );
            case "orderSuccess":
                return (
                    <Dialog
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        title="Đặt đơn sửa chữa thành công"
                        description="Đặt đơn sửa chữa thành công. Hãy theo dõi tiến độ đơn trong danh sách đơn hàng của bạn."
                        icon
                        IconComponent={
                            <div className="w-32 h-32">
                                <Lottie
                                    options={{
                                        animationData: orderSuccessAnimation,
                                        autoplay: true,
                                        loop: true,
                                    }}
                                />
                            </div>
                        }
                        showNegativeButton={false}
                    />
                );
            case "profile":
                return (
                    <ProfileDialog 
                        isOpen={isModalOpen}
                        onClose={onModalClose}
                        userId={params as string}
                    />
                )
            default:
                return undefined;
        }
    };

    const open = useCallback((type: ModalType, params: unknown) => {
        setCurrentModalType(type);
        setModalOpen(true);
        setParams(params)
        return;
    }, []);

    const modalContextValue = useMemo(
        () => ({
            open,
        }),
        [open],
    );

    return (
        <ModalContext.Provider value={modalContextValue}>
            {children}
            {renderModal()}
        </ModalContext.Provider>
    );
}
