import { auth } from "@/components/firebase";
import { useAppDispatch, useLoadingContext } from "@/core/hooks";
import { signOut } from "../user.slice";
import { useNavigate } from "react-router-dom";

function SignOutTrigger() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { load, unload } = useLoadingContext();

    const onSignOutButtonClick = () => {
        load("signOut");
        auth.signOut().finally(() => {
            dispatch(signOut());
            navigate("/");
            unload("signOut");
        });
    };

    return <p onClick={onSignOutButtonClick}>Thoát</p>;
}

export default SignOutTrigger;
