import { api } from "../api";
import { CreditPackage, GetPaymentHistoryParams, GetPaymentHistoryResponse, ProcessPaymentParams, ProcessPaymentResponse } from "../types";

export async function getCreditPackages(): Promise<CreditPackage[]> {

    const reponse = await api.get<CreditPackage[]>('/payment/packages');
    return reponse || [];

}

export async function processPayment(params: ProcessPaymentParams): Promise<ProcessPaymentResponse> {
    return api.post<ProcessPaymentResponse>('/payment/process', params);
}

