import React from 'react';
import StarRatings from 'react-star-ratings/build/star-ratings';
import ImageCustom from '../../../commons/Layouts/Image';

function ReviewItem({ id, name, avatar, point = 5, comment, image }) {
  return (
    <div className="flex-w flex-t p-b-68 bor12 pt-2">
      <div className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
        <ImageCustom src={avatar} alt="AVATAR" className="bor bor0 shadow" />
      </div>

      <div className="size-207">
        <div className="flex-w flex-sb-m p-b-17">
          <span className="mtext-107 cl2 p-r-20">{name}</span>

          <span className="fs-18 cl11">
            <StarRatings
              rating={parseInt(point)}
              starRatedColor="rgb(252,202,25)"
              starDimension="20px"
              starSpacing="3px"
            />
          </span>
        </div>

        <p className="stext-102 cl6">{comment}</p>
        <div className="">
          <ImageCustom src={image} className="w-25 bor4 mt-2" />
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
