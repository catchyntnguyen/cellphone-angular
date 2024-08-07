interface IProduct {
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
   }
interface Iuser{
    name:string;
    email:string;
    password:string;
    role:number;
}
interface IuserLocal{
    name:string;
    email:string;
    role:number;
}
interface Iemail{
    email:string;
    pass:string;
}
export { IProduct, Iuser, Iemail, IuserLocal }; 