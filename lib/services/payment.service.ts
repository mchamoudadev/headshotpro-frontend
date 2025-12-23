import { api } from "../api";
import { CreditPackage, GetPaymentHistoryParams, GetPaymentHistoryResponse, Order, ProcessPaymentParams, ProcessPaymentResponse } from "../types";

export async function getCreditPackages(): Promise<CreditPackage[]> {

    const reponse = await api.get<CreditPackage[]>('/payment/packages');
    return reponse || [];

}

export async function processPayment(params: ProcessPaymentParams): Promise<ProcessPaymentResponse> {
    return api.post<ProcessPaymentResponse>('/payment/process', params);
}


export async function getPaymentHistory(limit: number): Promise<Order[]> {
    return api.get<Order[]>(`/payment/history?limit=${limit}`);
}

