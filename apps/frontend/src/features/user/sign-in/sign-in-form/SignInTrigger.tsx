import { useModalContext } from "@/core/hooks";
import { StylableProps } from "@/core/types";

function SignInTrigger({ className }: StylableProps) {
    const { open } = useModalContext();

    return (
        <p
            onClick={() => {
                open("signIn");
            }}
            className={className}
        >
            Đăng nhập
        </p>
    );
}

export default SignInTrigger;
