import { User } from "./user/user";

export interface Donor extends User{
    last_name: string
    phone_numer: string
}