import { Reservation } from "./reservation";
import { Tag } from "./tag";
import { User } from "./user";

export interface Accommodation {
    id: number;
    name: string;
    place: string;
    description: string;
    technical_description: string;
    adult_price: number;
    child_price: number;
    reserved: boolean;
    confirmed: boolean;
    tags: Tag[]; 
    user: User; //id
    reservations: Reservation[];
}