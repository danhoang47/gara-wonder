import { useContext } from "react";
import SupplierRegistrationContext from "../contexts";

export default function useSupplierRegistrationContext() {
    return useContext(SupplierRegistrationContext);
}
