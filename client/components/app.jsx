import React from 'react';
import PageHeader from './page-header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  render() {
    return (
      <>
        <PageHeader/>
        <ProductList/>
      </>
    );
  }
}
