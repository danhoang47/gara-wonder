import { ProductCategory } from "@/core/types";
import ButtonFilter from "./ButtonFilter";

const getCategoryName: Record<ProductCategory, string> = {
    [ProductCategory.Exterior]: "Ngoại thất",
    [ProductCategory.Interior]: "Nội thất",
};

export interface IFilterValue {
    label: string;
    value: string | number;
}

export interface IButtonFilter {
    filterName: string;
    filterType: string;
    filterValue: IFilterValue[];
}

const ProductsFilter = () => {
    const buttonFilter: IButtonFilter[] = [
        {
            filterName: "Loại",
            filterType: "category",
            filterValue: [
                {
                    label: "Tất cả",
                    value: "",
                },
                {
                    label: getCategoryName[ProductCategory.Exterior],
                    value: ProductCategory.Exterior,
                },
                {
                    label: getCategoryName[ProductCategory.Interior],
                    value: ProductCategory.Interior,
                },
            ],
        },
        {
            filterName: "Hãng",
            filterType: "brandId",
            filterValue: [
                {
                    label: "Tất cả",
                    value: "",
                },
                {
                    label: "Mercedes",
                    value: "Mercedes",
                },
                {
                    label: "Volvo",
                    value: "Volvo",
                },
                {
                    label: "Tesla",
                    value: "Tesla",
                },
            ],
        },
        // {
        //     filterName: "Series",
        //     filterType: "series",
        //     filterValue: [
        //         {
        //             label: "Tất cả",
        //             value: "",
        //         },
        //         {
        //             label: "A",
        //             value: "A",
        //         },
        //         {
        //             label: "B",
        //             value: "B",
        //         },
        //     ],
        // },
        // {
        //     filterName: "Models",
        //     filterType: "models",
        //     filterValue: [
        //         {
        //             label: "Tất cả",
        //             value: "",
        //         },
        //         {
        //             label: "C200",
        //             value: "C200",
        //         },
        //         {
        //             label: "C300",
        //             value: "C300",
        //         },
        //     ],
        // },
    ];
    return (
        <div className="flex gap-3">
            {buttonFilter.map((btn) => (
                <ButtonFilter btn={btn} />
            ))}
        </div>
    );
};

export default ProductsFilter;
