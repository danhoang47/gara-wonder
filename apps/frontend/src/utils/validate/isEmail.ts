
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default function isEmail(str: string | undefined): boolean {
    if (!str) return false;

    return emailRegex.test(str);
}   