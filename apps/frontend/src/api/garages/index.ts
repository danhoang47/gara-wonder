export const baseGaragesUrl = `${import.meta.env.VITE_API_URL}/garage`;

export { default as initGarage } from "./initGarage";
export { default as createGarage } from "./createGarage";
export { default as getGarages } from "./getGarages";
export { default as uploadGarageImages } from "./uploadGarageImages";

export { default as getGarageImages } from "./getGarageImages";
export { default as getBasicGarageInfo } from "./getBasicGarageInfo";
export { default as getGarageServices } from "./getGarageServices";

export { default as getGarageByOwnerId } from "./getGarageByOwnerId";
export { default as addGarageToFavorites } from "./addGarageToFavorites";
export { default as getDashboardInfo } from "./getDashboardInfo";

export { default as getOrderEvaluation } from "./getOrderEvaluation";

export { default as getScheduleSlot } from "./getScheduleSlot";

export { default as updateService } from "./updateServices";
export { default as delteService } from "./deleteService";
export { default as addNewService } from "./addNewServices";
export { default as getDistance } from "./getDistance";
export { default as updateGarageSetting } from "./updateGarageSetting";
export { default as getGarageSetting } from "./getGarageSetting";

export { default as getPlaceSuggestions } from "./getPlaceSuggestions";
export { default as getReviews } from "./getReviews";

export { default as getInvitationsByGarageId } from "./getInvitationsByGarageId";
export { default as createInvitations } from "./createInvitations";
export { default as getGarageLiscense } from "./getGarageLiscense";
export { default as updateGarageLiscene } from "./updateLiscene";
