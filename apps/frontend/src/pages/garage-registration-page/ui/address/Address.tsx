import { useEffect, useState } from "react";
import { SelectItem, Select, Input } from "@nextui-org/react";
import RegistrationSection from "../registration-section";
import { useGarageRegistrationContext } from "../../hooks";
import { District, Province, Ward } from "@/core/types";

export const enum ApiStatus {
    None,
    Fetching,
    Resolved,
    Rejected,
}

const baseUrl = "https://vapi.vnappmob.com/api/province";

function Address() {
    const {
        garageRegistrationState,
        garageRegistrationErrors,
        setGarageRegistrationStateValue,
    } = useGarageRegistrationContext();
    const { province, district, ward, streetAddress } = garageRegistrationState;
    const [hasFieldTouched, setFieldTouched] = useState({
        province: false,
        district: false,
        ward: false,
        streetAddress: false,
    });
    const [districts, setDistricts] = useState<Array<District>>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    useEffect(() => {
        setGarageRegistrationStateValue("province", province);
        setGarageRegistrationStateValue("district", district);
        setGarageRegistrationStateValue("ward", ward);
        setGarageRegistrationStateValue("streetAddress", streetAddress);
    }, []);

    useEffect(() => {
        const getProvinces = async () => {
            const results = (await fetch(baseUrl)
                .then((res) => res.json())
                .then((data) => data.results)) as Province[];

            setProvinces(results);
        };

        getProvinces();
    }, []);

    useEffect(() => {
        const getDistricts = async () => {
            if (!province) return;

            const results = (await fetch(
                `${baseUrl}/district/${province.province_id}`,
            )
                .then((res) => res.json())
                .then((data) => data.results)) as District[];

            setDistricts(results);
        };

        getDistricts();
    }, [province]);

    useEffect(() => {
        const getWards = async () => {
            if (!district) return;

            const results = (await fetch(
                `${baseUrl}/ward/${district.district_id}`,
            )
                .then((res) => res.json())
                .then((data) => data.results)) as Ward[];

            setWards(results);
        };

        getWards();
    }, [district]);

    const getShowErrorProps = (
        key: "province" | "district" | "ward" | "streetAddress",
    ) => ({
        onBlur: () =>
            setFieldTouched((prev) => ({
                ...prev,
                [key]: true,
            })),
        isInvalid:
            hasFieldTouched[key] && Boolean(garageRegistrationErrors[key]),
        errorMessage: hasFieldTouched[key] && garageRegistrationErrors[key],
    });

    return (
        <RegistrationSection
            header={"Address"}
            description={
                "Pointing our the cursor on the map to locale your address"
            }
        >
            <div className="flex flex-wrap gap-3">
                <Select
                    items={provinces}
                    variant="bordered"
                    placeholder="Select province"
                    label="Province"
                    isRequired
                    isMultiline={false}
                    {...getShowErrorProps("province")}
                    isLoading={Boolean(!provinces)}
                    selectedKeys={
                        province?.province_id ? [province.province_id] : []
                    }
                    disableAnimation
                    onSelectionChange={(keys) => {
                        if (keys !== "all") {
                            const selectedKey = Array.from(keys)[0];

                            setGarageRegistrationStateValue(
                                "province",
                                provinces.find(
                                    ({ province_id }) =>
                                        province_id === selectedKey,
                                ),
                            );
                        }
                    }}
                >
                    {(province) => (
                        <SelectItem key={province.province_id}>
                            {province.province_name}
                        </SelectItem>
                    )}
                </Select>
                <Select
                    items={districts}
                    variant="bordered"
                    placeholder="Select district"
                    label="Province"
                    isRequired
                    isMultiline={false}
                    isLoading={Boolean(!districts)}
                    {...getShowErrorProps("district")}
                    disableAnimation
                    selectedKeys={
                        district?.district_id ? [district.district_id] : []
                    }
                    onSelectionChange={(keys) => {
                        if (keys !== "all") {
                            const selectedKey = Array.from(keys)[0];

                            setGarageRegistrationStateValue(
                                "district",
                                districts.find(
                                    ({ district_id }) =>
                                        district_id === selectedKey,
                                ),
                            );
                        }
                    }}
                >
                    {(district) => (
                        <SelectItem key={district.district_id}>
                            {district.district_name}
                        </SelectItem>
                    )}
                </Select>
                <Select
                    items={wards}
                    variant="bordered"
                    placeholder="Select ward"
                    label="Ward"
                    isRequired
                    isMultiline={false}
                    isLoading={Boolean(!wards)}
                    disableAnimation
                    {...getShowErrorProps("ward")}
                    selectedKeys={ward?.ward_id ? [ward.ward_id] : []}
                    onSelectionChange={(keys) => {
                        if (keys !== "all") {
                            const selectedKey = Array.from(keys)[0];

                            setGarageRegistrationStateValue(
                                "ward",
                                wards.find(
                                    ({ ward_id }) => ward_id === selectedKey,
                                ),
                            );
                        }
                    }}
                >
                    {(ward) => (
                        <SelectItem key={ward.ward_id}>
                            {ward.ward_name}
                        </SelectItem>
                    )}
                </Select>
                <Input
                    variant="bordered"
                    placeholder="Enter your street"
                    label="Street"
                    isRequired
                    {...getShowErrorProps("streetAddress")}
                    onValueChange={(v) =>
                        setGarageRegistrationStateValue("streetAddress", v)
                    }
                    value={streetAddress}
                />
            </div>
        </RegistrationSection>
    );
}

export default Address;
