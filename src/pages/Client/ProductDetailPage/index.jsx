import React, { useEffect, useState } from 'react';
import Gallery from '../../../components/client/ProductDetail/Gallery';
import InfoProduct from '../../../components/client/ProductDetail/InfoProduct';
import ReviewProduct from '../../../components/client/ProductDetail/ReviewProduct';
import RelateProduct from '../../../components/client/ProductDetail/RelateProduct';
import './index.css';
import '../../../css/main_client.css';
import '../../../css/util_client.css';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getDetailProductById, getRelateProducts } from '../../../api/Client/Home/productDetailAPI';
import { getStorageImage } from '../../../api/StorageImage';
import { getRatingWithProductID } from '../../../api/Client/Raing/ratingAPI';
import { SkeletonProductDetail } from '../../../components/commons/Layouts/Skeleton/SkeletonProductDetail';

function ProductDetailPage(props) {
  const [loadingProductAndReview, setLoadingProductAndReview] = useState(true);
  const [productDetail, setProductDetail] = useState({});
  const [listRating, setListRating] = useState([]);
  const [averageRating, setAverageRating] = useState(5);
  const [listRelateProducts, setListRelateProducts] = useState([]);
  const [idCategory, setIdCategory] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const handleGetInfoDetailProduct = async (id) => {
      const result = await getDetailProductById(id);
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
          let product = result.data.reduce(item => item)
          setProductDetail(product);
          setIdCategory(product.category_id);

      }
    };
    const handleGetInfoReviewProduct = async (id) => {
      const result = await getRatingWithProductID(id);
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        let rating = result.data.map((item) => ({
          id: item.id,
          name: `${item.customers.first_name} ${item.customers.last_name}`,
          avatar: item.customers.avatar,
          point: item.point,
          comment: item.content,
          image: item.image,
          date: item.created_date,
        }));
        setListRating(rating);
        let avr = rating.reduce((acc, item) => acc + item.point, 0) / rating.length;
        setAverageRating(!!avr ? avr : 5);
      }
    };
    //1 lỗi
    const handleGetRalateProducts = async (id) => {
      const result = await getRelateProducts(id);
      if (result === 401) {
        return false;
      } else if (result === 500) {
        return false;
      } else {
        let relateProducts = result.data.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image, // getURLImageProduct('Product?cat=' + item.image),
          price: item.price,
          ratings: item.ratings,

        }));
        setListRelateProducts(relateProducts);
      }
    };
    handleGetInfoDetailProduct(id);
    handleGetInfoReviewProduct(id);

    handleGetRalateProducts(idCategory);
    return () => {
      setLoadingProductAndReview(false);
    };
  }, [id, idCategory]);
  return (
    <>
      {/*-------------------------------------DetailProduct--------------------------------*/}
      {!loadingProductAndReview ? (
        <>
          <section className="sec-product-detail bg0 p-t-65 p-b-60">
            <div className="container">
              <div className="row">
                <Col md="6" lg="7">
                  <Gallery listImage={productDetail.image_slide.split(',')} mainImage={productDetail.image} />
                </Col>
                <Col md="6" lg="5">
                  <InfoProduct
                    id={id}
                    price={productDetail.price}
                    description={productDetail.description}
                    star={productDetail.ratings}
                    name={productDetail.name}
                    color={productDetail.code_color}
                    amount={productDetail.amount}
                    image={productDetail.image}
                  />
                </Col>
              </div>

              <div className="bor10 m-t-50 p-t-43 p-b-40">
                <ReviewProduct list_review={listRating} averageRating={averageRating} />
              </div>
            </div>
          </section>
          <section className="sec-relate-product bg0 p-t-45 p-b-105">
            <RelateProduct listRelateProducts={listRelateProducts} />
          </section>
        </>
      ) : (
        <SkeletonProductDetail />
      )}
      {/*-------------------------------------RelateProduct--------------------------------*/}
    </>
  );
}

export default ProductDetailPage;
