import {
    useAppSelector,
    useLoadingContext,
    useModalContext,
} from "@/core/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SupplierRegistrationContextProvider } from "./contexts";
import { useNavigation } from "./hooks";
import {
    AdditionalServices,
    Address,
    BasicInformation,
    Navigation,
    Products,
} from "./ui";

// eslint-disable-next-line react-refresh/only-export-components
export enum RegistrationSection {
    BasicInformation = 0,
    Address,
    Products,
    Additional,
}

export type GarageFormState = {
    name: string;
    description: string;
    street: string;
    district: string;
    province: string;
};

const GarageRegistrationPage = () => {
    const {
        currentSectionIndex,
        allowContinue,
        onBackButtonClicked,
        onNextButtonClicked,
    } = useNavigation(onRegistrationFinish);
    const { load, unload } = useLoadingContext();

    useEffect(() => {
        load("registrationInitLoad");

        unload("registrationInitLoad");
    }, [load, unload]);

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return <BasicInformation />;
            case RegistrationSection.Address:
                return <Address />;
            case RegistrationSection.Products:
                return <Products />;
            case RegistrationSection.Additional:
                return <AdditionalServices />;
            default:
                throw new Error("Invalid Section");
        }
    };

    async function onRegistrationFinish(supplier: unknown) {
        // API-1: luu thong tin supplier
        // axios.post(/api/supplier, supplier)

        // API-2: luu anh cua product
        // axios.post(/api/supplier/product/photo/upload, )
        // Product: { _id, images: File[] }
        // product: { _id: 1, images: [File, File, File]}
    }

    return (
        <div className="grid grid-cols-10 gap-5 px-10 mt-10 relative z-0">
            {renderPageSection()}
            <Navigation
                currentSectionIndex={currentSectionIndex}
                allowContinue={allowContinue}
                onBack={onBackButtonClicked}
                onNext={onNextButtonClicked}
            />
        </div>
    );
};

export default function GarageRegistrationPageWrapper() {
    const navigate = useNavigate();
    const { open } = useModalContext();
    const user = useAppSelector((state) => state.user.value);

    useEffect(() => {
        if (!user) {
            open("signIn");
            navigate("/");
        }
    }, [navigate, open, user]);

    return (
        <SupplierRegistrationContextProvider>
            <GarageRegistrationPage />
        </SupplierRegistrationContextProvider>
    );
}
