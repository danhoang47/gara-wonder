import Filter from "@/features/garage-filter";
import { Categories, FavoriteFilterButton, Garages, SortBy } from "./ui";

import "./HomePage.styles.scss";
import { useAuthLoading } from "@/core/hooks";

const HomePage = () => {
    useAuthLoading(HomePage.name);

    return (
        <div id="home" className="grow flex flex-col opacity-100 z-0 relative">
            <div className="TopBar flex items-center h-24 top-20 sticky bg-background z-20 border-b px-10 gap-4">
                <div className="flex gap-2">
                    <SortBy />
                    <FavoriteFilterButton />
                </div>
                <Categories />
                <div className="basis-1/12 flex justify-end gap-2">
                    <Filter />
                </div>
            </div>
            <Garages />
        </div>
    );
};

export default HomePage;
