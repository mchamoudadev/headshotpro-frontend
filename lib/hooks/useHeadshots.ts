import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHeadshot, getHeadshots, getHeadshotStyles, uploadPhoto } from "../services";
import { GetHeadshotsParams, UploadPhotoParams } from "../types";

export function useHeadshotStyles () {
    return useQuery({
        queryKey: ['headshot-styles'],
        queryFn: () => getHeadshotStyles(),
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        retry: 1
    });
}


export function useHeadshots(params: GetHeadshotsParams) {

  const result = useQuery({
    queryKey: ['headshots', params],
    queryFn: () => getHeadshots(params),
    staleTime: 10 * 1000, // 10 seconds
    retry: 1,
    // auto refretch every 5 seconds if there are any processing headshots
    refetchInterval: (query) => {
        const data = query.state.data;
        const hasProcessiong = data?.headshots?.some((h) => h.status === 'processing')
        return hasProcessiong ? 5000 : false; 
    }
  })
  return result;
}


export function useGenerateHeadshot() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UploadPhotoParams) => uploadPhoto(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['headshots'] });
        },
    })
}




export function useDeleteHeadshot() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteHeadshot(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['headshots'] });
        },
    })

}