import { auth } from "@/components/firebase";
import { useAppDispatch, useLoadingContext } from "@/core/hooks";
import { signOut } from "../../user.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { notificationReset } from "@/features/notifications/notifications.slice";
import { notificationReset as garageNotificationReset } from "@/features/notifications/garage-notifications.slice";
import { roomReset } from "@/features/chat/rooms.slice";
import { orderReset } from "@/features/cart/cart.slice";
import { reloadGarages } from "@/features/garages";

export type SignOutTriggerProps = {
    text?: React.ReactNode;
    className?: string;
};

const keepHistoryReg = /^\/garages\?*([\w]+=.+)*|^\/garages(\/[\w]+)/

function SignOutTrigger({
    className = "",
    text = "Đăng xuất",
}: SignOutTriggerProps) {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { load, unload } = useLoadingContext();
    
    const onSignOutButtonClick = () => {
        load("signOut");
        auth.signOut()
            .then(() => {
                if (!keepHistoryReg.test(location.pathname)) {
                    navigate("/")
                }
            })
            .finally(() => {
                dispatch(signOut());
                dispatch(notificationReset());
                dispatch(roomReset());
                dispatch(orderReset());
                dispatch(garageNotificationReset());
                dispatch(reloadGarages());
                unload("signOut");
            });
    };

    return (
        <p className={className} onClick={onSignOutButtonClick}>
            {text}
        </p>
    );
}

export default SignOutTrigger;
