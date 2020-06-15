import React from 'react';
import PageHeader from './page-header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItem = this.getCartItem.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItem();
  }

  setView(viewName, viewParams) {
    this.setState({ view: { name: viewName, params: viewParams } });
  }

  getCartItem() {
    fetch('api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(error => console.error(error));
  }

  addToCart(product) {
    fetch('api/cart', {
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

  render() {
    return this.state.view.name === 'catalog' ? (
      <>
        <PageHeader cartItemCount={this.state.cart.length}/>
        <ProductList setView={this.setView} />
      </>
    )
      : (
        <>
          <PageHeader cartItemCount={this.state.cart.length}/>
          <ProductDetails productId={this.state.view.params.productId} setView={this.setView} addToCart={this.addToCart}/>
        </>
      );
  }
}
