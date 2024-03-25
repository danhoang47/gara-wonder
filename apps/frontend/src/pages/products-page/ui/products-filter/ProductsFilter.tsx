import { Category } from "@/core/types/model/product";
import ButtonFilter from "./ButtonFilter";

const getCategoryName: Record<Category, string> = {
    [Category.Exterior]: "Ngoại thất",
    [Category.Interior]: "Nội thất",
};

export interface IFilterValue {
    label: string;
    value: string;
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
            filterType: "type",
            filterValue: [
                {
                    label: "Tất cả",
                    value: "",
                },
                {
                    label: getCategoryName[Category.Exterior],
                    value: getCategoryName[Category.Exterior],
                },
                {
                    label: getCategoryName[Category.Interior],
                    value: getCategoryName[Category.Interior],
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
        {
            filterName: "Series",
            filterType: "series",
            filterValue: [
                {
                    label: "Tất cả",
                    value: "",
                },
                {
                    label: "A",
                    value: "A",
                },
                {
                    label: "B",
                    value: "B",
                },
            ],
        },
        {
            filterName: "Models",
            filterType: "models",
            filterValue: [
                {
                    label: "Tất cả",
                    value: "",
                },
                {
                    label: "C200",
                    value: "C200",
                },
                {
                    label: "C300",
                    value: "C300",
                },
            ],
        },
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
