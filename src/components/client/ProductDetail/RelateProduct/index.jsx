import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import ProductItem from '../../Home/Product/ProductItem';

function RelateProduct({ listRelateProducts }) {
  return (
    <div className="container">
      <div className="p-b-45">
        <h3 className="ltext-106 cl5 txt-center">
          Related Products
        </h3>
      </div>


      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={4}
       // loop={true}
        // loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {listRelateProducts !== undefined &&
          listRelateProducts.length > 0 &&
          listRelateProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default RelateProduct;