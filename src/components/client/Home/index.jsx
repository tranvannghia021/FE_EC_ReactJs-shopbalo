import React from 'react';
import SkeletonProductList from '../../commons/Layouts/Skeleton/SkeletonProductList';
import ProductList from './Product/ProductList';

const ContentHome = ({ isLoadingProduct, dataNewArrive, dataBestSale, dataOverview }) => {
  return (
    <>
      {!isLoadingProduct ? (
        <Product title={'New Arrives'} item={dataNewArrive} />
      ) : (
        <SkeletonProductList quantity={4} />
      )}
      {!isLoadingProduct ? (
        dataBestSale.length > 0 ? (
          <Product title={'Best Seller'} item={dataBestSale} />
        ) : (
          <Product title={'Best Seller'} item={dataNewArrive} />
        )
      ) : (
        <SkeletonProductList quantity={4} />
      )}
      {!isLoadingProduct ? (
        <Product title={'Product Overview'} item={dataOverview} />
      ) : (
        <SkeletonProductList quantity={4} />
      )}
    </>
  );
};

const Product = ({ title, item }) => {
  return (
    <section className="bg0 p-t-23 p-b-140">
      <div className="container">
        <div className="p-b-10 txt-center mb-5">
          <h3 className="ltext-103 cl5">{title}</h3>
        </div>

        <ProductList item={item} />
      </div>
    </section>
  );
};

export default ContentHome;
