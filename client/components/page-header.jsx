import React from 'react';

function PageHeader(props) {
  const itemNumber = !props.cartItemCount ? 0 : props.cartItemCount;
  return (
    <div className="row col-12 header">
      <div className="website-title">
        <img src="/images/shopping-bag.png" alt="icon made by flaticon" className="icon"/>
        <div>CLOSET SALES</div>
      </div>
      <h5 className="cart-container">{`${itemNumber} items`}
        <i className="fas fa-shopping-cart" onClick={() => props.setView('cart', {})}></i></h5>
    </div>
  );
}

export default PageHeader;
