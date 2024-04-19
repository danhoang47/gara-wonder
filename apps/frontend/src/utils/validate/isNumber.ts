const numberRegex = new RegExp(/^\d+$/)

export default function isNumber(str: unknown): str is number {
    if (typeof str === "number") {
        return true;
    }
    
    if (typeof str === "string") {
        return numberRegex.test(str)
    }

    return false;
}
