import { auth } from "@/components/firebase";
import { useAppDispatch, useLoadingContext } from "@/core/hooks";
import { signout } from "../user.slice";


function SignOutTrigger() {
    const dispatch = useAppDispatch();
    const { load, unload } = useLoadingContext()

    return (
        <p
            onClick={() => {
                load()
                dispatch(signout())
                auth.signOut().finally(() => unload())
            }}
        >
            Sign Out
        </p>
    );
}

export default SignOutTrigger;