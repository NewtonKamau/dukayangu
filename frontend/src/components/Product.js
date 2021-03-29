import { Card, CardImg  } from "react-bootstrap"
import Ratings from './Ratings'

const Product = ({product}) => {
    return (
      <Card className="my-3 py-3 rounded">
        <a href={`/product/${product._id}`}>
          <CardImg src={product.image} variant="top" />
        </a>
        <Card.Body>
          <a href={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <div className="my-3">
              <Ratings
                value={product.rating}
                text={`${product.numReviews} review`} />
                    </div>
                 </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    );
}

export default Product
