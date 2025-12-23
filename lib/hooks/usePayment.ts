import { useMutation, useQuery } from "@tanstack/react-query";
import { getCreditPackages, processPayment } from "../services";
import { ProcessPaymentParams } from "../types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useGetCreditPackages() {
    return useQuery({
        queryKey: ['credit-packages'],
        queryFn: () => getCreditPackages(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2
    });
}

export function useProcessPayment() {

    const router = useRouter();

    return useMutation({
        mutationFn: (params: ProcessPaymentParams) => processPayment(params),
        onSuccess: (data) => {
            // stripe redirect link 
            // console.log('data', data);
            if(data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }else{
                toast.success(data.message || 'Payment processed successfully');
                router.push('/dashboard/user/credits?status=pending');
            }
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to process payment');
        }
    });
}

