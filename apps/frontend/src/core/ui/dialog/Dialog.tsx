import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
} from "@nextui-org/react";

export type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    imageSrc?: string;
    icon?: boolean;
    IconComponent?: React.ReactNode;
    alt?: string;
    title: string;
    description?: string;
    showNegativeButton?: boolean;
    positiveLabel?: string;
    negativeLabel?: string;
    onPositivePress?: () => void;
    onNegativePress?: () => void;
};

export default function Dialog({
    isOpen,
    onClose,
    title,
    description,
    imageSrc,
    icon = false,
    IconComponent,
    alt,
    negativeLabel = "Cancel",
    positiveLabel = "Got it",
    showNegativeButton = true,
    onPositivePress,
    onNegativePress,
}: DialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} hideCloseButton>
            <ModalContent>
                <ModalBody>
                    <div className="mt-4 flex justify-center">
                        {icon ? (
                            IconComponent
                        ) : (
                            <img
                                src={imageSrc}
                                alt={alt || title}
                                className="w-32 mx-auto"
                            />
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-center mb-3 text-lg">
                            {title}
                        </h4>
                        {description && (
                            <p className="text-center text-foreground-500 leading-5">
                                {description}
                            </p>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {showNegativeButton && (
                        <Button
                            onPress={onNegativePress}
                            variant="light"
                            className="grow"
                        >
                            {negativeLabel}
                        </Button>
                    )}
                    <Button
                        onPress={() => {
                            onPositivePress && onPositivePress();
                            onClose();
                        }}
                        className="bg-primary grow"
                    >
                        <span className="text-white text-base font-medium">
                            {positiveLabel}
                        </span>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
