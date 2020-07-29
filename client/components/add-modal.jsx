import React from 'react';

function AddModal(props) {
  return (
    <div className="start-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title theme-color">New Item Added</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"
            onClick={props.toggleModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p className="text-center m-3">You have added {props.product.name} to your cart</p>
        </div>
        <div className="modal-footer justify-content-center">
          <button className="btn btn-outline-primary btn-color mt-3"
            onClick={() => props.setView('catalog', {})}>Continue Shoppping</button>
          <button className="btn btn-outline-primary btn-color ml-4 mt-3"
            onClick={() => props.setView('cart', {})}>View Cart</button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
