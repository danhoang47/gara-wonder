import { Button } from "@nextui-org/react";
import { User, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from '@/components/firebase'

export type GoogleSignInButtonProps = {
    onSuccess: () => void;
    onError: () => void;
}

function GoogleSignInButton({
    onSuccess,
    onError
}: GoogleSignInButtonProps) {
    const signIn = async () => {
        try {
            googleAuthProvider.setCustomParameters({
                prompt: "select_account"
            })
            await signInWithPopup(auth, googleAuthProvider);
            onSuccess()
        } catch (error) {
            onError()
        }
    };

    return (
        <Button disableAnimation variant="bordered" onPress={signIn} className="h-12 relative">
            <img 
                className="absolute left-3"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/24px-Google_%22G%22_logo.svg.png" 
            />
            <span className="font-medium">Continue with Google</span>
        </Button>
    );
}

export default GoogleSignInButton;
