import { CategoryType } from "@/core/types";

export default function getCategoryIcon(type: CategoryType): string {
    const cdnUrl = import.meta.env.VITE_CDN_URL;
    switch (type) {
        case CategoryType.Fix: return cdnUrl + "fix.png"
        case CategoryType.Wash: return cdnUrl + "wash.png"
        case CategoryType.Unwrap: return cdnUrl + "unwrap.png"
        case CategoryType.Upgrade: return cdnUrl + "upgrade.png"
        case CategoryType.Replace: return cdnUrl + "replace.png"
        case CategoryType.Interior: return cdnUrl + "interior.png"
        case CategoryType.Exterior: return cdnUrl + "exterior.png"
        default: 
            return cdnUrl
    }
}
