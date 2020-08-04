import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      creditCard: '',
      month: '',
      year: '',
      cvv: '',
      formValidation: {
        name: true,
        email: true,
        phone: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zipCode: true,
        creditCard: true,
        month: true,
        year: true,
        cvv: true
      },
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const formValidation = {
      name: true,
      email: true,
      phone: true,
      address1: true,
      address2: true,
      city: true,
      state: true,
      zipCode: true,
      creditCard: true,
      month: true,
      year: true,
      cvv: true
    };

    switch (event.target.name) {
      case 'phone':
      case 'zipCode':
      case 'creditCard':
      case 'cvv':
        if (/^[0-9]*$/.test(event.target.value)) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      case 'fullName':
      case 'address1':
      case 'address2':
      case 'city':
        if (event.target.value.indexOf('  ') === -1) {
          this.setState({ [event.target.name]: event.target.value });
        }
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
    this.setState({ formValidation });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formValidation = JSON.parse(JSON.stringify(this.state.formValidation));
    const nameRegex = new RegExp(/^[a-zA-Z ]+$/);
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!nameRegex.test(this.state.name) || this.state.name.length < 2) {
      formValidation.name = false;
    }

    if (!emailRegex.test(this.state.email)) {
      formValidation.email = false;
    }

    if (this.state.phone.length < 10) {
      formValidation.phone = false;
    }

    if (this.state.address1.length === 0) {
      formValidation.address1 = false;
    }

    if (this.state.city.length === 0) {
      formValidation.city = false;
    }

    if (this.state.state.length < 2) {
      formValidation.state = false;
    }

    if (this.state.zipCode.length !== 5) {
      formValidation.zipCode = false;
    }

    if (this.state.creditCard.length !== 16) {
      formValidation.creditCard = false;
    }

    if (this.state.month.length < 2) {
      formValidation.month = false;
    }

    if (this.state.year.length < 2) {
      formValidation.year = false;
    }

    if (this.state.cvv.length < 3) {
      formValidation.cvv = false;
    }

    if (Object.values(formValidation).indexOf(false) === -1) {
      const order = {
        name: this.state.name.trim(),
        email: this.state.email,
        phone: this.state.phone,
        creditCard: this.state.creditCard,
        expirationDate: `${this.state.month}/${this.state.year}`,
        cvv: this.state.cvv,
        shippingAddress: `${this.state.address1.trim()} \n${this.state.address2} \n${this.state.city.trim()}, ${this.state.state} ${this.state.zipCode}`
      };
      this.props.onSubmit(order);
      this.setState({
        name: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        creditCard: '',
        month: '',
        year: '',
        cvv: '',
        success: true
      });
    } else {
      this.setState({
        name: this.state.name.trim(),
        address1: this.state.address1.trim(),
        city: this.state.city.trim(),
        formValidation: formValidation
      });
    }
  }

  render() {
    const price = this.props.cart.map(item => { return item.price; });
    const totalPrice = price.reduce((acc, cur) => acc + cur, 0);
    return this.state.success === false ? (
      <main className="d-flex justify-content-between main">
        <div className="col-8 checkout-form" >
          <div className="back-to-catalog-button mb-4" onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i><h6>Continue Shopping</h6></div>
          <h3>My cart</h3>
          <p className="mb-4 warning-color">Warning: This website is for demonstration purposes only.<br/>Please do not use real personal information such as names, addresses and credit card numbers for this checkout form.</p>
          <h5 className="cart-text-color mb-4">{`Order Total: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice / 100)}`}</h5>
          <form onSubmit={() => this.handleSubmit(event)}>
            <h5 className="mb-3">Shipping/Billing information</h5>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                value={this.state.name}
                onChange={() => this.handleChange(event)}
                minLength="2"
                type="text"
                name="name"
                className={`form-control ${this.state.formValidation.name ? '' : 'is-invalid'}`}/>
              <div className="invalid-feedback">
                <small>Not a valid name input</small>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="phone">Phone</label>
                <input
                  value={this.state.phone}
                  onChange={() => this.handleChange(event)}
                  type="tel"
                  name="phone"
                  className={`form-control ${this.state.formValidation.phone ? '' : 'is-invalid'}`}
                  minLength="10"
                  maxLength="11" />
                <div className="invalid-feedback">
                  <small>Missing or invalid phone number</small>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="email">Email</label>
                <input
                  value={this.state.email}
                  onChange={() => this.handleChange(event)}
                  type="email"
                  name="email"
                  className={`form-control ${this.state.formValidation.email ? '' : 'is-invalid'}`}
                  minLength="6"
                  maxLength="200" />
                <div className="invalid-feedback">
                  <small>Missing or invalid email address</small>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="address1">Address 1</label>
                <input
                  value={this.state.address1}
                  onChange={() => this.handleChange(event)}
                  type="text"
                  name="address1"
                  className={`form-control ${this.state.formValidation.address1 ? '' : 'is-invalid'}`} />
                <div className="invalid-feedback">
                  <small>Missing or invalid street address</small>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="address2">Address 2</label>
                <input
                  value={this.state.address2}
                  onChange={() => this.handleChange(event)}
                  type="text"
                  name="address2"
                  className="form-control"
                  placeholder="optional"/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="city">City</label>
                <input
                  value={this.state.city}
                  onChange={() => this.handleChange(event)}
                  type="text"
                  name="city"
                  className={`form-control ${this.state.formValidation.city ? '' : 'is-invalid'}`}
                  maxLength="50" />
                <div className="invalid-feedback">
                  <small>Missing or invalid city input</small>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="state">State</label>
                <select className={`form-control ${this.state.formValidation.state ? '' : 'is-invalid'}`}
                  name="state"
                  onChange={() => this.handleChange(event)}>
                  <option defaultValue hidden></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <div className="invalid-feedback">
                  <small>Select a state</small>
                </div>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="zipCode">Zipcode</label>
                <input
                  value={this.state.zipCode}
                  onChange={() => this.handleChange(event)}
                  type="tel"
                  name="zipCode"
                  className={`form-control ${this.state.formValidation.zipCode ? '' : 'is-invalid'}`}
                  minLength="5"
                  maxLength="5" />
                <div className="invalid-feedback">
                  <small>Missing or invalid zipcode.</small>
                </div>
              </div>
            </div>
            <h5 className="mt-3 mb-3">Payment Details</h5>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="creditCard">Credit Card Number</label>
                <input
                  value={this.state.creditCard}
                  onChange={() => this.handleChange(event)}
                  type="tel"
                  name="creditCard"
                  className={`form-control ${this.state.formValidation.creditCard ? '' : 'is-invalid'}`}
                  minLength="16"
                  maxLength="16"/>
                <div className="invalid-feedback">
                  <small>Missing or invalid credit card number.</small>
                </div>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="month">Month</label>
                <select className={`form-control ${this.state.formValidation.month ? '' : 'is-invalid'}`}
                  name="month"
                  onChange={() => this.handleChange(event)}>
                  <option defaultValue hidden></option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <div className="invalid-feedback">
                  <small>Select a month.</small>
                </div>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="year">Year</label>
                <select className={`form-control ${this.state.formValidation.year ? '' : 'is-invalid'}`}
                  name="year"
                  onChange={() => this.handleChange(event)}>
                  <option defaultValue hidden></option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
                <div className="invalid-feedback">
                  <small>Select a year.</small>
                </div>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="tel"
                  name="cvv"
                  className={`form-control ${this.state.formValidation.cvv ? '' : 'is-invalid'}`}
                  onChange={() => this.handleChange(event)}
                  value={this.state.cvv}
                  minLength="3"
                  maxLength="4" />
                <div className="invalid-feedback">
                  <small>Missing or invalid CVV.</small>
                </div>
              </div>
            </div>
            <button className="btn btn-outline-primary btn-color mt-3" type="submit">Place Order</button>
          </form>
        </div>
        <div className="col-4 ml-5 pr-0">
          <div className="checkout-list">
            {
              this.props.groupCartItem.map(item => {
                return (
                  <div key={item.productId} className="d-flex justify-content-between checkout-list-item m-4">
                    <img src={item.image} alt={item.name} className="col-md-5 detail-img" />
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                      <h6 className="fontsize-14">{item.name}</h6>
                      <h6 className="theme-color fontsize-14">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price / 100)}</h6>
                      <h6 className="theme-color fontsize-14">{`Quantity: ${item.quantity}`}</h6>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </main>
    ) : (
      <main className="main">
        <h3>Order status</h3>
        <h5 className="cart-text-color mt-3">Thank you for your order!</h5>
        <div className="back-to-catalog-button mt-3"
          onClick={() => this.props.setView('catalog', {})}><i className="fas fa-undo i-size"></i>
          <h6>Continue Shopping</h6></div>
      </main>
    );
  }
}

export default CheckoutForm;
