export interface Donor{
    user_is?: string
    user_name: string
    email: string
    password: string
    type_center: string
    needs?: string
    contact_phone_numer: string //le cambie el nombre pq asi estaba escrito en la bd
    contact_social_media: string
    contact_others: string
    address: string
    image?:string
    is_sponsor: boolean
}