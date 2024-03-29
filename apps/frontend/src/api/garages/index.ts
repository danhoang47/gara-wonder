export const baseGaragesUrl = `${import.meta.env.VITE_API_URL}/garage`;

export { default as initGarage } from "./initGarage";
export { default as createGarage } from "./createGarage";
export { default as getGarages } from "./getGarages";
export { default as uploadGarageImages } from "./uploadGarageImages";

export { default as getGarageImages } from "./getGarageImages";
export { default as getBasicGarageInfo } from "./getBasicGarageInfo";
export { default as getGarageServices } from "./getGarageServices";

export { default as getGarageByOwnerId } from './getGarageByOwnerId'
export { default as addGarageToFavorites } from './addGarageToFavorites'
