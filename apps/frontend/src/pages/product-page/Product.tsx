import { useEffect, useState } from "react";
import "./Product.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faTruck } from "@fortawesome/free-solid-svg-icons";
import { CategoryType, Image, Product } from "@/core/types";

function ProductPage() {
    const [imgPreview, setImgPreview] = useState<Image>();
    const [quantity, setQuantity] = useState<number>(1);
    const [product, setProduct] = useState<Product>({
        category: 0,
        name: "Ttest name longlonglong longlonglong longlonglong longlonglong longlonglong longlonglong longlonglong",
        type: CategoryType.Exterior,
        brandId: "Mercedes",
        series: ["1"],
        description: "dasdasd",
        quantity: 10,
        year: 2024,
        price: 5000000,
        _id: "string",
        createdAt: 46456,
        updatedAt: 456456,
        images: [
            {
                width: 300,
                height: 300,
                url: "https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg",
                _id: "string",
                createdAt: 3123123,
                updatedAt: 3123123,
            },
            {
                width: 300,
                height: 300,
                url: "https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Nhat_Minh__2.jpg",
                _id: "string",
                createdAt: 3123123,
                updatedAt: 3123123,
            },
            {
                width: 300,
                height: 300,
                url: "https://lh3.googleusercontent.com/proxy/1BdU6kn2URq2Djf5vEFANWORF1gUb8DtO-PTWVzaG1MfsQdY09wJYpq8pH_Hr2aG4TfUREPv00UXNvfTX6MeXZj7tnLjXStBcTvcVflRMju8_M0b9w1gceCpZ1rt5Pjy8YDkumNxINkXnQqN_irWr3RSiOe4t_sit_tSOLm0EAxfGR8POed8gigqiZY",
                _id: "string",
                createdAt: 3123123,
                updatedAt: 3123123,
            },
            {
                width: 300,
                height: 300,
                url: "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg",
                _id: "string",
                createdAt: 3123123,
                updatedAt: 3123123,
            },

            {
                width: 300,
                height: 300,
                url: "data:image/jpeg;base64,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",
                _id: "string",
                createdAt: 3123123,
                updatedAt: 3123123,
            },
        ],
    });
    useEffect(() => {
        product && setImgPreview(product.images[0]);
    }, [product]);

    const getCategoryProduct = (option: CategoryType) => {
        switch (option) {
            case CategoryType.Exterior:
                return "Ngoại thất";
            case CategoryType.Interior:
                return "Nội thất";
        }
    };

    return (
        <div className="product-wrapper">
            <div className="product-left-element">
                <div className="product-preview">
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        alt="img preview"
                        src={imgPreview?.url}
                    />
                </div>
                <div className="product-img-box">
                    {product?.images?.map((i) => {
                        return (
                            <div
                                key={i._id}
                                onClick={() => setImgPreview(i)}
                                className="product-img-box-item"
                            >
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    src={i.url}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="product-right-element">
                <div className="product-right-element-box-content">
                    <div className="product-category">
                        {getCategoryProduct(product?.category)}
                    </div>
                    <div className="title-product">{product?.name}</div>
                    <div className="description-product">{product?.type}</div>
                </div>
                <div className="product-right-element-box-content">
                    <div className="title-product-price">
                        {product?.price} VNĐ
                    </div>
                    <div className="description-product">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </div>
                </div>
                <div className="product-right-element-box-content">
                    <div className="title-product-chooseColor">Chose color</div>
                    <div className="chooseColor-product-box">
                        <div className="chooseColor-item"></div>
                        <div className="chooseColor-item"></div>
                        <div className="chooseColor-item"></div>
                        <div className="chooseColor-item"></div>
                        <div className="chooseColor-item"></div>
                    </div>
                </div>
                <div className="action-box">
                    <div className="quantity-box">
                        <div className="quantity-box-left">
                            <button
                                disabled={quantity === 1}
                                onClick={() => setQuantity(quantity - 1)}
                                className="button-down"
                            >
                                -
                            </button>
                            <div className="quantity-total">{quantity}</div>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="button-up"
                            >
                                +
                            </button>
                        </div>
                        {/* <div className="quantity-box-right">
                            <div>
                                Only 1 items Left !
                            </div>
                            <div>Don't miss it</div>
                        </div> */}
                    </div>
                    <div className="action-box-box">
                        <button className="button-buy">Buy now</button>
                        <button className="button-add">Add to cart</button>
                    </div>
                    <div className="description-box">
                        <div className="description-box-item">
                            <div className="box">
                                <FontAwesomeIcon
                                    icon={faTruck}
                                    className="icon"
                                />
                                <div className="content">Free Delivery</div>
                            </div>
                            <span className="des-box">
                                Enter your postal code for Delivery Availability
                            </span>
                        </div>
                        <div className="description-box-item">
                            <div className="box">
                                <FontAwesomeIcon
                                    icon={faInbox}
                                    className="icon"
                                />
                                <div className="content">Return Delivery</div>
                            </div>
                            <span className="des-box">
                                Free 30days Delivery. Details
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
