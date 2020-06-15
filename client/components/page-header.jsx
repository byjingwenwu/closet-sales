import React from 'react';

function PageHeader(props) {
  const itemNumber = !props.cartItemCount ? 0 : props.cartItemCount;
  return (
    <div className="row col-12 header">
      <div className="website-title">
        <i className="fas fa-dollar-sign"></i>
        <div>WICKED SALES</div>
      </div>
      <h6 className="cart-container">{`${itemNumber} items`}
        <i className="fas fa-shopping-cart" onClick={() => props.setView('cart', {})}></i></h6>
    </div>
  );
}

export default PageHeader;
