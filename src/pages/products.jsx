import { useProductsStore } from "../store/products-store.js";
import { useEffect } from "react";
import {
  Col,
  Row,
  Input,
  Segmented,
  Spin,
  Empty,
  Typography,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "../hooks/debouns.js";
import { useFiltersStore } from "../store/use-filters.js";
import { ProductCard } from "../components/Product-cart/Product-cart.jsx";
import { Filters } from "../components/Filters/Filters.jsx";

const { Text } = Typography;

export function Products() {

  const { search, categoryId } = useFiltersStore();
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, error } = useProductsStore({
    name : `*${debouncedSearch}`,
    categorie_id : categoryId
  });
    

  if(isLoading) {
    return <div>LOADING...</div>
  }

  return (
    <div className="page page-products">
      <Filters/>
      {error && (
        <Text type="danger" className="page-products__error">
          {error}
        </Text>
      )}
          <Row gutter={[24, 24]}>
            {data?.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
    </div>
  );
}
