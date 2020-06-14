import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(error => console.error(error));
  }

  render() {
    const item = this.state.product;
    return item === null ? (null)
      : (
        <>
          <main className="main">
            <div className="back-to-catalog-button" onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i><h6>Back to Catalog</h6></div>
            <div className="detail-container">
              <div className="d-flex flex-row">
                <img src={item.image} alt={item.name} className="col-7 detail-img"/>
                <div>
                  <h3>{item.name}</h3>
                  <h6>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</h6>
                  <p>{item.shortDescription}</p>
                </div>
              </div>
              <div className="long-description">
                <p>{item.longDescription}</p>
              </div>
            </div>
          </main>
        </>
      );
  }
}

export default ProductDetails;
