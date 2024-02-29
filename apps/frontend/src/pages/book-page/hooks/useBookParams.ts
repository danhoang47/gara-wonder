import { useSearchParams } from "react-router-dom";


export default function useBookParams() {
    const [searchParams, setSearchParams] = useSearchParams(); 
    
    const setBookParams = () => {

    } 

    return { setBookParams }
}