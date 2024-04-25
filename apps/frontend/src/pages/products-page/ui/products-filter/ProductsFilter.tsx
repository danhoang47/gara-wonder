import { ProductCategory } from "@/core/types";
import ButtonFilter from "./ButtonFilter";
import useSWRImmutable from "swr/immutable";
import { getBrands } from "@/api";

const getCategoryName: Record<ProductCategory, string> = {
    [ProductCategory.Exterior]: "Ngoại thất",
    [ProductCategory.Interior]: "Nội thất",
};

export interface IFilterValue {
    label: string;
    value: string | number;
}

export interface IButtonFilter<T> {
    filterName: string;
    filterType: string;
    filterValue: T[];
}

const ProductsFilter = () => {
    const { data: brands } = useSWRImmutable("brands", getBrands)

    return (
        <div className="flex gap-3">
            <ButtonFilter 
                filter={{
                    filterName: "Hãng xe",
                    filterType: "brandId",
                    filterValue: brands || []
                }}
                selectKey={(item) => item._id}
                selectLabel={(item) => item.name}
            />
        </div>
    );
};

export default ProductsFilter;
