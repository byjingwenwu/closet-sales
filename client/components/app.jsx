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
      view: { name: 'catalog', params: {} }
    };
    this.setView = this.setView.bind(this);
  }

  setView(viewName, viewParams) {
    this.setState({ view: { name: viewName, params: viewParams } });
  }

  render() {
    return this.state.view.name === 'catalog' ? (
      <>
        <PageHeader />
        <ProductList setView={this.setView} />
      </>
    )
      : (
        <>
          <PageHeader />
          <ProductDetails productId={this.state.view.params.productId} setView={this.setView}/>
        </>
      );
  }
}
