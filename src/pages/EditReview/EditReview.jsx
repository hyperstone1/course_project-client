import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FiDownload } from 'react-icons/fi';
import { RxCrossCircled } from 'react-icons/rx';
import debounce from 'lodash/debounce';
import { getAllTags } from '../../http/reviewsAPI';
import Typography from '../../components/Typography/Typography';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeImageTool,
  addHeaders,
  editHeader,
  addText,
  editText,
  setTools,
  clearReviewState,
  setCounterId,
} from '../../store/slices/addReviewSlice/addReview';
import SettingsTools from '../../components/SettingsTools/SettingsTools';
import StarRating from '../../components/StarRating/StarRating';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { getReview, updateReview } from '../../http/reviewsAPI';
import { useParams, useNavigate } from 'react-router-dom';
import {
  setTypeRating,
  setExistRating,
  clearRating,
  setHover,
} from '../../store/slices/reviewSlice/review';

const EditReview = ({ edit, setEdit }) => {
  const [drag, setDrag] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [previewCover, setPreviewCover] = useState('');
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState('');
  const [reviewType, setReviewType] = useState('Movies');

  const [bufferImgs, setBufferImgs] = useState([]);
  const [bufferCover, setBufferCover] = useState();

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const [header, setHeader] = useState('');

  const [text, setText] = useState('');
  const [imagesTool, setImagesTool] = useState([]);
  const [review, setReview] = useState([]);

  const inputEl = useRef(null);
  const inputTagRef = useRef(null);
  const headerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tools, headers, texts } = useSelector((state) => state.addReview);
  const { token } = useSelector((state) => state.user);
  const { rating, existRating } = useSelector((state) => state.review);

  const userId = useSelector((state) => state.user.id);
  const [content, setContent] = useState();
  const [path, setPath] = useState('');
  const params = useParams();
  const reviewId = params.id;
  const lang = useSelector((state) => state.header.language);


  useEffect(() => {
    setImagesTool(tools.filter((tool) => tool.type === 'image'));
  }, [tools]);

  useEffect(() => {
    const fetchReview = async () => {
      const { data, reviewsContent } = await getReview(reviewId);
      console.log(data);
      setReview(data[0]);
      setTitle(data[0].title);
      setReviewType(data[0].type);
      console.log(data[0].coverURL);
      setPreviewCover(data[0].coverURL);
      setCoverImage(data[0].coverURL);
      setTags(data[0].tags);
      dispatch(setExistRating({ rating: data[0].rating }));
      dispatch(setHover(data[0].rating));

      await reviewsContent.map((item) => {
        if (item.type === 'text') {
          // texts.push({ id: item.id, text: item.text });
          dispatch(addText({ id: item.id, text: item.text }));
        }
        if (item.type === 'header') {
          dispatch(addHeaders({ id: item.id, header: item.header }));
        }
        dispatch(setTools({ id: item.id, type: item.type, url: item.url }));
        dispatch(setCounterId());
      });
      setContent(reviewsContent);
    };
    dispatch(setTypeRating('author'));

    fetchReview();
  }, []);

  useEffect(() => {
    const lastTool = tools[tools.length - 1];
    if (tools.length > 0 && lastTool.type === 'header') {
      const isLastHeader = headers.filter((item) => item.id === lastTool.id);
      console.log(isLastHeader);
      if (isLastHeader.length === 0) {
        dispatch(addHeaders({ id: lastTool.id, header }));
        setHeader('');
      }
    }
  }, [tools]);

  useEffect(() => {
    const lastTool = tools[tools.length - 1];
    if (tools.length > 0 && lastTool.type === 'text') {
      const isLastText = texts.filter((item) => item.id === lastTool.id);
      console.log(isLastText);
      if (isLastText.length === 0) {
        dispatch(addText({ id: lastTool.id, text }));
        setText('');
      }
    }
  }, [tools]);

  // useEffect(() => {
  //   if (coverImage) {
  //     console.log(coverImage);
  //     if (coverImage.type.substr(0, 5) === 'image') {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPreviewCover(reader.result);
  //       };
  //       reader.readAsDataURL(coverImage);
  //     }
  //   } else {
  //     setPreviewCover(null);
  //   }
  // }, [coverImage]);

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
    if (e.target.closest('.images-review')) {
      let file = e.dataTransfer.files;
      if (file[0].type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReviewImages([...reviewImages, { url: reader.result }]);
          dispatch(changeImageTool({ id, url: reader.result }));
        };
        reader.readAsDataURL(file[0]);
        bufferImage(id, file[0]);
      }
    } else {
      console.log('preview-image');
      let file = e.dataTransfer.files;
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(file[0]);
        const uint8Array = new Uint8Array(reader.result);
        setBufferCover(uint8Array);
      };
      reader.readAsArrayBuffer(file[0]);
      console.log(file[0]);
      setCoverImage(file[0]);
    }
    setDrag(false);
  }

  function bufferImage(id, file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const uint8Array = new Uint8Array(reader.result);
      setBufferImgs([...bufferImgs, { id, uint8Array: [...uint8Array] }]);
    };
    reader.readAsArrayBuffer(file);
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
      if (separator !== value.length) {
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
    setTags(tags.filter((item) => item !== tag));
  };

  const handleEditTool = (e, id, type) => {
    if (type === 'header') {
      console.log(id);
      dispatch(editHeader({ id, header: e.currentTarget.textContent }));
    }
    console.log('e.target.value: ', e.target.value);
    console.log('e.currentTarget.textContent: ', e.currentTarget.textContent);

    if (type === 'text') {
      dispatch(editText({ id, text: e.currentTarget.textContent }));
    }
  };

  const handleSendReview = async () => {
    const { name } = jwtDecode(token);
    console.log(name);

    try {
      const response = await updateReview(
        reviewId,
        reviewType,
        title,
        tags,
        headers,
        texts,
        existRating,
        bufferImgs,
        bufferCover,
        imagesTool,
        previewCover,
      );
      Swal.fire({
        title: 'Successfully!',
        text: 'Review successfully added.',
      });
      navigate('/');
      console.log(response);
      dispatch(clearReviewState());
      setEdit(false);
    } catch ({ response }) {
      console.log(response);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: { response },
      });
    }
  };

  const handleCancelChanges = () => {
    setEdit(false);
    dispatch(clearReviewState());
  };

  const handleClickSave = async () => {
    dispatch(setExistRating({ rating }));
    dispatch(clearRating());
  };

  const handleClickCancel = () => {
    dispatch(clearRating());
    dispatch(setHover(existRating));
  };

  useEffect(() => {
    console.log(tools);
  }, [tools]);

  return (
    <>
      {/* <div className="container">
        <div className="container-form"> */}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Select value={reviewType} onChange={(e) => setReviewType(e.target.value)}>
            <option>Movies</option>
            <option>Games</option>
            <option>Books</option>
            <option>Music</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder={lang === 'eng' ? 'Title' : 'Заголовок'}
          />
        </Form.Group>
        <div className="editor">
          {tools.map((tool, id) => (
            <div key={tool.id} className="selected_tool">
              {texts && tool.type === 'text'
                ? texts.map(
                    (obj) =>
                      obj.id === tool.id && (
                        <div
                          key={obj.id}
                          contentEditable={true}
                          className="text"
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleEditTool(e, tool.id, tool.type)}
                        >
                          {obj.text}
                        </div>
                      ),
                  )
                : null}
              {tool.type === 'header'
                ? // eslint-disable-next-line
                  headers.map(
                    (obj) =>
                      obj.id === tool.id && (
                        <h3
                          key={obj.id}
                          ref={headerRef}
                          contentEditable={true}
                          className={obj.header ? 'text' : 'text data-placeholder'}
                          value={obj.header}
                          data-placeholder={lang === 'eng' ? 'Title' : 'Заголовок'}
                          suppressContentEditableWarning={true}
                          onBlur={(e) => handleEditTool(e, tool.id, tool.type)}
                        >
                          {obj.header}
                        </h3>
                      ),
                  )
                : null}
              {tool.type === 'image' ? (
                <div className="image-tool">
                  {drag ? (
                    <div
                      onDrop={(e) => onDropHandler(e, id)}
                      onDragStart={(e) => dragStartHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragOver={(e) => dragStartHandler(e)}
                      className="images-review drop-area"
                    >
                      {lang === 'eng'
                        ? 'Release the files to download them'
                        : 'Отпустите файлы, чтобы загрузить их'}
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
                          <div key={item.id} className="preview-images">
                            {item.id === tool.id ? <img src={item.url} alt="img review" /> : null}
                          </div>
                        ) : (
                          <div
                            key={item.id}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                              height: '100%',
                            }}
                          >
                            <FiDownload />
                            <p>
                              {lang === 'eng' ? 'Drag image here' : 'Перетащите изображение сюда'}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ) : null}
              <SettingsTools
                type={tool.type}
                id={tool.id}
                imagesTool={imagesTool}
                setImagesTool={setImagesTool}
              />
            </div>
          ))}
          <Typography setHeader={setHeader} setText={setText} />
        </div>

        <Form.Group className="mb-3 tags" controlId="formBasicEmail">
          <Form.Label>Tags</Form.Label>
          <div className="tagger-container">
            {tags.map((tag, id) => (
              <span key={id} className="tagger-container__tag">
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
                placeholder={lang === 'eng' ? 'Enter tag' : 'Введите тег'}
                list="tags"
                value={tag}
                autoComplete="off"
              />
            </div>
          </div>
          <Form.Text>
            {lang === 'eng' ? 'Enter tags using a comma.' : 'Введите теги используя запятую.'}
          </Form.Text>
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

        <h5 style={{ marginBottom: '15px' }}>
          {lang === 'eng' ? 'Download cover image' : 'Загрузите обложку'}
        </h5>

        {drag ? (
          <div
            onDrop={(e) => onDropHandler(e)}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            className="cover drop-area"
          >
            {lang === 'eng'
              ? 'Release the files to download them'
              : 'Отпустите файлы, чтобы загрузить их'}
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
                <img src={previewCover} alt="cover" />
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
                <p>Drag image here</p>
              </div>
            )}
          </div>
        )}
        <div className="rating">
          <h3>{lang === 'eng' ? 'How would you rate it?' : 'Как бы вы оценили?'}</h3>
          <StarRating rating={review.rating} />
          {rating ? (
            <div className="buttons">
              <button className="save" onClick={handleClickSave}>
                OK
              </button>
              <button className="cancel" onClick={handleClickCancel}>
                {lang === 'eng' ? 'Cancel' : 'Отмена'}
              </button>
            </div>
          ) : null}
        </div>
        <Button onClick={handleSendReview} variant="outline-success">
          {lang === 'eng' ? 'Save' : 'Сохранить'}
        </Button>
        <Button onClick={handleCancelChanges} variant="outline-success">
          {lang === 'eng' ? 'Cancel' : 'Отмена'}
        </Button>
      </Form>
    </>
  );
};

export default EditReview;
