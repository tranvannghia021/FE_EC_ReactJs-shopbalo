import React, { useState } from 'react';
import StarRatings from 'react-star-ratings/build/star-ratings';
import ReviewItem from '../ReviewItem';
import './index.css';
import ImageCustom from '../../../commons/Layouts/Image';
function ReviewProduct({ list_review, averageRating = 5 }) {
  // console.log(list_review);
  const [pointRatings, setPointRatings] = useState(5);
  const [imgUploadReview, setImgUploadReview] = useState(false);
  const uploadImage = (e) => {
    let image = e.target.files[0];
    if (e.target.files.length > 0) {
      setImgUploadReview(URL.createObjectURL(image));
    }
  };
  return (
    <div className="tab01">
      <div className="nav-item p-b-10 fw-bolder d-flex">
        <div className="stext-101 m-auto">Reviews: {!!list_review && list_review.length}</div>
        <br />
        <div className="m-auto">
          <StarRatings
            rating={parseInt(averageRating)}
            starRatedColor="rgb(252,202,25)"
            starDimension="20px"
            starSpacing="3px"
          />
          {averageRating}/5
        </div>
      </div>

      <div className="tab-content p-t-43">
        <div className="tab-pane fade active show" id="reviews" role="tabpanel">
          <div className="row">
            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
              <div className="p-b-30 m-lr-15-sm">
                {!!list_review &&
                  list_review.map((item) => (
                    <ReviewItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      avatar={item.avatar}
                      point={item.point}
                      image={item.image}
                      comment={item.comment}
                    />
                  ))}
                {/*<form className="w-full">*/}
                {/*  <h5 className="mtext-108 cl2 p-b-7">*/}
                {/*    Add a review*/}
                {/*  </h5>*/}

                {/*  <p className="stext-102 cl6">*/}
                {/*    Your email address will not be published. Required fields are marked **/}
                {/*  </p>*/}

                {/*  <div className="flex-w flex-m p-t-50 p-b-23">*/}
                {/*				<span className="stext-102 cl3 m-r-16">*/}
                {/*					Your Rating*/}
                {/*				</span>*/}
                {/*    <StarRatings*/}

                {/*      rating={pointRatings}*/}
                {/*      changeRating={setPointRatings}*/}
                {/*      starRatedColor='rgb(252,202,25)'*/}
                {/*      starDimension="20px"*/}
                {/*      starSpacing="3px"*/}
                {/*    />*/}
                {/*  </div>*/}

                {/*  <div className="row p-b-25">*/}
                {/*    <div className="col-12 p-b-5">*/}
                {/*      <label className="stext-102 cl3" htmlFor="review">Your review</label>*/}
                {/*      <textarea className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10" id="review"*/}
                {/*                name="review"></textarea>*/}
                {/*    </div>*/}

                {/*    <div className="col-sm-10 col-md-12 p-b-5 ">*/}
                {/*      <label className="stext-102 cl3" htmlFor="name">Image</label>*/}
                {/*      <input className=" stext-102 cl2 "  type="file" onChange={e=>uploadImage(e)}/>*/}
                {/*      {imgUploadReview &&*/}
                {/*        <div className=" p-b-5 d-flex img-upload-review ">*/}
                {/*          <ImageCustom className=" img" src={imgUploadReview} alt={'image review product'} />*/}
                {/*        </div>}*/}
                {/*    </div>*/}

                {/*  </div>*/}

                {/*  <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">*/}
                {/*    Submit*/}
                {/*  </button>*/}
                {/*</form>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
