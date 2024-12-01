export interface User {
    user_id?: number; 
    user_name: string; 
    email: string;
    password: string; 
    is_verified: boolean;
    is_admin:boolean;
    image?:string
    is_sponsor: boolean
}
  
export interface donor {
  id?: number;
  user_name: string;
  last_name: string;
  email: string;
  password : string;
  phone_number: string;
  image?: File
}
export interface NewsItem {
  _id: string;
  title: string;
  public_date: string;
  image: string; 
  status: string;
  author: string;
}