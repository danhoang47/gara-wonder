import useSWR from 'swr'

import { Garage } from "@/core/types";

export default function useGarages() {
    const { isLoading, error, data: garages } = useSWR<Garage[]>('', () => {
        return []
    });
    
    return { garages, isLoading, error }
}