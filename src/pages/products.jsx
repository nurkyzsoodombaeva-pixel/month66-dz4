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

import { useCategories } from "../hooks/use-categories";
import { useDebounce } from "../hooks/debouns.js";
import { useFiltersStore } from "../store/use-filters.js";
import { ProductCard } from "../components/Product-cart/Product-cart.jsx";

const { Text } = Typography;

export function Products() {
  const { data: categories, isLoading: isCatsLoading } = useCategories();
  const { data, loading, fetchProducts, error } = useProductsStore();
  const { search, setSearch, categoryId, setCategoryId } = useFiltersStore();
  const debouncedSearch = useDebounce(search, 500);

  // useEffect(() => {
  //     loadData(debouncedSearch, categoryId)
  // }, [debouncedSearch, categoryId])

  //   useEffect(() => {
  //     fetchProducts(debouncedSearch, categoryId);
  //   }, [debouncedSearch, categoryId]);

  useEffect(() => {
    fetchProducts(debouncedSearch, categoryId);
  }, [debouncedSearch, categoryId, fetchProducts]);

  const resetFilters = () => {
    setCategoryId(null);
    setSearch("");
  };

  return (
    <div className="page page-products">
      <div className="page-products__controls">
        <Input
          allowClear
          size="large"
          placeholder="Поиск по названию (например, Jeans)..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="page-products__search"
        />

        <Segmented
          size="large"
          options={categories || []}
          value={categoryId}
          onChange={(value) => setCategoryId(Number(value))}
          className="page-products__categories"
          disabled={isCatsLoading}
        />
        <Button onClick={resetFilters}>Сбросить фильтры</Button>
      </div>

      {error && (
        <Text type="danger" className="page-products__error">
          {error}
        </Text>
      )}

      <Spin spinning={loading || isCatsLoading}>
        {data?.length === 0 && !loading && !isCatsLoading ? (
          <div className="page-products__empty">
            <Empty
              description={
                <span>
                  Ничего не найдено. Измените поисковый запрос или фильтры.
                </span>
              }
            />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {data?.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard product={product} categories={categories} />
              </Col>
            ))}
          </Row>
        )}
      </Spin>
    </div>
  );
}
