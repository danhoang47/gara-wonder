
const phoneNumberRegex = /\d+/i

export default function isPhoneNumber(str: string | undefined): boolean {
    if (!str) return false;

    const result = phoneNumberRegex.test(str);

    return result && str.length >= 9 && str.length <= 12 
}   