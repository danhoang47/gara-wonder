import React, { useEffect } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tab,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { getAcceptRequireGarage } from "@/api/admin";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const months = [
    {
        key: 1,
        label: "Tháng 1",
    },
    {
        key: 2,
        label: "Tháng 2",
    },
    {
        key: 3,
        label: "Tháng 3",
    },
    {
        key: 4,
        label: "Tháng 4",
    },
    {
        key: 5,
        label: "Tháng 5",
    },
    {
        key: 6,
        label: "Tháng 6",
    },
    {
        key: 7,
        label: "Tháng 7",
    },
    {
        key: 8,
        label: "Tháng 8",
    },
    {
        key: 9,
        label: "Tháng 9",
    },
    {
        key: 10,
        label: "Tháng 10",
    },
    {
        key: 11,
        label: "Tháng 11",
    },
    {
        key: 12,
        label: "Tháng 12",
    },
];

const years = [
    {
        key: 2024,
        label: 2024,
    },
    {
        key: 2023,
        label: 2023,
    },
    {
        key: 2022,
        label: 2022,
    },
    {
        key: 2021,
        label: 2021,
    },
    {
        key: 2020,
        label: 2020,
    },
    {
        key: 2019,
        label: 2019,
    },
    {
        key: 2018,
        label: 2018,
    },
];
export default function GarageManageList() {
    const {
        isLoading,
        data: tableData,
        mutate: refetch,
    } = useSWR("table", () => getAcceptRequireGarage());
    const navigate = useNavigate();
    if (!isLoading)
        return (
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 10 }}>
                    <Dropdown classNames={{ content: "min-w-[10rem]" }}>
                        <DropdownTrigger>
                            <Button variant="bordered">
                                Tháng 10{" "}
                                <FontAwesomeIcon icon={faChevronDown} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic Actions"
                            items={months}
                        >
                            {(months) => (
                                <DropdownItem key={months.key}>
                                    {months.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown classNames={{ content: "min-w-[5rem]" }}>
                        <DropdownTrigger>
                            <Button variant="bordered">
                                Năm 2024{" "}
                                <FontAwesomeIcon icon={faChevronDown} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic Actions"
                            items={years}
                        >
                            {(years) => (
                                <DropdownItem key={years.key}>
                                    {years.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div>
                    <Table
                        isHeaderSticky
                        isStriped
                        aria-label="Example static collection table"
                        classNames={{
                            base: "max-h-[35rem] overflow-auto no-scrollbar",
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
                            className="overflow-auto h-[40rem]"
                        >
                            {(row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
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
                                            color="success"
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
