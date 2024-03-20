import { auth } from "@/components/firebase";
import { useAppDispatch, useLoadingContext } from "@/core/hooks";
import { signOut } from "../user.slice";

function SignOutTrigger() {
    const dispatch = useAppDispatch();
    const { load, unload } = useLoadingContext()

    const onSignOutButtonClick = () => {
        load("signOut")    
        auth.signOut().finally(() => {
            dispatch(signOut()) 
            unload("signOut")
        })
    }

    return (
        <p onClick={onSignOutButtonClick}>
            Sign Out
        </p>
    );
}

export default SignOutTrigger;