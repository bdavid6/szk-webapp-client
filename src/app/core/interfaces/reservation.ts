import { Accommodation } from "./accommodation";
import { User } from "./user";

export interface Reservation {
    id: number;
    startDate: string;
    endDate: string;
    user: User;
    accommodation: Accommodation;
}