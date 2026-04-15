import { useMutation } from "@tanstack/react-query";
import { classicApi } from "../api/axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await classicApi.post("/users", payload);
      return data;
    },
    onSuccess: () => navigate("/"),
  });
  
  return {
    login: mutate,
    loginPending: isPending,
  };
};

export const useRegister = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await classicApi.post("/users", payload);
      return data;
    },
    onSuccess: () => navigate("/"),
  });
  return {
    register: mutate,
    registerisPending: isPending,
  };
};
