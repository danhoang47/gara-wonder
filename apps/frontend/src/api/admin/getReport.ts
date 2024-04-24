import axios from "axios";

import { Report, Response, Review } from "@/core/types";
import { baseAdminUrl } from ".";

export type ReportType = Report & {
    review?: Review;
};

export default async function getReport(
    month: number = 4,
    year: number = 2024,
    sort: string = "asc",
) {
    try {
        const url =
            baseAdminUrl + `/report?month=${month}&year=${year}&sort=${sort}`;

        const result = await axios.get<Response<ReportType[]>>(url);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}

// {
//     "_id": "661fdd5a4e634e964bc851de",
//     "title": "Fake review",
//     "content": "Content conet Content conet Content conet Content conet",
//     "createdAt": 1713364283444,
//     "updatedAt": 1713364283444,
//     "type": 1,
//     "entityId": "661d45aee5861185afee7815",
//     "__v": 0,
//     "review": {
//         "_id": "661d45aee5861185afee7815",
//         "ratingPoint": 5,
//         "content": "This garage is wonderfull!!",
//         "createdAt": 1713194411891,
//         "updatedAt": 1713194411891,
//         "garageId": {
//             "_id": "65df5dd37a592fb6b6466ad8",
//             "name": "Garage wonder 32",
//             "backgroundImage": [
//                 {
//                     "url": "http://res.cloudinary.com/leduc13/image/upload/w_320,h_320/v1708869484/qbyxb8krqywpvbh82cno.webp",
//                     "width": 320,
//                     "height": 320,
//                     "_id": "65db4771f106b891bd9cd6c3"
//                 },
//                 {
//                     "url": "http://res.cloudinary.com/leduc13/image/upload/w_680,h_450/v1708869484/qbyxb8krqywpvbh82cno.webp",
//                     "width": 680,
//                     "height": 450,
//                     "_id": "65db4771f106b891bd9cd6c4"
//                 },
//                 {
//                     "url": "http://res.cloudinary.com/leduc13/image/upload/w_1280,h_960/v1708869484/qbyxb8krqywpvbh82cno.webp",
//                     "width": 1280,
//                     "height": 960,
//                     "_id": "65db4771f106b891bd9cd6c5"
//                 }
//             ]
//         },
//         "userId": {
//             "_id": "65ddeccee5e7b6629c67be95",
//             "displayName": "Huy Ngu 3",
//             "photoURL": "http://res.cloudinary.com/leduc13/image/upload/v1713792956/y1hdakxufllfsv2dxkn5.png"
//         },
//         "__v": 0
//     }
// },
