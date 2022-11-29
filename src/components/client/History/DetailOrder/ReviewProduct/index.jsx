import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import StarRatings from 'react-star-ratings/build/star-ratings';
import { Controller, useForm, useWatch } from 'react-hook-form';
import './index.css';
import { BlockUI, BlockUICLIENT } from '../../../../commons/Layouts/Notiflix';
import Notiflix from 'notiflix';
import { addRattingProduct } from '../../../../../api/Client/Raing/ratingAPI';
import { ErrorToast, SuccessToast } from '../../../../commons/Layouts/Alerts';
function ReviewProductItem(props) {
  // console.log(list_review);
  const [pointRatings, setPointRatings] = useState(5);
  const [imgUploadReview, setImgUploadReview] = useState(false);
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImgUploadReview(URL.createObjectURL(image));
    }
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm({
    mode: 'onChange',
  });
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const onSubmit = async (data) => {
    BlockUICLIENT('#root', 'fixed');
    const image = await toBase64(data.image[0]);
    const resultData = {
      customer_id: props.dataDetailRV,
      product_id: props.dataCustomer,
      point: pointRatings,
      content: data.review,
      image: image,
    };
    const result = await addRattingProduct(resultData);
    Notiflix.Block.remove('#root');
    if (result.status === 200) {
      SuccessToast('Review product successfully', 5000);
    } else if (result === 404) {
      ErrorToast('Review product unsuccessfully', 3000);
      Notiflix.Block.remove('#root');
    } else if (result === 401) {
      Notiflix.Block.remove('#root');
    } else {
      Notiflix.Block.remove('#root');
      ErrorToast('Something went wrong. Please try again', 3000);
    }
  };
  return (
    <div className="tab01">
      <div className="tab-content">
        <div className="tab-pane fade active show" id="reviews" role="tabpanel">
          <div className="row">
            <div className="p-5">
              <div className="p-b-30 m-lr-15-sm">
                <Form
                  className="font_checkout text-black w-full"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h5 className="mtext-108 cl2 p-b-7">Add a review</h5>
                  <p className="stext-102 cl6">
                    Your email address will not be published. Required fields are marked *
                  </p>

                  <div className="flex-w flex-m p-t-50 p-b-23">
                    <span className="stext-102 cl3 m-r-16">Your Rating</span>
                    <StarRatings
                      rating={parseInt(pointRatings)}
                      changeRating={setPointRatings}
                      starRatedColor="rgb(252,202,25)"
                      starDimension="20px"
                      starSpacing="3px"
                    />
                  </div>

                  <div className="row p-b-25">
                    <div className="col-12 p-b-5">
                      <label className="stext-102 cl3" htmlFor="review">
                        Your review
                      </label>
                      <textarea
                        className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                        id="review"
                        name="review"
                        {...register('review')}
                      ></textarea>
                    </div>

                    <div className="col-sm-10 col-md-12 p-b-5 ">
                      <label className="stext-102 cl3" htmlFor="name">
                        Image
                      </label>
                      <input
                        className=" stext-102 cl2 "
                        type="file"
                        onChange={(e) => uploadImage(e)}
                        {...register('image')}
                      />
                      {imgUploadReview && (
                        <div className=" p-b-5 d-flex img-upload-review ">
                          <img className=" img" src={imgUploadReview} alt={'image review product'} name="image" />
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewProductItem;
