import {
    useAppDispatch,
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
import { createSupplier } from "@/api/supplier";
import { notify } from "@/features/toasts/toasts.slice";
import { SupplierRegistration } from "@/core/types";

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
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.value);
    const token = useAppSelector((state) => state.user.token);

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

    async function onRegistrationFinish(supplier: SupplierRegistration) {
        load("registrationSaveLoad");

        // uploadGarageImages(garage.backgroundImage, garage.images);
        supplier.userId = user?._id;
        try {
            const result = await createSupplier(supplier, token!);

            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: "Register Supplier",
                        description: "Successfully register your supplier",
                    }),
                );
                // dispatch(setRoleToGarageOwner())
                // navigate(`/garages/${result.data._id}/management`);
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Register Supplier",
                    description: "Some error occured, please try again later",
                }),
            );
        } finally {
            unload("registrationSaveLoad");
        }
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
