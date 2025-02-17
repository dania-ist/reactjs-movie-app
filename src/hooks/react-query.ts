import { AxiosError, AxiosResponse } from 'axios'
import {  InvalidateQueryFilters, QueryKey, useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import instance from '../axios'

export type QueryKeyT = [string, object | undefined]

export const useDefaultError = () => {

  return (error: AxiosError<{ message?: string }>) => {
    const errorMassage = error.response?.data?.message || error.message
    console.log("error")
  }
}


export const fetcher = async<T,>({ queryKey }:{queryKey:QueryKeyT}): Promise<T> => {
  console.log(queryKey,"key")
  const [url, params] = queryKey
  return instance
    .get(url, { params: { ...params } })
    .then((res) => res.data)
}

export const useFetch = <T,>(
  url: string,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT> | null
) => {
  return useQuery<T, Error, T, QueryKeyT>({
    ...config,
    queryKey: [url, params], 
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
  })
}

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  config?:any
 
) => {
  return useMutation<AxiosResponse, AxiosError, T | S>({
    ...config,
    mutationFn: func, 
    onError: useDefaultError(),
    
  });
};

export const usePost = <T, S>(
  url: string,
  handleSuccess?:()=>void,
  invalidateKey?:Array<string>,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const queryClient = useQueryClient();
  return useGenericMutation<T, S>(
    (data) => instance.post<S>(url, data),{
      ...config,
      onError: useDefaultError(),
      onSuccess:() => {
        invalidateKey &&
            invalidateKey.forEach((key) => {
              queryClient.invalidateQueries([key] as InvalidateQueryFilters);
              
            });
        handleSuccess && handleSuccess();
    },
      
      
    });
};
