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

const AddReview = () => {
  const [drag, setDrag] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [preview, setPreview] = useState('');
  const [results, setResults] = useState([]);
  const inputEl = useRef(null);
  const inputTagRef = useRef(null);
  const [width, setWidth] = useState(8);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

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

  const keyDownTag = (e) => {
    if (inputTagRef) {
      const input = inputTagRef.current;
      console.log(e.target.offsetWidth);
      // input.style.width = (e.target.offsetWidth + 1) * 8 + 'px';
    }
  };

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
    console.log(e.dataTransfer.getData('url'));
    // const formData = new FormData();
    const img = [...reviewImages];
    console.log(e.target.className);
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
    // if (value.length > 8) {
    //   setWidth((value.length + 1) * 8 + 'px');
    // } else {
    //   setWidth(8);
    // }
    if (value.includes(',')) {
      const separator = value.indexOf(',');
      const newTag = value.substring(0, separator);
      if (separator != value.length) {
        const remainder = value.substring(separator + 1, value.length);
        console.log(remainder);
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

            <Typography />

            {/* <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Загрузите изображение</Form.Label>
              <Form.Control type="file" />
            </Form.Group> */}
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
