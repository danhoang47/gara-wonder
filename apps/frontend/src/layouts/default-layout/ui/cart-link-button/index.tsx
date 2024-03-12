import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";

function CartLinkButton() {
    return (
        <Tooltip content="Giỏ Hàng">
            <Button
                href="/cart"
                as="a"
                isIconOnly
                radius="full"
                className="bg-white"
            >
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Button>
        </Tooltip>
    );
}

export default CartLinkButton;
