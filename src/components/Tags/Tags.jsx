import React, { useState, useEffect } from 'react';
import { getAllTags } from '../../http/reviewsAPI';
import './index.scss';

const Tags = () => {
  const [tags, setTags] = useState();
  useEffect(() => {
    const fetchTags = async () => {
      const data = await getAllTags();
      console.log(data);
      setTags(data);
    };
    fetchTags();
  }, []);

  return tags ? (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>Tags</h2>
      <div className="tags_container">
        {tags.map((item) => (
          <span className="tag">{item.tag}</span>
        ))}
      </div>
    </div>
  ) : null;
};

export default Tags;
