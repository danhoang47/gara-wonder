import { auth } from "@/components/firebase";
import { useAppDispatch, useLoadingContext } from "@/core/hooks";
import { signOut } from "../../user.slice";
import { useNavigate } from "react-router-dom";
import { notificationReset } from "@/features/notifications/notifications.slice";
import { notificationReset as garageNotificationReset } from "@/features/notifications/garage-notifications.slice";
import { roomReset } from "@/features/chat/rooms.slice";
import { orderReset } from "@/features/cart/cart.slice";

function SignOutTrigger() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { load, unload } = useLoadingContext();

    const onSignOutButtonClick = () => {
        load("signOut");
        auth.signOut().finally(() => {
            dispatch(signOut());
            dispatch(notificationReset());
            dispatch(roomReset());
            dispatch(orderReset());
            dispatch(garageNotificationReset());
            navigate("/");
            unload("signOut");
        });
    };

    return <p onClick={onSignOutButtonClick}>Thoát</p>;
}

export default SignOutTrigger;
