import { Card, Tag, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useCategories } from '../../store/category-store'
import { useCartStore } from '../../store/cart-store'


const { Paragraph, Text, Title } = Typography
export function ProductCard({ product }) {
   const {data} = useCategories()
   const {addToBasket,addPending,products} = useCartStore()
    const currentCategory = data?.find(
        (cat) => String(cat.value) === String(product.categorie_id)
    )
   
const isInCart = products?.some(
  (item) => item.productId === product.id
)
    const categoryName = currentCategory?.label || 'Без категории'

    return (
        <Link to={`/products/${product.id}`} className="product-card-link">
            <Card
                hoverable
                className="product-card"
                cover={
                    <div className="product-card__image-wrapper">
                        <img
                            src={product.picture}
                            alt={product.name}
                            className="product-card__image"
                        />
                    </div>
                }
               
            >
                <Title level={5}>{product.name}</Title>

                <Text strong>${product.price}</Text>

                <div>
                    <Tag>{categoryName}</Tag>
                </div>
                <Button onClick={(e)=>{
                    addToBasket(product)
                    e.preventDefault()
                    e.stopPropagation() }} disabled={addPending || isInCart}>Добавить в корзину</Button>
                <Paragraph ellipsis={{ rows: 2 }}>
                    {product.description}
                </Paragraph>
            </Card>
        </Link>
    )
}