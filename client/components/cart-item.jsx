import React from 'react';

class CartItem extends React.Component {
  render() {
    const item = this.props;
    return (
      <div className="mb-5 d-flex flex-column justify-content-start cart-item-container">
        <img src={item.image} alt={item.name} className="cart-img"/>
        <h6>{item.name}</h6>
        <p className="theme-color mb-0">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</p>
        <p className="theme-color">{`Quantity: ${item.quantity}`}</p>
        <button type="button" className="close close-button" onClick={() => { item.deleteItem(item.productId); }}>
          <span>DELETE</span>
        </button>
      </div>
    );
  }
}

export default CartItem;
