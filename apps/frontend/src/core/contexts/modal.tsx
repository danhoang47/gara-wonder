import { createContext, useCallback, useMemo, useState } from "react";
import Lottie from "react-lottie";

import { ContainerProps } from "../types";
import { SignInModal } from "@/features/user";
import { Dialog } from "../ui";
import locationAnimation from "@/assets/location_tracking.json";
import orderSuccessAnimation from "@/assets/order_success.json";

export type ModalType = "signIn" | "signOut" | "location" | "orderSuccess";

export type ModalContextType = {
    open: (type: ModalType) => void;
};

export const ModalContext = createContext<ModalContextType>(
    {} as ModalContextType,
);

export default function ModalContextProvider({ children }: ContainerProps) {
    const [currentModalType, setCurrentModalType] = useState<ModalType>();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const onModalClose = useCallback(() => {
        setModalOpen(false);
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
            default:
                return undefined;
        }
    };

    const open = useCallback((type: ModalType) => {
        setCurrentModalType(type);
        setModalOpen(true);
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
