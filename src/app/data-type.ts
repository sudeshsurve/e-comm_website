export interface sellersignup{
    email:string,
    password:string,
    name:string
}

export interface sellerlogin{
    email:string,
    password:string
}
export interface product{
    p_name:string,
    p_color:string,
    p_prize:string,
    p_description:string,
    p_img:string,
    id?:number,
    qty:number 
}

export interface cart{
    p_name:string,
    p_color:string,
    p_prize:string,
    p_description:string,
    p_img:string,
    id?:undefined |  number,
    productID: undefined |  number
    userId :  number
}