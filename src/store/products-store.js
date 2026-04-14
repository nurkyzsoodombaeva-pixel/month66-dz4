
import {  useQuery } from "@tanstack/react-query"
import { classicApi } from "../api/axios";


export const useProductsStore = (params) =>{
  return useQuery({
    queryKey: ['products',params],
    queryFn: async ()=>{
      const {data } = await classicApi.get("/qwe", {
        params ,
      })
      return data
    }
  })
}