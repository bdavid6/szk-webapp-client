import { Accommodation } from "./accommodation";
import { User } from "./user";

export interface Reservation {
    id: number;
    start_date: string;
    end_date: string;
    user: User; //id
    accommodation: Accommodation; //id
}