import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../asset/js/slick-custom';
import ImageCustom from '../../../commons/Layouts/Image';
import {NotFoundSlider} from '../../../../asset/images/notfound';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Skeleton } from 'primereact/skeleton';
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper';
import './style.css';

const Slider = ({ slider, isLoadingSlider }) => {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination, Mousewheel]}
        className="mySwiper"
      >
        {!isLoadingSlider ? (
          slider.length > 0 ? (
            slider.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="slider-homepage">
                  <Link to="/product">
                    <img src={item.image} alt="PHOTO" style={{ objectFit: 'cover' }} />
                    <summary>
                      <h2 className="description-homepage" dangerouslySetInnerHTML={{ __html: item.description }}></h2>
                      <h1 className="name-homepage">{item.name}</h1>
                      <button className="button-homepage">Shop now</button>
                    </summary>
                  </Link>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <ImageCustom src={NotFoundSlider} className="w-100" style={{ height: '75vh', objectFit: 'fill' }} />
          )
        ) : (
          <Skeleton width="100%" height="75vh"></Skeleton>
        )}
      </Swiper>
    </>
  );
};

export default Slider;
