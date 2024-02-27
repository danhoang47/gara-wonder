import { Link } from "@nextui-org/react";

import { useAppSelector, useModalContext } from "@/core/hooks";

function BecomeGaraOwnerLink() {
    const user = useAppSelector(state => state.user.value)
    const { open } = useModalContext();

    return (
        <Link 
            href="/garage-registration" 
            color="foreground" 
            underline="hover" 
            onClick={(e) => {
                if (!user) {
                    open("signIn")
                    e.preventDefault()
                    return;
                }
            }}
        >
            <p className="font-medium">Become Garage Owner</p>
        </Link>
    );
}

export default BecomeGaraOwnerLink;
