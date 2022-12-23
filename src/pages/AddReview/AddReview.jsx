import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header/Header';
import { FiDownload } from 'react-icons/fi';
import { RxCrossCircled } from 'react-icons/rx';
import debounce from 'lodash/debounce';
import { getAllTags } from '../../http/reviewsAPI';
import Typography from '../../components/Typography/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { changeImageTool } from '../../store/slices/addReviewSlice/addReview';
import SettingsTools from '../../components/SettingsTools/SettingsTools';

const AddReview = () => {
  const [drag, setDrag] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [previewCover, setPreviewCover] = useState('');
  const [previewReview, setPreviewReview] = useState([]);
  const [results, setResults] = useState([]);
  const inputEl = useRef(null);
  const inputTagRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const dispatch = useDispatch();
  const { toolType, menuVisibillity, tools } = useSelector((state) => state.addReview);
  const [imagesTool, setImagesTool] = useState([]);

  useEffect(() => {
    setImagesTool(tools.filter((tool) => tool.type === 'image'));
    console.log(imagesTool);
  }, [tools]);

  useEffect(() => {
    console.log(imagesTool);
  }, [imagesTool]);

  useEffect(() => {
    if (coverImage) {
      console.log(coverImage);
      if (coverImage && coverImage.type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewCover(reader.result);
        };
        reader.readAsDataURL(coverImage);
      }
    } else {
      setPreviewCover(null);
    }
  }, [coverImage]);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e, id) {
    e.preventDefault();
    const img = [...reviewImages];
    if (e.target.closest('.images-review')) {
      let file = e.dataTransfer.files;
      console.log(file);
      if (file[0].type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReviewImages([...reviewImages, { url: reader.result }]);
          dispatch(changeImageTool({ id, url: reader.result }));
        };
        reader.readAsDataURL(file[0]);
      }
      console.log(reviewImages);
    } else {
      let file = e.dataTransfer.files;
      console.log('else');
      console.log(file[0]);
      setCoverImage(file[0]);
    }
    setDrag(false);
  }

  const handleTintClick = useCallback(
    (value) => {
      inputEl.current.value = value;
    },
    [inputEl],
  );

  const handleInputChange = useMemo(
    () =>
      debounce((e) => {
        const { value } = e.target;
        if (value.length < 3) return;
        getAllTags(value).then((data) => {
          console.log(data);
          setResults(data);
        });
      }, 800),
    [],
  );

  const handleOnChange = (e) => {
    const { value } = e.target;
    setTag(value);
    if (value.includes(',')) {
      const separator = value.indexOf(',');
      const newTag = value.substring(0, separator);
      if (separator != value.length) {
        const remainder = value.substring(separator + 1, value.length);
        setTag(remainder);
      } else {
        setTag('');
      }
      setTags([...tags, newTag]);
    }
    handleInputChange(e);
  };

  const handleDelTag = (tag) => {
    setTags(tags.filter((item) => item != tag));
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-form">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select>
                <option>Кино</option>
                <option>Игры</option>
                <option>Книги</option>
                <option>Музыка</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Заголовок" />
            </Form.Group>
            <div className="editor">
              {tools.map((tool, id) => (
                <div className="selected_tool" tabIndex={0}>
                  {tool.type === 'text' && <div contentEditable={true} className="text"></div>}
                  {tool.type === 'header' && <h3 contentEditable={true} className="text"></h3>}
                  {tool.type === 'image' && (
                    <div className="image-tool">
                      {drag ? (
                        <div
                          onDrop={(e) => onDropHandler(e, id)}
                          onDragStart={(e) => dragStartHandler(e)}
                          onDragLeave={(e) => dragLeaveHandler(e)}
                          onDragOver={(e) => dragStartHandler(e)}
                          className="images-review drop-area"
                        >
                          Отпустите файлы, чтобы загрузить их
                        </div>
                      ) : (
                        <div
                          className="images-review download-area"
                          onDragStart={(e) => dragStartHandler(e)}
                          onDragLeave={(e) => dragLeaveHandler(e)}
                          onDragOver={(e) => dragStartHandler(e)}
                        >
                          {imagesTool.map((item, i) =>
                            item.url ? (
                              <div className="preview-images">
                                {item.id === tool.id ? <img src={item.url} /> : null}
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column',
                                  height: '100%',
                                }}
                              >
                                <FiDownload />
                                <p>Перетащите сюда изображение</p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  <SettingsTools id={tool.id} />
                </div>
              ))}
              <Typography />
            </div>

            <Form.Group className="mb-3 tags" controlId="formBasicEmail">
              <Form.Label>Теги</Form.Label>
              <div className="tagger-container">
                {tags.map((tag) => (
                  <span className="tagger-container__tag">
                    {tag}
                    <span className="cross">
                      <RxCrossCircled onClick={() => handleDelTag(tag)} />
                    </span>
                  </span>
                ))}

                <div
                  ref={inputTagRef}
                  className="tagger-container__tag tagger-container__tag--input"
                  data-value={tag}
                >
                  <Form.Control
                    onChange={(e) => handleOnChange(e)}
                    ref={inputEl}
                    type="text"
                    placeholder="Enter tag"
                    list="tags"
                    value={tag}
                    autoComplete="off"
                  />
                </div>
              </div>
              <Form.Text>Введите теги используя запятую.</Form.Text>
            </Form.Group>

            {results.length > 0 && (
              <datalist id="tags">
                {results.map((result, i) => (
                  <option onClick={() => handleTintClick(result.title)} key={result.id}>
                    {result.title}
                  </option>
                ))}
              </datalist>
            )}

            <h5 style={{ marginBottom: '15px' }}>Загрузите обложку</h5>

            {drag ? (
              <div
                onDrop={(e) => onDropHandler(e)}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                className="cover drop-area"
              >
                Отпустите файлы, чтобы загрузить их
              </div>
            ) : (
              <div
                className={coverImage ? 'cover_image' : 'cover download-area'}
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
              >
                {coverImage ? (
                  <div className="preview-cover">
                    <img src={previewCover} />
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <FiDownload />
                    <p>Перетащите сюда изображение</p>
                  </div>
                )}
              </div>
            )}

            <Button variant="outline-success">Publish</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddReview;
