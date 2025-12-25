import { api } from "../api";
import { Order } from "../types/payment-types";

export const adminOrderService = {
  getAllOrders: async (params: {
    limit: number;
    page: number;
    status?: string;
    platform?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();

    // ?limit=10&page=1&status=completed&platform=mobile
    return api.get<{
      orders: Order[];
      pagination: { total: number; page: number; limit: number; pages: number };
    }>(`/admin/orders${query ? `?${query}` : ""}`);
  },

  createManualOrder: async (data: {
    userId: string;
    packageId: string;
    amount: number;
  }) => {
    return api.post<Order>("/admin/orders/manual", data);
  },

};
