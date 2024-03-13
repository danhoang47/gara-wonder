import Filter from "@/features/garage-filter";
import { Categories, Garages, SortBy } from "./ui";

import "./HomePage.styles.scss"

const HomePage = () => {
    return (
        <div id="home" className="grow flex flex-col opacity-100 z-0 h-[calc(100%-80px)] overflow-auto relative">
            <div className="TopBar flex items-center h-20 shrink-0 px-10 sticky top-0 z-20 bg-background">
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
