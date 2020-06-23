import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', creditCard: '', address: '', success: false };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleCardChange(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const order = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.address
    };
    this.props.onSubmit(order);
    this.setState({ name: '', creditCard: '', address: '', success: true });
  }

  render() {
    const price = this.props.cart.map(item => { return item.price; });
    const totalPrice = price.reduce((acc, cur) => acc + cur, 0);
    return this.state.success === false ? (
      <main className="main">
        <h3>My cart</h3>
        <h5 className="cart-text-color">{`Order Total: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice / 100)}`}</h5>
        <form className="mt-5" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="name" placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit/Debit Card</label>
            <input onChange={this.handleCardChange} value={this.state.creditCard} type="text" className="form-control" id="creditCard" placeholder="Credit Card Number" />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <input onChange={this.handleAddressChange} value={this.state.address} className="form-control" name="shippingAddress" id="shippingAddress" rows="5" />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="back-to-catalog-button" onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i><h6>Continue Shopping</h6></div>
            <button className="btn btn-outline-primary btn-color" type="submit">Place Order</button>
          </div>
        </form>
      </main>
    ) : (
      <main className="main">
        <h3>Order status</h3>
        <h5 className="cart-text-color mt-3">Order Placed!</h5>
        <div className="back-to-catalog-button mt-3"
          onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i>
          <h6>Continue Shopping</h6></div>
      </main>
    );
  }
}

export default CheckoutForm;
