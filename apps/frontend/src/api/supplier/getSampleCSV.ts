import axios from "axios";
import { baseSupplierUrl } from ".";

export default async function getSampleCSV() {
    try {
        const result = await axios.get(`${baseSupplierUrl}/product/template`);
        // Creating an object for downloading url
        const url = window.URL.createObjectURL(
            new Blob([result.data], { type: "text/csv" }),
        );

        // Creating an anchor(a) tag of HTML
        const a = document.createElement("a");

        // Passing the blob downloading url
        a.setAttribute("href", url);

        // Setting the anchor tag attribute for downloading
        // and passing the download file name
        a.setAttribute("download", "sample.csv");

        // Performing a download with click
        a.click();
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}
