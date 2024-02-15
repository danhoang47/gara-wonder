import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import GoogleSignInButton from "./GoogleSignInButton";
import FBSignInButton from "./FBSignInButton";

export type SignInModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => void;
};

function SignInModal({ isOpen, onClose }: SignInModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="border-b">
                    <h3 className="w-full text-center font-semibold text-base">
                        Sign in or sign up
                    </h3>
                </ModalHeader>
                <ModalBody className="pb-10">
                    <div className="py-4">
                        <p className="text-xl font-semibold">Welcome to Garage Wonder</p>
                    </div>
                    <GoogleSignInButton />
                    <FBSignInButton />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SignInModal;
