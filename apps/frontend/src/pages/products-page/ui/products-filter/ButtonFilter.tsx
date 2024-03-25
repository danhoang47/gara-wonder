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
import { IButtonFilter, IFilterValue } from "./ProductsFilter";

interface IButtonProps {
    btn: IButtonFilter;
}

const ButtonFilter = ({ btn }: IButtonProps) => {
    const [filterSearchParams] = useSearchParams();
    const { filterParams, setFilterParams } = useFilterParams();

    const selectedSortByOptionSet = useMemo(
        () =>
            new Set<string>([
                JSON.parse(filterSearchParams.get(btn.filterType) as string) ||
                    "",
            ]),
        [filterSearchParams],
    );

    const selectedSortByOption = useMemo(() => {
        const selectedKey = filterSearchParams.get(btn.filterType);
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
                        ? JSON.parse(
                              filterSearchParams.get(btn.filterType) as string,
                          )
                        : btn.filterName}
                    <FontAwesomeIcon icon={faChevronDown} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedSortByOptionSet}
                onSelectionChange={(item) => {
                    const value = Array.from(item)[0];
                    setFilterParams({
                        ...filterParams,
                        [btn.filterType]: value,
                    });
                }}
            >
                {btn.filterValue.map((item: IFilterValue) => (
                    <DropdownItem key={item.value}>{item.label}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default ButtonFilter;
