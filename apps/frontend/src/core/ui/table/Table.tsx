import { Checkbox } from "@nextui-org/react";
import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

enum SortedOrder {
    ASC = 0,
    DESC,
}

export type Column<T = unknown> = {
    key: React.Key;
    name: string;
    onRender: (item: T) => React.ReactNode;
    onRenderLoading?: () => React.ReactNode;
    onRenderHeader?: () => React.ReactNode;
    onHeaderClick?: (name: string) => void;
    isSorted?: boolean;
    sortedOrder?: SortedOrder;
    disabled?: boolean;
    className?: string;
};

export type TableProps<T> = {
    items: T[];
    columns: Array<Column<T>>;
    enableLoading?: boolean;
    hasNext?: boolean;
    onNext?: () => void;
    enableCheckAction?: boolean;
    classNames?: Partial<
        Record<
            | "tableWrapper"
            | "headerWrapper"
            | "header"
            | "headerTitle"
            | "bodyWrapper"
            | "row",
            string
        >
    >;
    onCheckAll?: () => void;
    onCheck?: (item: T, checked: boolean) => void;
};

function Table<T>({
    items,
    columns,
    classNames,
    enableCheckAction = false,
    onCheck,
}: TableProps<T>) {
    const [cellWidths, setCellWidths] = useState<number[]>([]);
    const tableBodyRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!tableBodyRef.current) return;

        const { current } = tableBodyRef;

        const calculateCellWidth = () => {
            const tableRow = current?.querySelector(".tableRow");
            const tableCells = tableRow?.querySelectorAll("[role='cell']");

            if (tableCells) {
                const cWidth: number[] = [];

                tableCells.forEach((cell) => {
                    const { width } = cell.getBoundingClientRect();
                    cWidth.push(width);
                });

                setCellWidths(cWidth);
            }
        };

        const resizeObserver = new ResizeObserver(calculateCellWidth);
        resizeObserver.observe(current);

        return () => resizeObserver.unobserve(current);
    }, [tableBodyRef]);

    return (
        <div role="table" className={clsx("", classNames?.tableWrapper)}>
            <div
                className={clsx("flex", classNames?.headerWrapper)}
                role="rowheader"
            >
                {enableCheckAction && (
                    <div key="checkBox" className="flex items-center w-10">
                        <Checkbox size="sm" radius="sm" />
                    </div>
                )}
                {columns.map(({ key, name, onRenderHeader }, index) => (
                    <div
                        key={key}
                        className={clsx("", classNames?.header)}
                        style={{
                            width:
                                cellWidths[index] && `${cellWidths[index]}px`,
                        }}
                    >
                        {onRenderHeader ? (
                            onRenderHeader()
                        ) : (
                            <p
                                className={clsx(
                                    "overflow-x-hidden text-ellipsis whitespace-nowrap",
                                    classNames?.headerTitle,
                                )}
                            >
                                {name}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <div
                role="rowgroup"
                ref={tableBodyRef}
                className={clsx("flex flex-col", classNames?.bodyWrapper)}
            >
                {items.map((item, index) => (
                    <div
                        className={clsx(
                            "tableRow flex items-center",
                            classNames?.row,
                        )}
                        role="row"
                        key={index}
                    >
                        {enableCheckAction && (
                            <div
                                key="checkBox"
                                className="flex items-center w-10 pl-4"
                            >
                                <Checkbox
                                    size="sm"
                                    radius="sm"
                                    onValueChange={(isSelected) => {
                                        onCheck && onCheck(item, isSelected);
                                    }}
                                />
                            </div>
                        )}
                        {columns.map((column) => (
                            <div
                                className={clsx(
                                    "tableCell",
                                    "grow",
                                    column?.className,
                                )}
                                role="cell"
                                key={column.key}
                            >
                                {column.onRender(item)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Table;
