import { useInfiniteScroll } from "@/core/hooks";
import ProductsSkeletonCard from "../products-skeleton-card";
import ProductsCard from "../products-card";
import "./Products.styles.scss";
import useProducts from "../../hooks/useProducts";
import { FetchStatus } from "@/core/types";

const Products = () => {
    const { products, fetchingStatus: isLoading } = useProducts();

    const onNext = () => {};
    const ref = useInfiniteScroll(onNext);

    const renderLoadingProducts = () => {
        return (
            <>
                {Array.from(new Array(10)).map((_, index) => (
                    <ProductsSkeletonCard key={index} />
                ))}
            </>
        );
    };

    return (
        <div className="gridViewProductsWrapper">
            <div className="gridViewProducts">
                {products?.map((product) => (
                    <ProductsCard key={product._id} product={product} />
                ))}
                {isLoading === FetchStatus.Fetching && renderLoadingProducts()}
            </div>
            <div ref={ref} className="h-10" />
        </div>
    );
};

export default Products;
