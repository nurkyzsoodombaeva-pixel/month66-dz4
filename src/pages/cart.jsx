import { useCartStore } from "../store/cart-store";
import {
  List,
  Card,
  Typography,
  Button,
  Space,
  Image,
  Flex,
  Spin,
  Divider,
} from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export function Cart() {
  const {
    products,
    isLoading,
    removeFromCart,
    deletePending,
    increaseQty,
    decreaseQty,
  } = useCartStore();

  if (isLoading)
    return (
      <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
        <Spin size="large" tip="Загрузка корзины..." />
      </Flex>
    );

  const total = products.reduce(
    (sum, item) => sum + Number(item.price.replace("$", "")) * item.quantity,
    0,
  );

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <Title level={2} style={{ marginBottom: 32 }}>
        Корзина
      </Title>

      <List
        dataSource={products}
        locale={{
          emptyText: <div style={{ padding: "40px 0" }}>Корзина пуста</div>,
        }}
        renderItem={(item) => (
          <List.Item style={{ padding: "12px 0", border: "none" }}>
            <Card
              hoverable
              style={{ width: "100%" }}
              styles={{ body: { padding: 16 } }}
            >
              <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                gap="middle"
              >
                <Space size="middle">
                  <Image
                    src={item.picture}
                    width={80}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                    preview={false}
                  />

                  <div>
                    <Title level={5} style={{ margin: 0 }}>
                      {item.name}
                    </Title>
                    <Text type="secondary">{item.price}</Text>
                  </div>
                </Space>

                <Space size="large">
                  <Space.Compact size="middle">
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => decreaseQty(item)}
                      disabled={item.quantity <= 1}
                    />
                    <Button style={{ width: 45, cursor: "default" }} disabled>
                      {item.quantity}
                    </Button>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => increaseQty(item)}
                    />
                  </Space.Compact>

                  <Text strong style={{ minWidth: 60, textAlign: "right" }}>
                    $
                    {(
                      Number(item.price.replace("$", "")) * item.quantity
                    ).toFixed(2)}
                  </Text>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeFromCart(item.id)}
                    loading={deletePending(item.id)}
                  />
                </Space>
              </Flex>
            </Card>
          </List.Item>
        )}
      />

      {products.length > 0 && (
        <Card
          style={{ marginTop: 32, borderRadius: 12, background: "#fafafa" }}
        >
          <Flex justify="space-between" align="center">
            <Text style={{ fontSize: 18 }}>Итого к оплате:</Text>
            <Title level={3} style={{ margin: 0 }}>
              ${total.toFixed(2)}
            </Title>
          </Flex>
          <Divider />
          <Button type="primary" size="large" block style={{ height: 48 }}>
            Оформить заказ
          </Button>
        </Card>
      )}
    </div>
  );
}
