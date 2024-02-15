import GarageSkeletonCard from "../garage-skeleton-card";

function Garages() {
    

    return (
        <div className="grid grid-cols-4 gap-3 relative">
            {Array.from(new Array(20)).map((_, index) => (
                <GarageSkeletonCard key={index} />
            ))}
        </div>
    );
}

export default Garages;
