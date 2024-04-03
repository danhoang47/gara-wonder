import Filter from "@/features/garage-filter";
import { Categories, Garages, SortBy } from "./ui";

import "./HomePage.styles.scss"

const HomePage = () => {
    return (
        <div id="home" className="grow flex flex-col opacity-100 z-0 relative">
            <div className="TopBar flex items-center h-24 top-20 sticky bg-background z-20 border-b px-10">
                <div className="">
                    <SortBy />
                </div>
                <Categories />
                <div className="basis-1/12 flex justify-end">
                    <Filter />
                </div>
            </div>
            <Garages />
        </div>
    );
};

export default HomePage;
