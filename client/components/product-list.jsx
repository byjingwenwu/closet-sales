import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(error => console.error(error));
  }

  render() {
    const products = this.state.products;
    return (
      <main className="main">
        <div className="col-12 d-flex flex-wrap product-list">
          {
            products.map(item => {
              return <ProductListItem
                key={item.productId}
                productId={item.productId}
                name={item.name}
                price={item.price}
                image={item.image}
                description={item.shortDescription}
                setView={this.props.setView} />;
            })
          }
        </div>
      </main>
    );
  }
}

export default ProductList;
