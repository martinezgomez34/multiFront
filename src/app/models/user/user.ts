export interface User {
    user_id?: number; 
    user_name: string; 
    email: string;
    password: string; 
    is_verified: boolean;
    is_admin:boolean;
    image:string
    is_sponsor: boolean
}