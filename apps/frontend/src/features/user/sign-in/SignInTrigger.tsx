import { useModalContext } from "@/core/hooks";

function SignInTrigger() {
    const { open } = useModalContext();

    return (
        <p
            onClick={() => {
                open("signIn");
            }}
        >
            Sign In
        </p>
    );
}

export default SignInTrigger;
