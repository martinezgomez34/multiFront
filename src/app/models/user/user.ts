export interface User {
    id?: number; 
    name: string; 
    lastname: string;
    email: string; 
    password: string;
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