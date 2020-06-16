import React from 'react';
import CartItem from './cart-item';

class CartSummary extends React.Component {
  render() {
    const price = this.props.cart.map(item => { return item.price; });
    const totalPrice = price.reduce((acc, cur) => acc + cur, 0);
    return this.props.cart.length === 0 ? (
      <main className="main">
        <div className="back-to-catalog-button"
          onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i>
          <h6>Back to Catalog</h6></div>
        <h3>My Cart</h3>
        <h5 className="cart-text-color">Your cart is empty.</h5>
      </main>
    ) : (
      <main className="main">
        <div className="back-to-catalog-button"
          onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i>
          <h6>Back to Catalog</h6></div>
        <div>
          <h3>My cart</h3>
          <div>
            {
              this.props.cart.map(item => {
                return <CartItem key={item.productId}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  description={item.shortDescription} />;
              })
            }
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="cart-text-color">{`Order Total: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice / 100)}`}</h5>
          <button className="btn btn-outline-primary btn-color"
            onClick={() => this.props.setView('checkout', {})}>Checkout Order</button>
        </div>
      </main>
    );
  }
}

export default CartSummary;
