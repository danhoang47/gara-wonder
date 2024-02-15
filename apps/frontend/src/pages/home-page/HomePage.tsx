import Filter from "@/features/garage-filter";
import { Categories, Garages, SortBy } from "./ui";

const HomePage = () => {
    return (
        <div id="home" className="px-10">
            <div className="TopBar flex my-8 items-center">
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
