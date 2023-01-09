import React from 'react';
import './index.scss';
import { AiFillStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setRating, setHover } from '../../store/slices/reviewSlice/review';
const StarRating = () => {
  const dispatch = useDispatch();
  const { rating, hoverRating, existRating, typeRating } = useSelector((state) => state.review);

  const handleSetRating = (index) => {
    dispatch(setRating({ rating: index }));
    dispatch(setHover(index));
  };
  const handleMouseLeave = () => {
    if (rating) {
      dispatch(setHover(rating));
    } else {
      dispatch(setHover(existRating));
    }
  };

  return (
    <div className="star-rating">
      <div className="rating">
        {typeRating === 'user'
          ? [...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hoverRating || rating) ? 'on' : 'off'}
                  onClick={() => handleSetRating(index)}
                  onMouseEnter={() => dispatch(setHover(index))}
                  onMouseLeave={handleMouseLeave}
                  onDoubleClick={() => {
                    dispatch(setRating({ rating: 0 }));
                    dispatch(setHover(0));
                  }}
                >
                  <AiFillStar />
                </button>
              );
            })
          : [...Array(10)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hoverRating || rating) ? 'on' : 'off'}
                  onClick={() => handleSetRating(index)}
                  onMouseEnter={() => dispatch(setHover(index))}
                  onMouseLeave={handleMouseLeave}
                  onDoubleClick={() => {
                    dispatch(setRating({ rating: 0 }));
                    dispatch(setHover(0));
                  }}
                >
                  <AiFillStar />
                </button>
              );
            })}
      </div>
      {rating > 0 ? (
        <div className="rating_number">{rating}</div>
      ) : existRating > 0 ? (
        <div className="rating_number">{existRating}</div>
      ) : null}
    </div>
  );
};

export default StarRating;
