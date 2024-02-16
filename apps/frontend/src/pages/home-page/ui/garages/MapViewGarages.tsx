import { ViewModeGaragesProps } from "./Garages";


export default function MapViewGarages({
    garages,
    isLoading,
    error
}: ViewModeGaragesProps) {

    return (
        <>
            <iframe
                className="h-full w-full"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&q=DaNang,VietNam`} 
            />
        </>
    )
}