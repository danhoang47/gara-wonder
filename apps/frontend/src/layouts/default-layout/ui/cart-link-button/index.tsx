import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Tooltip } from "@nextui-org/react";

function CartLinkButton() {
    return (
        <Tooltip content="Giỏ Hàng">
            <Link
                href="/cart"
                className="bg-white w-10 h-10 flex justify-center items-center"
            >
                <FontAwesomeIcon icon={faShoppingCart} color="#000"/>
            </Link>
        </Tooltip>
    );
}

export default CartLinkButton;
