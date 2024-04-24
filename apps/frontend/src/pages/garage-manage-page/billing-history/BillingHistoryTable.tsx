import {
    Avatar,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import clsx from "clsx";
import moment from "moment";

const headerTitles = [
    "Stt",
    "Ngày tạo",
    "Trạng thái",
    "Ngày trả",
    "Trả bởi",
    "Hành động",
];

export type BillingHistoryTableProps = {
    
}

function BillingHistoryTable() {
    return (
        <Table removeWrapper selectionMode="none" isStriped>
            <TableHeader>
                {headerTitles.map((title) => (
                    <TableColumn key={title}>
                        <span
                            className={clsx(
                                title === "Hành động" && "text-transparent",
                            )}
                        >
                            {title}
                        </span>
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                        {moment(new Date()).format("DD/MM/YYYY HH:MM:SS")}
                    </TableCell>
                    <TableCell>
                        <Chip color="primary">
                            <span className="text-white font-medium">
                                Đã thanh toán
                            </span>
                        </Chip>
                    </TableCell>
                    <TableCell>
                        {moment(new Date()).format("DD/MM/YYYY HH:MM:SS")}
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2 items-center">
                            <Avatar />
                            <p>Hoàng Nguyễn Quốc Đạt</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Button size="sm" variant="light">
                            <span className="font-medium">Thanh toán</span>
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default BillingHistoryTable;
