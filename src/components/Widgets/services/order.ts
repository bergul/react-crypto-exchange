// types/orders.ts
export interface BuyOrder {
    price: string;
    quantity: string;
    time: number;
    isBuyerMaker: boolean;
}