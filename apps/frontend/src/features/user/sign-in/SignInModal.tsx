import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import GoogleSignInButton from "./GoogleSignInButton";
import FBSignInButton from "./FBSignInButton";

export type SignInModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => void;
};

function SignInModal({ isOpen, onClose }: SignInModalProps) {

    const onSignInSucess = () => {
        
    }   

    const onSignInFailure = () => {
        
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="border-b">
                    <h3 className="w-full text-center font-semibold text-base">
                        Sign in or sign up
                    </h3>
                </ModalHeader>
                <ModalBody className="pb-8 pt-4">
                    <div>
                        <p className="text-xl font-semibold">Welcome to Garage Wonder</p>
                    </div>
                    <div className="rounded-md overflow-hidden border">
                        <Input classNames={{
                            inputWrapper: "bg-white"
                        }} label="Country" placeholder="Select your country" variant="flat" radius="none" />
                        <Input classNames={{
                            inputWrapper: "bg-white border-t"
                        }} label="Phone Number" placeholder="Enter your Phone number" variant="flat" radius="none" />
                    </div>
                    <Button color="primary" className="h-12">
                        <span className="font-semibold text-base">Sign In</span>
                    </Button>
                    <Divider  className="my-4"/>
                    <div className="flex flex-col gap-2">
                        <GoogleSignInButton />
                        <FBSignInButton />
                        <GoogleSignInButton />
                        <FBSignInButton />
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SignInModal;
