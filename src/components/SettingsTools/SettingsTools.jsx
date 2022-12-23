import React, { useState, useEffect, useRef } from 'react';
import { RxText } from 'react-icons/rx';
import { BiHeading } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { BsImage } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { changeTool, deleteTool } from '../../store/slices/addReviewSlice/addReview';

import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const SettingsTools = ({ id }) => {
  const [settings, setSettings] = useState(false);
  const dispatch = useDispatch();
  const { toolType } = useSelector((state) => state.addReview);
  const rootEl = useRef(null);

  useEffect(() => {
    const onClick = (e) => rootEl.current.contains(e.target) || setSettings(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const handleClickSettings = () => {
    setSettings(!settings);
  };

  const handleSelectTool = (tool) => {
    console.log(toolType);
    dispatch(changeTool({ id, tool }));
    setSettings(false);
  };
  const handleDeleteTool = () => {
    console.log(id);
    dispatch(deleteTool({ id }));
    setSettings(false);
  };

  return (
    <div ref={rootEl} className="settings">
      <div className={settings ? 'plus opened' : 'plus closed'}>
        <IoMdSettings style={{ width: '16px', height: '16px' }} onClick={handleClickSettings} />
      </div>

      {settings && (
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
          <li onClick={() => handleDeleteTool()}>
            <MdDeleteForever />
            <span>Удалить</span>
          </li>
        </div>
      )}
    </div>
  );
};

export default SettingsTools;
