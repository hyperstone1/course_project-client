import React, { useState, useEffect, useRef } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import './index.scss';
import { RxText } from 'react-icons/rx';
import { BiHeading } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';
import { setTools } from '../../store/slices/addReviewSlice/addReview';
import { useDispatch, useSelector } from 'react-redux';

const Typography = () => {
  const [plus, setPlus] = useState(false);
  const dispatch = useDispatch();
  const { toolType } = useSelector((state) => state.addReview);
  const [idCounter, setIdCounter] = useState(0);
  const rootEl = useRef(null);

  const handleClickPlus = () => {
    setPlus(!plus);
  };

  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setPlus(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleSelectTool = (tool) => {
    console.log(toolType);
    if (tool === 'image') {
      dispatch(setTools({ id: idCounter, type: tool, url: null }));
    } else {
      dispatch(setTools({ id: idCounter, type: tool }));
    }
    setIdCounter(idCounter + 1);
    setPlus(false);
  };

  return (
    <div ref={rootEl} className="typography">
      <div onClick={handleClickPlus} className="add_tool">
        <div className={plus ? 'plus opened' : 'plus closed'}>
          <BsPlusLg style={{ width: '16px', height: '16px' }} />
        </div>
        <span style={{ marginLeft: '5px' }}>Add tool</span>
      </div>

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
