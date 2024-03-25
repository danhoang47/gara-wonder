import { SortBy } from "../home-page/ui";
import { Products, ProductsFilters } from "./ui";

const ProductsPage = () => {
    return (
        <div className="px-10 grow flex flex-col opacity-100 z-0">
            <div className="mt-5 h-[200px] ">
                <img
                    src="/banner.jpg"
                    alt=""
                    className="h-full w-full object-cover rounded-xl"
                />
            </div>

            <div className="flex items-center justify-between h-20 my-3">
                <div className="">
                    <ProductsFilters />
                </div>
                <div className="basis-1/12 flex justify-end">
                    <SortBy />
                </div>
            </div>

            <div>
                <div className="mb-4">
                    <h2 className="font-semibold text-2xl">Sản phẩm</h2>
                </div>
                <Products />
            </div>
        </div>
    );
};

export default ProductsPage;
