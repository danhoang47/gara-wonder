import { createContext, useCallback, useMemo, useState } from "react";
import { ContainerProps } from "../types";
import { SignInModal } from "@/features/user";

export type ModalType = "signIn" | "signOut";

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
            default:
                return undefined;
        }
    };

    const modalContextValue = useMemo(
        () => ({
            open: (type: ModalType) => {
                setCurrentModalType(type);
                setModalOpen(true)
                return;
            },
        }),
        [setCurrentModalType],
    );

    return (
        <ModalContext.Provider value={modalContextValue}>
            {children}
            {renderModal()}
        </ModalContext.Provider>
    );
}
