import { createContext, useCallback, useMemo, useState } from "react";
import { ContainerProps } from "../types";
import { SignInModal } from "@/features/user";
import { Dialog } from "../ui";

export type ModalType = "signIn" | "signOut" | "location";

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
                        title="Enable Location Tracking"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut ex nisi. Quisque commodo sem et rhoncus hendrerit."
                        imageSrc="https://cdn-icons-png.flaticon.com/512/235/235861.png"
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
