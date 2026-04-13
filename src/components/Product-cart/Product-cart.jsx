import { Card, Tag, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'

import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCategories } from '../../hooks/use-categories';

const { Paragraph, Text, Title } = Typography
export function ProductCard({ product }) {
    const { data: categories} = useCategories()

    const currentCategory = categories.find(
        (cat) => String(cat.value) === String(product.categorie_id)
    )

    const categoryName = currentCategory?.label || 'Без категории'

    
    
    
 
    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()

        console.log(`Товар ${product.name} летит в корзину!`)
    }

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
                actions={[
                    <Button 
                        type="primary" 
                        icon={<ShoppingCartOutlined />} 
                        onClick={handleAddToCart}
                    >
                        В корзину
                    </Button>
                ]}
            >
                <Title level={5}>{product.name}</Title>

                <Text strong>${product.price}</Text>

                <div>
                    <Tag>{categoryName}</Tag>
                </div>

                <Paragraph ellipsis={{ rows: 2 }}>
                    {product.description}
                </Paragraph>
            </Card>
        </Link>
    )
}