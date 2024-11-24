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
export interface NewsItem {
  _id: string;
  title: string;
  public_date: string;
  image: string; 
  status: string;
  author: string;
}