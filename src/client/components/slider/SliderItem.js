import React from "react";
import * as actionMoviedb from "../../redux/actions/moviedb";
import { useDispatch } from "react-redux";
import { BASE_URL_IMAGE } from "../../services/ApiMovieDb";

const SliderItem = ({ nameList, item, over, index, transformFn }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(actionMoviedb.setSelected(item.id, nameList))}
      onMouseOver={() => over.fn(index)}
      onMouseOut={() => over.fn(null)}
      className={'slideItem ' +  (over.key === index ? 'show' : '')}
      style={{ backgroundImage: `url(${BASE_URL_IMAGE + (item.backdrop_path ? item.backdrop_path : item.poster_path)})`, transform: transformFn(index)  }}
    >
      <div className={'fallback-text-container'}>
        <p>{(item.title)}</p>
        <p className='info'>{ item.year}</p>
      </div>

    </div>
  );
};

export default SliderItem;
