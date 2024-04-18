import { SortBy } from "../home-page/ui";
import { Products, ProductsFilters } from "./ui";

const ProductsPage = () => {
    return (
        <div className="px-10 grow flex flex-col opacity-100 z-0">
            <div className="mt-5 h-[200px] bg-gradient-to-r from-primary-600 to-primary-400 rounded-large flex items-center">
                <h1 className="ml-10 text-background text-[28px] font-bold">
                    Mua bán sản phẩm
                </h1>
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
