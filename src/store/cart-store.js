import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { classicApi } from "../api/axios"

export const useCartStore = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await classicApi.get("/cart")
      return data
    }
  })

  const { mutate: addToBasket, isPending: addPending } = useMutation({
    mutationFn: async (product) => {
      const existing = data?.find(
        (item) => item.productId === product.id
      )

      if (existing) {
        await classicApi.patch(`/cart/${existing.id}`, {
          quantity: existing.quantity + 1
        })
      } else {
        await classicApi.post("/cart", {
          productId: product.id,
          name: product.name,
          price: product.price,
          picture: product.picture,
          quantity: 1
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })

  const increaseQty = async (item) => {
    await classicApi.patch(`/cart/${item.id}`, {
      quantity: item.quantity + 1
    })
    queryClient.invalidateQueries({ queryKey: ["cart"] })
  }
  
  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await classicApi.delete(`/cart/${item.id}`)
    } else {
      await classicApi.patch(`/cart/${item.id}`, {
        quantity: item.quantity - 1
      })
    }
    queryClient.invalidateQueries({ queryKey: ["cart"] })
  }
  
  const {
    mutate: removeFromCart,
    isPending: deletePending,
    variables
  } = useMutation({
    mutationFn: async (id) => {
      await classicApi.delete(`/cart/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })

  return {
    products: data || [],
    isLoading,

    addToBasket,
    addPending,

    increaseQty,
    decreaseQty,

    removeFromCart,
    deletePending: (id) => deletePending && id === variables
  }
}