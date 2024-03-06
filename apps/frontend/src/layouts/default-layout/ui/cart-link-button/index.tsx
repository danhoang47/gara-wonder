import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Tooltip } from "@nextui-org/react";

function CartLinkButton() {
    return (
        <Tooltip content="Giỏ Hàng">
            <Link href="/cart" className="text-foreground">
                <FontAwesomeIcon icon={faShoppingBag} size="lg" />
            </Link>
        </Tooltip>
    );
}

export default CartLinkButton;
