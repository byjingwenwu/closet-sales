import React from 'react';

class AcceptModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleAccept() {
    this.props.handleAcceptCheck(true);
  }

  render() {
    return (
      <div className="start-modal">
        <div className="modal-content d-flex flex-column align-items-center justify-content-center">
          <h3 className="theme-color mb-3">Terms of Service</h3>
          <p className="text-center mb-3">Closet Sales was created strictly for demonstration purposes. By clicking the button below, you accept that no purchases will be made, no payment processing will be done, and personal information such as names, addresses, or credit card numbers should not be used in checkout.</p>
          <button className="btn btn-outline-primary btn-color" onClick={this.handleAccept}>Accept</button>
        </div>
      </div>
    );
  }
}

export default AcceptModal;
