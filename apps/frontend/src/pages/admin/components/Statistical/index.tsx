import React, { useContext, useEffect, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import "./statistical.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCashRegister,
    faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import { getCommonStatic } from "@/api/admin";
import { LoadingContext } from "@/core/contexts/loading";
import { StaticSection } from "@/api/admin/getCommonStatic";
import { formatCurrency } from "@/utils";

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

const Statistical: React.FC = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const { load, unload } = useContext(LoadingContext);
    const {
        isLoading,
        data: staticData,
        mutate: refetch,
    } = useSWR("static", () => getCommonStatic(month, year));

    useEffect(() => {
        if (isLoading) load("admin/dashboard");
        else unload("admin/dashboard");
    }, [isLoading]);
    useEffect(() => {
        refetch();
    }, [month, year]);

    if (staticData)
        return (
            <div className="statis">
                <h2 className="statis_h2 text-3xl font-semibold">
                    Thông số thống kê
                </h2>
                <div className="statis_dropdown">
                    <Dropdown
                        classNames={{ content: "min-w-[10rem]" }}
                        className="w-10"
                    >
                        <DropdownTrigger>
                            <Button variant="bordered">
                                Tháng {month}
                                <FontAwesomeIcon icon={faChevronDown} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu items={months} classNames={{}}>
                            {(months) => (
                                <DropdownItem
                                    key={months.key}
                                    onClick={() => {
                                        setMonth(months.key);
                                    }}
                                >
                                    {months.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown classNames={{ content: "min-w-[10rem]" }}>
                        <DropdownTrigger>
                            <Button variant="bordered">
                                Năm {year}
                                <FontAwesomeIcon icon={faChevronDown} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic Actions"
                            items={years}
                        >
                            {(years) => (
                                <DropdownItem
                                    key={years.key}
                                    onClick={() => {
                                        setYear(years.key);
                                    }}
                                >
                                    {years.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className="statis_track">
                    {Object.keys(staticData?.data).map(
                        (section: string, index) => {
                            // @ts-expect-error string to enum error
                            const sectionTitle = StaticSection[section];
                            return (
                                <div
                                    className="statis_track_box border-1 bg-default-50 p-5"
                                    key={index}
                                >
                                    <div className="statis_child">
                                        <div className="flex justify-between items-center">
                                            <p className="statis_child_p text-sm font-medium">
                                                {sectionTitle}
                                            </p>
                                            <FontAwesomeIcon
                                                icon={faCashRegister}
                                                size="lg"
                                            />
                                        </div>
                                        <h2 className="font-semibold text-md">
                                            {sectionTitle ===
                                                StaticSection.incomeThisMonth ||
                                            sectionTitle ===
                                                StaticSection.unchargedThisMonth
                                                ? formatCurrency(
                                                      staticData.data[section]
                                                          .total,
                                                  )
                                                : staticData.data[section]
                                                      .total}
                                        </h2>
                                    </div>

                                    <p className="statis_child_p text-sm font-medium">
                                        <span className="text-green-300">
                                            +{" "}
                                            {String(
                                                staticData.data[section].diff,
                                            ).substring(0, 6)}
                                            %
                                        </span>{" "}
                                        so với tháng trước
                                    </p>
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        );
};

export default Statistical;
