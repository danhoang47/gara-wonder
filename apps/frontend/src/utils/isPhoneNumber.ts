
const phoneNumberRegex = new RegExp(/\d{9,}/g)

export default function isPhoneNumber(str: string | undefined): boolean {
    return str ? phoneNumberRegex.test(str)  : false 
}   