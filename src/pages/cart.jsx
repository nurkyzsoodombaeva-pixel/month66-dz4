import { useCartStore } from "../store/cart-store"
import { List, Card, Typography, Button, Space, Image } from "antd"

const { Text, Title } = Typography

export function Cart() {
  const {
    products,
    isLoading,
    removeFromCart,
    deletePending,
    increaseQty,
    decreaseQty
  } = useCartStore()

  if (isLoading) return <div>LOADING...</div>

  const total = products.reduce(
    (sum, item) => sum + Number(item.price.replace("$", "")) * item.quantity,
    0
  )

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <Title level={3}>Корзина</Title>

      <List
        dataSource={products}
        locale={{ emptyText: "Корзина пуста" }}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ width: "100%" }}
              bodyStyle={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Space>
                <Image
                  src={item.picture}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />

                <div>
                  <Text strong>{item.name}</Text>
                  <br />
                  <Text type="secondary">{item.price}</Text>
                </div>
              </Space>
              <Space>
                <Button onClick={() => decreaseQty(item)}>-</Button>

                <Text>{item.quantity}</Text>

                <Button onClick={() => increaseQty(item)}>+</Button>

                <Button
                  danger
                  onClick={() => removeFromCart(item.id)}
                  loading={deletePending(item.id)}
                >
                  ✕
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />
      <Card style={{ marginTop: 20 }}>
        <Title level={4}>Итого: ${total}</Title>
      </Card>
    </div>
  )
}