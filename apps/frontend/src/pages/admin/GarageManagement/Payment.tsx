import React from "react";
import {
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const Payment: React.FC = () => {
    return (
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "10px" }}>
                <div
                    style={{
                        width: "240px",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>12/4/2024 - 14/4/2024</p>{" "}
                    <FontAwesomeIcon icon={faCalendarDays} />
                </div>

                <div
                    style={{
                        width: "180px",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>Trạng thái: Đã huỷ</p>
                </div>

                <div
                    style={{
                        width: "100px",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                    }}
                >
                    <p>Mới nhất</p>
                </div>
            </div>

            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Ngày khởi tạo</TableColumn>
                        <TableColumn>Phí dịch vụ</TableColumn>
                        <TableColumn>Trạng thái</TableColumn>
                        <TableColumn>Cập nhật lần cuối</TableColumn>
                        <TableColumn>Tài khoản thanh toán</TableColumn>
                        <TableColumn>Thanh toán bởi</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>12/4/2024</TableCell>
                            <TableCell>6,210,000 VND</TableCell>
                            <TableCell>Đã thanh toán</TableCell>
                            <TableCell>02/04/2024</TableCell>
                            <TableCell>XXXXXXXXX-9800</TableCell>
                            <TableCell
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />{" "}
                                Duck
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Payment;
