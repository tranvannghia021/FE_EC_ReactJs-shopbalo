import React from 'react';
import Shop from '../../../components/client/Shop';
export function ProductPage(props) {
  return (
    <section>
      <div className="container-fluid mt-5">
        {/* <h5 className="text-danger font-weight-bold mb-3">Product Page</h5> */}
        <Shop />
      </div>
    </section>
  );
}
