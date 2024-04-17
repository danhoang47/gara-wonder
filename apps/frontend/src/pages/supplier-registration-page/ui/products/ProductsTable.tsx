import { getBrands } from "@/api";
import { getProductTypes } from "@/api/supplier";
import { Product, ProductCategory } from "@/core/types";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import useSWR from "swr";

const tableHeader = [
    {
        label: "Tên",
    },
    {
        label: "Mô tả",
    },
    {
        label: "Hãng",
    },
    {
        label: "Danh mục",
    },
    {
        label: "Loại",
    },
    {
        label: "Dòng xe",
    },
    {
        label: "Năm",
    },
    {
        label: "Giá tiền",
    },
    {
        label: "Số lượng",
    },
];

export type ProductsTableProps = {
    products: Product[];
    onRowSelected: (product: Product | Product[]) => void;
};

const ProductsTable = ({ products, onRowSelected }: ProductsTableProps) => {
    const { data: brands } = useSWR("brands", getBrands);

    const { data: productTypes } = useSWR("productTypes", getProductTypes);

    const showBrand = (brandId: string) => {
        const findBrand = brands?.find((brand) => brand._id === brandId);
        return findBrand?.name;
    };

    const showProductType = (type: number) => {
        const findProductType = productTypes?.data?.find(
            (productType) => productType.code === type,
        );
        return findProductType?.name;
    };

    return (
        <Table
            selectionMode="multiple"
            className="h-[calc(100vh-280px)]"
            onSelectionChange={(keys) => {
                if (typeof keys === "string" && keys === "all") {
                    onRowSelected(products);
                } else {
                    const _ids = Array.from(keys) as string[];
                    onRowSelected(
                        products.filter(({ _id }) =>
                            _ids.toString().includes(_id),
                        ),
                    );
                }
            }}
        >
            <TableHeader>
                {tableHeader.map((item) => (
                    <TableColumn key={item.label}>{item.label}</TableColumn>
                ))}
            </TableHeader>
            {products.length ? (
                <TableBody>
                    {products.map((product: Product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{showBrand(product.brandId)}</TableCell>
                            <TableCell>
                                {product.category === ProductCategory.Exterior
                                    ? "Ngoại thất"
                                    : "Nội thất"}
                            </TableCell>
                            <TableCell>
                                {showProductType(Number(product.type))}
                            </TableCell>
                            <TableCell>{product.series}</TableCell>
                            <TableCell>{product.year}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            ) : (
                <TableBody emptyContent={"Không có sản phẩm"}>{[]}</TableBody>
            )}
        </Table>
    );
};

export default ProductsTable;
