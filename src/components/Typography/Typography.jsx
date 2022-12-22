import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import './index.scss';
import { RxText } from 'react-icons/rx';
import { BiHeading } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import {
  setToolType,
  setMenuVisibillity,
  setTools,
} from '../../store/slices/addReviewSlice/addReview';
import { useDispatch, useSelector } from 'react-redux';

const Typography = () => {
  // const [selectedValue, setSelectedValue] = useState('text');
  const [plus, setPlus] = useState(false);
  const dispatch = useDispatch();
  const { toolType, menuVisibillity, tools } = useSelector((state) => state.addReview);

  const handleClickPlus = () => {
    setPlus(!plus);
  };

  const handleSelectTool = (tool) => {
    console.log(toolType);
    dispatch(setTools(tool));
    setPlus(false);
  };

  return (
    <div className="typography">
      {menuVisibillity && (
        <div className={plus ? 'plus opened' : 'plus closed'}>
          <BsPlusLg style={{ width: '16px', height: '16px' }} onClick={handleClickPlus} />
        </div>
      )}

      {plus && (
        <div className="toolbox">
          <li onClick={() => handleSelectTool('text')}>
            <RxText />
            <span>Текст</span>
          </li>
          <li onClick={() => handleSelectTool('header')}>
            <BiHeading />
            <span>Заголовок</span>
          </li>
          <li onClick={() => handleSelectTool('image')}>
            <BsImage />
            <span>Изображение</span>
          </li>
        </div>
      )}
    </div>
  );
};

export default Typography;