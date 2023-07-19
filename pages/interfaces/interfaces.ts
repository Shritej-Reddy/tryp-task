export interface IPaymentsDataInterface {
    timestamp: string;
    purchaseId: number;
    mail: string;
    name: string;
    source: string;
    status: string;
    select: string;
}

export interface IPaymentsColumnsInterface {
    header: string;
    accessorKey: string;
}