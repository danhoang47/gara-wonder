import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export enum SortedOrder {
    ASC = 0,
    DESC
}

export type Column<T = unknown> = {
    key: React.Key,
    name: string,
    onRender: (item: T) => React.ReactNode,
    onRenderLoading?: () => React.ReactNode,
    onRenderHeader?: () => React.ReactNode,
    onHeaderClick?: (name: string) => void,
    isSorted?: boolean,
    sortedOrder?: SortedOrder,
    disabled?: boolean,
    className?: string
}

export type TableProps<T> = {
    items: T[],
    columns: Array<Column<T>>,
    enableLoading?: boolean,
    hasNext?: boolean,
    onNext?: () => void;
    enableCheckAction?: boolean,
    classNames?: Partial<Record<
        "tableWrapper" | "headerWrapper" | 
        "header" | "bodyWrapper" | "row",
    string>>
}

function Table<T>({
    items,
    columns,
    classNames,
    enableCheckAction = false,
}: TableProps<T>) {
    const [cellWidths, setCellWidths] = useState<number[]>([]);
    const tableBodyRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (tableBodyRef.current) {
            const tableRow = tableBodyRef.current.querySelector(".tableRow")
            const tableCells = tableRow?.querySelectorAll("[role='cell']")
            
            if (tableCells) {
                let cWidth: number[] = []

                tableCells.forEach(cell => {
                    const { width } = cell.getBoundingClientRect()
                    cWidth.push(width)
                })

                setCellWidths(cWidth)
            }
        }
    }, [tableBodyRef])

    return (
        <div role="table" className={clsx("", classNames?.tableWrapper)}>
            <div className={clsx("flex", classNames?.headerWrapper)} role="rowheader">
                {columns.map(({ key, name, onRenderHeader }, index) => (
                    <div 
                        key={key} className={clsx("", classNames?.header)} 
                        style={{
                            minWidth: cellWidths[index] && `${cellWidths[index]}px`,
                        }}
                    >
                        {onRenderHeader ? onRenderHeader() : (
                            <p>{name}</p>
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
                    <div className={clsx("tableRow flex items-center", classNames?.row)} role="row" key={index}>
                        {columns.map(column => (
                            <div className={clsx("tableCell", "grow", column?.className)} role="cell" key={column.key}> 
                                {column.onRender(item)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table;