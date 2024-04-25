/* eslint-disable */
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilterParams } from "@/pages/products-page/hooks";
import { IButtonFilter } from "./ProductsFilter";

interface IButtonProps<T> {
    filter: IButtonFilter<T>;
    selectKey: (item: T) => string;
    selectLabel: (item: T) => string;
}

function ButtonFilter<T>({ filter, selectKey, selectLabel }: IButtonProps<T>) {
    const [filterSearchParams] = useSearchParams();
    const { filterParams, setFilterParams } = useFilterParams();

    const selectedSortByOptionSet = useMemo(
        () => filterSearchParams.get(filter.filterType),
        [filterSearchParams],
    );

    const selectedSortByOption = useMemo(() => {
        const selectedKey = filterSearchParams.get(filter.filterType);
        if (selectedKey) {
            return selectedKey;
        }
        return undefined;
    }, [filterSearchParams]);

    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <Button className="border font-semibold bg-[#ebebed] rounded-full capitalize ">
                    {selectedSortByOption
                        ? filterSearchParams.get(filter.filterType)
                        : filter.filterName}
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={
                    selectedSortByOptionSet
                        ? [selectedSortByOptionSet]
                        : undefined
                }
                onSelectionChange={(item) => {
                    const value = Array.from(item)[0];
                    setFilterParams({
                        ...filterParams,
                        [filter.filterType]: value,
                    });
                }}
            >
                {filter.filterValue.map((item) => (
                    <DropdownItem key={selectKey(item)}>
                        {selectLabel(item)}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}

export default ButtonFilter;
