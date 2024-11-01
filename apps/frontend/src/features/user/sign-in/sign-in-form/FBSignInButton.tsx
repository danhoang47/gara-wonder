import { auth, fbAuthProvider } from "@/components/firebase";
import { Button } from "@nextui-org/react";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";


function FBSignInButton() {
    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, fbAuthProvider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    return (  
        <Button disableAnimation onPress={signIn} variant="bordered" className="h-12 relative" isDisabled>
            <img 
                alt="Facebook icon image"
                className="absolute left-3 w-6" 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png" 
            />
            <span className="font-medium">Tiếp tục với Facebook</span>
        </Button>
    );
}

export default FBSignInButton;