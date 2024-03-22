export interface IDiscountCoupon {
    _id: string;
    code: string;
    discountPercentage: number;
    expirationDate: Date;
    isValid: boolean;
    description?: string;
}