import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const GarageList: React.FunctionComponent = () => {
    const months = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        }
    ];

    const years = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        }
    ];
    return (
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 10 }}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Tháng 10 <FontAwesomeIcon icon={faChevronDown} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={months}>
                        {(months) => (
                            <DropdownItem
                                key={months.key}
                                color={months.key === "delete" ? "danger" : "default"}
                                className={months.key === "delete" ? "text-danger" : ""}
                            >
                                {months.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Năm 2024 <FontAwesomeIcon icon={faChevronDown} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={years}>
                        {(years) => (
                            <DropdownItem
                                key={years.key}
                                color={years.key === "delete" ? "danger" : "default"}
                                className={years.key === "delete" ? "text-danger" : ""}
                            >
                                {years.label}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Tên</TableColumn>
                        <TableColumn>Chủ Garage</TableColumn>
                        <TableColumn>Trạng thái</TableColumn>
                        <TableColumn>Ngày khởi tạo</TableColumn>
                        <TableColumn>Truy cập</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>12/4/2024</TableCell>
                            <TableCell>6,210,000 VND</TableCell>
                            <TableCell>Đã thanh toán</TableCell>
                            <TableCell>02/04/2024</TableCell>
                            <TableCell>XXXXXXXXX-9800</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default GarageList;
