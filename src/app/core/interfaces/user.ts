import { Accommodation } from "./accommodation";
import { Reservation } from "./reservation";

export interface User {
    id: number;
    username: string;
    password: string;
    role: Role;
    name: string;
    e_mail: string;
    accommodations: Accommodation[];
    reservations: Reservation[];
}

export enum Role {
    MEMBER = 'MEMBER',
    ADMIN = 'ADMIN',
}