import { useContext } from "react";
import { ModalContext } from "../contexts/modal";


export default function useModalContext() {
    return useContext(ModalContext)
}