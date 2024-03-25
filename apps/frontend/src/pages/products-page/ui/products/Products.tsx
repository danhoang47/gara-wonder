import { useInfiniteScroll } from "@/core/hooks";
import ProductsSkeletonCard from "../products-skeleton-card";
import ProductsCard from "../products-card";
import { Product } from "@/core/types/model/product";

import "./Products.styles.scss";

const Products = () => {
    const isReload = false;
    const isLoading = false;

    const products: Product[] = [
        {
            category: 0,
            name: "Tên dài vãi lozzzzzzzzzzz asdjalksjdlksad lksa jdlks a a a a aa",
            type: "type",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
        {
            category: 0,
            type: "type",
            name: "gương",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
        {
            category: 0,
            type: "type",
            name: "guong",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
        {
            category: 0,
            name: "tên dài vãi lozzzzzzzzzzz asdjalksjdlksad lksa jdlks a a a a aa",
            type: "type",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://cdn.vn.alongwalk.info/wp-content/uploads/2023/04/02030503/image-101-hinh-anh-ha-long-nen-tho-huu-tinh-khien-ban-phai-ngat-ngay-168035430373418.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
        {
            category: 0,
            name: "tên dài vãi lozzzzzzzzzzz asdjalksjdlksad lksa jdlks a a a a aa",
            type: "type",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://cdn.vn.alongwalk.info/wp-content/uploads/2023/04/02030503/image-101-hinh-anh-ha-long-nen-tho-huu-tinh-khien-ban-phai-ngat-ngay-168035430373418.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
        {
            category: 0,
            name: "tên dài vãi lozzzzzzzzzzz asdjalksjdlksad lksa jdlks a a a a aa",
            type: "type",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://cdn.vn.alongwalk.info/wp-content/uploads/2023/04/02030503/image-101-hinh-anh-ha-long-nen-tho-huu-tinh-khien-ban-phai-ngat-ngay-168035430373418.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
                {
                    width: 300,
                    height: 300,
                    url: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/anh-phat-dep-lam-hinh-nen-62.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
        {
            category: 0,
            name: "tên dài vãi lozzzzzzzzzzz asdjalksjdlksad lksa jdlks a a a a aa",
            type: "type",
            brandId: "Mercedes",
            series: ["1"],
            models: ["1"],
            year: 2024,
            price: 5000000,
            _id: "string",
            createdAt: 46456,
            updatedAt: 456456,
            images: [
                {
                    width: 300,
                    height: 300,
                    url: "https://cdn.vn.alongwalk.info/wp-content/uploads/2023/04/02030503/image-101-hinh-anh-ha-long-nen-tho-huu-tinh-khien-ban-phai-ngat-ngay-168035430373418.jpg",
                    _id: "string",
                    createdAt: 3123123,
                    updatedAt: 3123123,
                },
            ],
            remain: 100,
        },
    ];
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
                {isReload && renderLoadingProducts()}
                {products?.map((product) => (
                    <ProductsCard key={product._id} product={product} />
                ))}
                {isLoading && renderLoadingProducts()}
            </div>
            <div ref={ref} className="h-10" />
        </div>
    );
};

export default Products;
