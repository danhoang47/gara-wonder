import { useNavigation } from "./hooks";
import {
    AdditionalServices,
    Address,
    BasicInformation,
    Images,
    Navigation,
    Services,
} from "./ui";
import { GarageRegistration, GarageRegistrationContextProvider } from "./contexts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useLoadingContext, useModalContext } from "@/core/hooks";
import { useEffect } from "react";
import { createGarage, initGarage, uploadGarageImages } from "@/api";
import { notify } from "@/features/toasts/toasts.slice";

// eslint-disable-next-line react-refresh/only-export-components
export const enum RegistrationSection {
    BasicInformation = 0,
    Address,
    Services,
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
    const navigate = useNavigate()
    const { load, unload } = useLoadingContext();
    const dispatch = useAppDispatch()

    useEffect(() => {
        load()

        initGarage().then(() => {
            unload()
        })
    }, [load, unload])

    const renderPageSection = () => {
        switch (currentSectionIndex) {
            case RegistrationSection.BasicInformation:
                return <BasicInformation />;
            case RegistrationSection.Address:
                return <Address />;
            case RegistrationSection.Services:
                return <Services />;
            case RegistrationSection.Images:
                return <Images />;
            case RegistrationSection.Additional:
                return <AdditionalServices />;
            default:
                throw new Error("Invalid Section");
        }
    };

    async function onRegistrationFinish(garage: GarageRegistration) {
        load()

        garage.userId = user?._id

        uploadGarageImages(garage.backgroundImage, garage.images)
        try {
            const result = await createGarage(garage)

            if (result.statusCode === 200) {
                dispatch(notify({
                    type: "success",
                    title: "Register Garage",
                    description: "Successfully register your garage"
                }))
                
            }
        } catch (error) {
            dispatch(notify({
                type: "failure",
                title: "Register Garage",
                description: "Some error occured, please try again later"
            }))
        } finally {
            unload()
            navigate("/")
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
        <GarageRegistrationContextProvider>
            <GarageRegistrationPage />
        </GarageRegistrationContextProvider>
    );
}
