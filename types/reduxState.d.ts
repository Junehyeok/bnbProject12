import { BedType, RoomType } from "./room";
import { UserType } from "./user";

//& 유저 redux state
export type UserState = UserType & {
    isLogged: boolean;
};

//* 공통 redux state
export type CommonState = {
    validateMode: boolean;
};

//* 숙소 등록하기 redux state
type RegisterRoomState = {
    //12chap
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    isSetUpForGuest: boolean | null;
    maximumGuestCount: number;
    bedroomCount: number;
    bedCount: number;
    bedList: { id: number; beds: { type: BedType; count: number }[] }[];
    publicBedList: { type: BedType; count: number }[];
    //13chap
    bathroomCount: number;
    bathroomType: "private" | "public" | null;
    //14chap
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longitude: number;
    //15chap
    amentities: string[];
    //16chap
    conveniences: string[],
}
