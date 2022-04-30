import { Reservation } from "./reservation";
import { Tag } from "./tag";
import { User } from "./user";

export interface Accommodation {
    id: number;
    name: string;
    place: string;
    description: string;
    technicalDescription: string;
    adultPrice: number;
    childPrice: number;
    reserved: boolean;
    confirmed: boolean;
    tags: Tag[]; 
    user: User;
    reservations: Reservation[];
}