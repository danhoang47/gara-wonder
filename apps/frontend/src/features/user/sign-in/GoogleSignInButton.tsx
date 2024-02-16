import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from '@/components/firebase'

export type GoogleSignInButtonProps = {
    onSuccess?: () => void;
    onFailure?: () => void;
}

function GoogleSignInButton({
    onSuccess,
    onFailure
}: GoogleSignInButtonProps) {
    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(user);
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
