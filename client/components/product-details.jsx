import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(error => console.error(error));
  }

  handleAddToCart() {
    const { productId, price } = this.state.product;
    const product = { productId, price };
    this.props.addToCart(product);
  }

  render() {
    const item = this.state.product;
    return item === null ? (null)
      : (
        <>
          <main className="main">
            <div className="back-to-catalog-button" onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i><h6>Back to Catalog</h6></div>
            <div className="detail-container">
              <div className="d-flex flex-row h-100">
                <img src={item.image} alt={item.name} className="col-4 detail-img h-100" />
                <div className="col-8">
                  <h6>{item.brand}</h6>
                  <h3>{item.name}</h3>
                  <h6>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</h6>
                  <h6>{`Size: ${item.size}`}</h6>
                  <p>{item.shortDescription}</p>
                  <button className="btn btn-outline-primary btn-color" onClick={this.handleAddToCart}>Add to Cart</button>
                  <ul className="detail-list">
                    {
                      item.details.map((detail, index) => {
                        return <li key={index}>{detail}</li>;
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </>
      );
  }
}

export default ProductDetails;
