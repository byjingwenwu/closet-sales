import React from 'react';

class CartItem extends React.Component {
  render() {
    const item = this.props;
    return (
      <>
        <div className="d-flex mb-4 cart-item-container">
          <img src={item.image} alt={item.name} className="col-sm-6 cart-img"/>
          <div>
            <h4>{item.name}</h4>
            <h6>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</h6>
            <p>{item.description}</p>
          </div>
        </div>
      </>
    );
  }
}

export default CartItem;
