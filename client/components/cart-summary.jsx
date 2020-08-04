import React from 'react';
import CartItem from './cart-item';

class CartSummary extends React.Component {
  render() {
    const price = this.props.cart.map(item => { return item.price; });
    const totalPrice = price.reduce((acc, cur) => acc + cur, 0);
    return this.props.cart.length === 0 ? (
      <main className="main">
        <div className="back-to-catalog-button mb-4"
          onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i>
          <h6>Back to Catalog</h6></div>
        <h3>Shopping Cart</h3>
        <h5 className="cart-text-color">Your cart is empty.</h5>
      </main>
    ) : (
      <main className="main">
        <div className="back-to-catalog-button mb-4"
          onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i>
          <h6>Back to Catalog</h6></div>
        <h3>Shopping Cart</h3>
        <div className="mt-4 mb-4 d-flex flex-wrap">
          {
            this.props.groupCartItem.map(item => {
              return <CartItem key={item.productId}
                productId={item.productId}
                name={item.name}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                deleteItem={this.props.deleteItem}/>;
            })
          }
        </div>
        <div className="d-flex align-items-center justify-content-end fixed-bottom checkout-sum">
          <h5 className="theme-color col-4 text-center p-0">{`ORDER TOTAL: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice / 100)}`}</h5>
          <div className="col-4 text-right">
            <button className="btn btn-outline-primary btn-color "
              onClick={() => this.props.setView('checkout', {})}>Checkout Order</button>
          </div>
        </div>
      </main>
    );
  }
}

export default CartSummary;
