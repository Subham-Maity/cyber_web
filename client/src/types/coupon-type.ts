export interface ICoupon {
    _id: string;
    code: string;
    expirationDate: Date | null;
    discountPercentage: number;
    description: string;
    maxUseLimit: number;
    usedCount: number;
    isValid: boolean;
}