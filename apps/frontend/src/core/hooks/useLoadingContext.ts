import { useContext } from "react";
import { LoadingContext } from "@/core/contexts/loading";


export default function useLoadingContext() { 
    return useContext(LoadingContext) 
}