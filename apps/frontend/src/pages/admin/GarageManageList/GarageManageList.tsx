import { getAcceptRequireGarage } from "@/api/admin";
import {
    Button,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fields, sorts, years } from "../constants";
import "./garage.style.scss";

export default function GarageManageList() {
    const [selectedYear, setSelectedYear] = useState([
        new Date().getFullYear(),
    ]);
    const [status, setStatus] = useState([]);
    const [fieldName, setFieldName] = useState(["name"]);
    const [sort, setSort] = useState(["asc"]);
    const {
        isLoading,
        data: tableData,
        mutate: refetch,
    } = useSWR("table", () =>
        getAcceptRequireGarage(
            status[0],
            fieldName[0],
            sort[0],
            selectedYear[0],
        ),
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (tableData) refetch();
    }, [status, fieldName, sort, selectedYear]);
    if (!isLoading)
        return (
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 10 }}>
                    <Select
                        label="Chọn chế độ lọc"
                        selectedKeys={sort}
                        classNames={{ base: "max-w-[10rem]" }}
                        onChange={(e) => {
                            setSort([e.target.value]);
                        }}
                    >
                        {sorts.map((sorting) => (
                            <SelectItem key={sorting.key}>
                                {sorting.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Chọn trường lọc"
                        selectedKeys={fieldName}
                        classNames={{ base: "max-w-[10rem]" }}
                        onChange={(e) => {
                            setFieldName([e.target.value]);
                        }}
                    >
                        {fields.map((field) => (
                            <SelectItem key={field.key}>
                                {field.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Chọn năm"
                        selectedKeys={selectedYear}
                        classNames={{ base: "max-w-[10rem]" }}
                        onChange={(e) => {
                            setSelectedYear([Number(e.target.value)]);
                        }}
                    >
                        {years.map((year) => (
                            <SelectItem key={year.key}>{year.label}</SelectItem>
                        ))}
                    </Select>
                </div>

                <div>
                    <Table
                        isHeaderSticky
                        isStriped
                        aria-label="Example static collection table"
                        classNames={{
                            base: "scroll-table overflow-auto no-scrollbar",
                        }}
                    >
                        <TableHeader>
                            <TableColumn className="font-bold text-md">
                                Tên
                            </TableColumn>
                            <TableColumn className="font-bold text-md">
                                Chủ Garage
                            </TableColumn>
                            <TableColumn className="font-bold text-md">
                                Trạng thái
                            </TableColumn>
                            <TableColumn className="font-bold text-md">
                                Ngày khởi tạo
                            </TableColumn>
                            <TableColumn className="text-center font-bold text-md">
                                Truy cập
                            </TableColumn>
                        </TableHeader>
                        <TableBody
                            items={tableData?.data}
                            className="overflow-auto max-h-[calc(100vh - 9.5rem)]"
                        >
                            {(row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        {/* @ts-expect-error displayName */}
                                        {row.userId?.displayName}
                                    </TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>
                                        {moment(row.createdAt).format(
                                            "DD/MM/YYYY",
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center flex justify-center">
                                        <Button
                                            color="primary"
                                            radius="sm"
                                            className="text-white"
                                            onClick={() => {
                                                navigate(`./${row._id}`);
                                            }}
                                        >
                                            Truy cập
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
}
