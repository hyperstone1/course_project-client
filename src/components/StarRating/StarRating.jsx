import React, { useState, useEffect } from 'react';
import './index.scss';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setRating } from '../../store/slices/addReviewSlice/addReview';
const StarRating = () => {
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.addReview);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      <div className="rating">
        {[...Array(10)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => dispatch(setRating({ rating: index }))}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              onDoubleClick={() => {
                dispatch(setRating({ rating: 0 }));
                setHover(0);
              }}
            >
              <AiFillStar />
            </button>
          );
        })}
      </div>
      {rating > 0 && <div className="rating_number">{rating}</div>}
    </div>
  );
};

export default StarRating;
