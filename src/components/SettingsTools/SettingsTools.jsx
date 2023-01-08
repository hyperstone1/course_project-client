import React, { useState, useEffect, useRef } from 'react';
import { RxText } from 'react-icons/rx';
import { BiHeading } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { BsImage } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import {
  setCounterId,
  addHeaders,
  addText,
  changeTool,
  changeImageTool,
  deleteTool,
  deleteHeader,
  deleteText,
  deleteUrlImage,
} from '../../store/slices/addReviewSlice/addReview';

import { useDispatch, useSelector } from 'react-redux';
import './index.scss';

const SettingsTools = ({ type, id, imagesTool, setImagesTool }) => {
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
    console.log(id);
  };

  const handleSelectTool = (tool) => {
    console.log(id, type);
    if ((type === 'header' && tool === 'text') || tool === 'image') {
      dispatch(deleteHeader({ id }));
      dispatch(addText({ id, text: '' }));
    }
    if ((type === 'text' && tool === 'header') || tool === 'image') {
      dispatch(deleteText({ id }));
      dispatch(addHeaders({ id, header: '' }));
    }
    if (type === 'image' && tool !== 'image') {
      dispatch(deleteUrlImage({ id }));
    }
    if (tool === 'image') {
      dispatch(changeImageTool({ id, url: null }));
    }
    dispatch(changeTool({ id, tool }));
    setSettings(false);
  };
  const handleDeleteTool = () => {
    console.log(id);
    dispatch(deleteTool({ id }));
    dispatch(deleteHeader({ id }));
    dispatch(deleteText({ id }));
    setImagesTool(imagesTool.filter((item) => item.id !== id));
    dispatch(setCounterId({ id }));
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
