import { NavLink } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export function Header() {
  const items = [
    { key: "home", label: <NavLink to="/">Главная</NavLink> },
    { key: "products", label: <NavLink to="/products">Продукты</NavLink> },
    { key: "cart", label: <NavLink to="/cart">Корзина</NavLink> },
    { key: "orders", label: <NavLink to="/orders">Заказы</NavLink> },
  ];

  return (
    <AntHeader style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <Title level={3} style={{ color: "black", margin: 0 }}>
        Onlinestore
      </Title>
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={items}
        style={{ flexGrow: 1 }}
      />
    </AntHeader>
  );
}