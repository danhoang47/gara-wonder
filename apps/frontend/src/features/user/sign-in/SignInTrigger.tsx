import { useModalContext } from "@/core/hooks";

function SignInTrigger() {
    const { open } = useModalContext();

    return (
        <p
            onClick={() => {
                open("signIn");
            }}
        >
            Đăng nhập
        </p>
    );
}

export default SignInTrigger;
