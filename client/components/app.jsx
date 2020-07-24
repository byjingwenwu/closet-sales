import React from 'react';
import PageHeader from './page-header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import AcceptModal from './accept-modal';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      view: { name: 'catalog', params: {} },
      cart: [],
      isChecked: false
    };
    this.setView = this.setView.bind(this);
    this.getCartItem = this.getCartItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.acceptCheck = this.acceptCheck.bind(this);
  }

  componentDidMount() {
    this.getCartItem();
  }

  setView(viewName, viewParams) {
    this.setState({ view: { name: viewName, params: viewParams } });
  }

  getCartItem() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(error => console.error(error));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: [...this.state.cart, data] });
      })
      .catch(error => console.error(error));
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        this.setView('checkout', {});
        this.setState({ cart: [] });
      })
      .catch(error => console.error(error));
  }

  acceptCheck(accept) {
    this.setState({ isChecked: accept });
  }

  render() {
    let pageElement = null;
    switch (this.state.view.name) {
      case ('catalog'):
        pageElement = <ProductList setView={this.setView} />;
        break;
      case ('details'):
        pageElement = <ProductDetails productId={this.state.view.params.productId}
          setView={this.setView} addToCart={this.addToCart} />;
        break;
      case ('cart'):
        pageElement = <CartSummary setView={this.setView} cart={this.state.cart} />;
        break;
      case ('checkout'):
        pageElement = <CheckoutForm setView={this.setView}
          cart={this.state.cart} onSubmit={this.placeOrder} />;
        break;
    }
    return this.state.isChecked === false ? (
      <>
        <PageHeader cartItemCount={this.state.cart.length} setView={this.setView} />
        <AcceptModal handleAcceptCheck={this.acceptCheck} />
        {pageElement}
        <Footer/>
      </>
    )
      : (
        <>
          <PageHeader cartItemCount={this.state.cart.length} setView={this.setView} />
          {pageElement}
          <Footer />
        </>
      );
  }
}
