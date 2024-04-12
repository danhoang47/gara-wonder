import { useNavigation } from "./hooks";
import {
    AdditionalServices,
    Address,
    BasicInformation,
    Images,
    Navigation,
    Services,
    Slot,
} from "./ui";
import {
    GarageRegistration,
    GarageRegistrationContextProvider,
} from "./contexts";
import { useNavigate } from "react-router-dom";
import {
    useAppDispatch,
    useAppSelector,
    useLoadingContext,
    useModalContext,
} from "@/core/hooks";
import { useEffect, useMemo } from "react";
import { createGarage, initGarage, uploadGarageImages } from "@/api";
import { notify } from "@/features/toasts/toasts.slice";
import { FetchStatus, Role } from "@/core/types";
import { setRoleToGarageOwner } from "@/features/user/user.slice";

// eslint-disable-next-line react-refresh/only-export-components
export enum RegistrationSection {
    BasicInformation = 0,
    Address,
    Services,
    Slot,
    Images,
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
    const user = useAppSelector((state) => state.user.value);
    const status = useAppSelector((state) => state.user.status);
    const navigate = useNavigate();
    const { load, unload } = useLoadingContext();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === FetchStatus.Fulfilled) {
            load("registrationInitLoad");

            initGarage().then(() => {
                unload("registrationInitLoad");
            });
        }
    }, [load, unload, status]);

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return <BasicInformation />;
            case RegistrationSection.Address:
                return <Address />;
            case RegistrationSection.Services:
                return <Services />;
            case RegistrationSection.Slot:
                return <Slot />;
            case RegistrationSection.Images:
                return <Images />;
            case RegistrationSection.Additional:
                return <AdditionalServices />;
            default:
                throw new Error("Invalid Section");
        }
    };

    async function onRegistrationFinish(garage: GarageRegistration) {
        load("registrationSaveLoad");

        garage.userId = user?._id;

        uploadGarageImages(garage.backgroundImage, garage.images);
        try {
            const result = await createGarage(garage);

            if (result.statusCode === 200) {
                dispatch(
                    notify({
                        type: "success",
                        title: "Register Garage",
                        description: "Successfully register your garage",
                    }),
                );
                dispatch(setRoleToGarageOwner())
                navigate(`/garages/${result.data._id}/management`);
            }
        } catch (error) {
            dispatch(
                notify({
                    type: "failure",
                    title: "Register Garage",
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
    const status = useAppSelector((state) => state.user.status);
    const shouldRenderGarageRegistration = useMemo(() => {
        if (!user) return false;
        
        return user.role !== Role.GarageOwner && user.role !== Role.Staff
    }, [user])

    useEffect(() => {
        if (status === FetchStatus.Fetching || status === FetchStatus.None)
            return;

        if (
            !user ||
            user.role === Role.GarageOwner ||
            user.role === Role.Staff
        ) {
            navigate("/");
        }

        if (!user) {
            open("signIn");
        }
    }, [navigate, open, user, status]);

    return (
        <GarageRegistrationContextProvider>
            {shouldRenderGarageRegistration && <GarageRegistrationPage />}
        </GarageRegistrationContextProvider>
    );
}
