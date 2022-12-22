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
import { setMenuVisibillity } from '../../store/slices/addReviewSlice/addReview';
import SettingsTools from '../../components/SettingsTools/SettingsTools';

const AddReview = () => {
  const [drag, setDrag] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [preview, setPreview] = useState('');
  const [results, setResults] = useState([]);
  const inputEl = useRef(null);
  const inputTagRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const dispatch = useDispatch();
  const { toolType, menuVisibillity, tools } = useSelector((state) => state.addReview);

  useEffect(() => {
    if (coverImage) {
      console.log(coverImage);
      if (coverImage && coverImage.type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(coverImage);
      }
    } else {
      setPreview(null);
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

  function onDropHandler(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    const img = [...reviewImages];
    if (e.target.closest('.images-review')) {
      files.map((file) => img.push(file));
      setReviewImages(img);
      console.log('if');
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

  const handleClickEditArea = () => {
    dispatch(setMenuVisibillity({ menuVisibillity: true }));
  };
  const handleMouseDownEditArea = () => {
    dispatch(setMenuVisibillity({ menuVisibillity: false }));
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
                  {tool === 'text' && <div contentEditable={true} className="text"></div>}
                  {tool === 'header' && <h3 contentEditable={true} className="text"></h3>}
                  {tool === 'image' && (
                    <div className="image-tool">
                      {drag ? (
                        <div
                          onDrop={(e) => onDropHandler(e)}
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
                          <FiDownload />
                          Перетащите файлы, чтобы загрузить их
                        </div>
                      )}
                      {reviewImages && (
                        <div className="images">
                          {reviewImages.map((image) => (
                            <div className="image">
                              <div>{image.name}</div>
                              <RxCrossCircled />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <SettingsTools id={id}/>
                </div>
              ))}
              <Typography />
            </div>

            {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Загрузите изображение</Form.Label>
              <Form.Control type="file" />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Напишите текст вашей рецензии</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
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
              <Form.Label>Введите теги используя запятую.</Form.Label>
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
                className="cover download-area"
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
              >
                {coverImage ? (
                  <div className="preview-cover">
                    <img src={preview} />
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
