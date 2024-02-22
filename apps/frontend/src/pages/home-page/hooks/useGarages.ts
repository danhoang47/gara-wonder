import useSWR from 'swr'

import { Garage } from "@/core/types";
import { useAppSelector } from '@/core/hooks';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function useGarages() {
    const filter = useAppSelector(state => state.filter)
    const [searchParams] = useSearchParams()
    const [sortBy, categoryId, lng, lat] = useMemo(() => 
        [
            searchParams.get("sortBy"), 
            searchParams.get("category"),
            searchParams.get("lng"),
            searchParams.get("lat")
        ], 
    [searchParams])
    const { isLoading, error, data: garages } = useSWR<Garage[]>('', () => {
        return []
    });
    
    return { garages, isLoading, error }
}