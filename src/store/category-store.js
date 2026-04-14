
import { classicApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await classicApi.get("/categories");
            return data;
        }
    })
}
