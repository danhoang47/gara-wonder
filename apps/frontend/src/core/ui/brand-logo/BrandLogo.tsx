import { Link } from "@nextui-org/react";
import "./BrandLogo.styles.scss";

function BrandLogo() {
    return (
        <Link href="/garages" className="brandLogo">
            <img alt="Brand Logo" src="/logo.png" className="w-8 h-8" />
            <h3 className="font-bold text-xl brandName">Wonder</h3>
        </Link>
    );
}

export default BrandLogo;
