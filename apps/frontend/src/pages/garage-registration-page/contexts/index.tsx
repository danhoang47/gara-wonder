import { createContext, useState, useMemo, useCallback, useContext } from 'react';

import { ContainerProps, Garage } from '@/core/types';

export type GarageRegistration = Partial<Garage>

export type GarageRegistrationContextType = {
    garageRegistrationState: GarageRegistration,
    setGarageRegistrationStateValue: <K extends keyof GarageRegistration>(key: K, value: GarageRegistration[K]) => void
}

const GarageRegistrationContext = createContext<GarageRegistrationContextType>({} as GarageRegistrationContextType)

export function GarageRegistrationContextProvider({ children }: ContainerProps) {
    const [garageRegistrationState, setGarageRegistrationState] = useState<GarageRegistration>({})

    const setGarageRegistrationStateValue = useCallback(
        <K extends keyof GarageRegistration>(key: K, value: GarageRegistration[K]) => {
            setGarageRegistrationState(prev => ({
                ...prev, 
                [key]: value
            }))
        }, []
    )

    const contextValue = useMemo(() => ({
        garageRegistrationState,
        setGarageRegistrationStateValue
    }), [garageRegistrationState])

    return (
        <GarageRegistrationContext.Provider value={contextValue}>
            {children}
        </GarageRegistrationContext.Provider>
    )
}

export function useGarageRegistration() {
    return useContext(GarageRegistrationContext)
}

export default GarageRegistrationContext