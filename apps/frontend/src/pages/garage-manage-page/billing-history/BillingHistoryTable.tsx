import { WithUserBill } from "@/api/garages/getBillings";
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
    onOpenModalPress: (bill: WithUserBill) => void;
    bills: WithUserBill[];
    isLoading: boolean;
};

function BillingHistoryTable({
    onOpenModalPress,
    bills,
    isLoading,
}: BillingHistoryTableProps) {
    return (
        <Table removeWrapper selectionMode="none" isStriped classNames={{
            table: "relative",
            thead: "sticky top-0 z-10"
        }} className="h-full overflow-auto">
            <TableHeader className="">
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
            <TableBody isLoading={isLoading}>
                {bills.map((bill, index) => (
                    <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            {moment(new Date()).format("DD/MM/YYYY HH:MM:SS")}
                        </TableCell>
                        <TableCell>
                            <Chip color="primary">
                                <span className="text-white font-medium">
                                    {bill.hasPaid
                                        ? "Đã thanh toán"
                                        : "Chưa thanh toán"}
                                </span>
                            </Chip>
                        </TableCell>
                        <TableCell>
                            {bill?.paidAt
                                ? moment(new Date()).format(
                                      "DD/MM/YYYY HH:MM:SS",
                                  )
                                : "Chưa thanh toán"}
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-2 items-center">
                                {bill?.paidBy ? (
                                    <>
                                        <Avatar src={bill?.paidBy?.photoURL} />
                                        <p>{bill?.paidBy?.displayName}</p>
                                    </>
                                ) : (
                                    <p>Chưa thanh toán</p>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button
                                size="sm"
                                variant="light"
                                isDisabled={bill?.hasPaid}
                                color={bill?.hasPaid ? "default" : "primary"}
                                onPress={() => onOpenModalPress(bill)}
                            >
                                <span className="font-medium">
                                    {bill?.hasPaid
                                        ? "Đã thanh toán"
                                        : "Thanh toán"}
                                </span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default BillingHistoryTable;
