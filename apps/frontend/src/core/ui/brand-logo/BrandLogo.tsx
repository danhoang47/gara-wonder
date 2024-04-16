import { Link } from "@nextui-org/react";
import "./BrandLogo.styles.scss"

function BrandLogo() {
    return (
        <Link href="/garages" className="brandLogo">
            <h3>GaraWonder</h3>
        </Link>
    );
}

export default BrandLogo;
