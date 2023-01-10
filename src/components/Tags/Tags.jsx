import React, { useState, useEffect } from 'react';
import { getAllTags } from '../../http/reviewsAPI';
import './index.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Tags = () => {
  const lang = useSelector((state) => state.header.language);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTags = async () => {
      const data = await getAllTags();
      console.log(data);
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleClickTag = (tag) => {
    navigate(`/tag/${tag}`);
  };

  return tags.length > 0 ? (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>{lang === 'eng' ? 'Tags' : 'Теги'}</h2>
      <div className="tags_container">
        {tags.map((item) => (
          <span className="tag" onClick={() => handleClickTag(item.tag)}>
            {item.tag}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};

export default Tags;
