import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import './index.scss';
import { RxText } from 'react-icons/rx';
import { BiHeading } from 'react-icons/bi';
import { BsImage } from 'react-icons/bs';

const Typography = () => {
  const [selectedValue, setSelectedValue] = useState('text');
  const [plus, setPlus] = useState(false);

  const handleClickPlus = () => {
    setPlus(!plus);
  };

  const handleSelectTool = (tool, e) => {
    console.log(e);
    setSelectedValue(tool);
  };

  return (
    <div className="typography">
      <div className={plus ? 'plus opened' : 'plus closed'}>
        <BsPlusLg style={{ width: '16px', height: '16px' }} onClick={handleClickPlus} />
      </div>

      <div className="selected_tool">
      {selectedValue === 'text' && (
          <div contentEditable={true} className='text'></div>
        )}
        {selectedValue === 'header' && (
          <h3 contentEditable={true} className='text'></h3>
        )}

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
