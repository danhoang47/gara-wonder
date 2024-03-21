import { createContext, useCallback, useMemo, useState } from "react";
import { ContainerProps } from "../types";
import { SignInModal } from "@/features/user";
import { Dialog } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

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
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ex nisi. Quisque commodo sem et rhoncus hendrerit."
                        imageSrc="https://cdn-icons-png.flaticon.com/512/235/235861.png"
                        showNegativeButton={false}
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
                        IconComponent={<FontAwesomeIcon icon={faCircleCheck} className="text-success" size="8x"/>}
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
