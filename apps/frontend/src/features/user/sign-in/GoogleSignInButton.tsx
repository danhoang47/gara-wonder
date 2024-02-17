import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, googleAuthProvider } from '@/components/firebase'

export type GoogleSignInButtonProps = {
    onSuccess?: () => void;
    onFailure?: () => void;
}

function GoogleSignInButton({
    onSuccess,
    onFailure
}: GoogleSignInButtonProps) {
    auth.signOut()

    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
        } catch (error) {
            console.log(error);
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
