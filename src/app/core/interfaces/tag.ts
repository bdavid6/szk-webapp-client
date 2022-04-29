import { Accommodation } from "./accommodation";

export interface Tag {
    id: number;
    filter: string;
    accommodations: Accommodation[];
}