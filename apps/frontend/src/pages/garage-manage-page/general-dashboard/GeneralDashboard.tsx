import { useAppSelector } from "@/core/hooks";
import { GeneralInfo, UpcomingOrders, UpdateGarage } from "./ui";

function GeneralDashboard() {
    const userData = useAppSelector((state) => state.user);
    return (
        <div>
            <div className="pt-10">
                <p className="text-3xl font-semibold">
                    Hello{" "}
                    <span className="font-bold">
                        {userData.value?.displayName}
                    </span>
                    ,
                </p>
                <p>This is what we’ve got you today.</p>
            </div>

            <GeneralInfo />

            <UpcomingOrders />

            <UpdateGarage />
        </div>
    );
}

export default GeneralDashboard;
