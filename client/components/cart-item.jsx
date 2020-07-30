import React from 'react';

class CartItem extends React.Component {
  render() {
    const item = this.props;
    return (
      <>
        <div className="d-flex mb-4 cart-item-container">
          <img src={item.image} alt={item.name} className="col-sm-5 cart-img"/>
          <div className="col-sm-6 d-flex flex-column justify-content-center">
            <h4>{item.name}</h4>
            <h6 className="theme-color">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</h6>
            <p>{item.description}</p>
            <h6 className="theme-color">{`Quantity: ${item.quantity}`}</h6>
          </div>
          <button type="button" className="close col-sm-1"
            onClick={() => { item.deleteItem(item.productId); }}>
            <span>&times;</span>
          </button>
        </div>
      </>
    );
  }
}

export default CartItem;
