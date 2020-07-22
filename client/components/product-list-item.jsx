import React from 'react';

class ProductListItem extends React.Component {
  render() {
    const item = this.props;
    return (
      <div className="mb-4 item-container" id={`item${item.productId}`}
        onClick={() => item.setView('details', { productId: this.props.productId })}>
        <div className="d-flex flex-column item" id={item.productId}>
          <img className="item-img" src={item.image} alt={item.name} />
          <h6>{item.brand}</h6>
          <h4>{item.name}</h4>
          <h6>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</h6>
          <p>{item.description}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
