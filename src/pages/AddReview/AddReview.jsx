import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header/Header';
import { FiDownload } from 'react-icons/fi';
import { RxCrossCircled } from 'react-icons/rx';
import { AiFillEdit } from 'react-icons/ai';
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
} from '../../store/slices/addReviewSlice/addReview';
import SettingsTools from '../../components/SettingsTools/SettingsTools';
import { createReview } from '../../http/reviewsAPI';

const AddReview = () => {
  const [drag, setDrag] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [previewCover, setPreviewCover] = useState('');
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState('');
  const [reviewType, setReviewType] = useState('');

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
  const { tools, headers, texts } = useSelector((state) => state.addReview);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    setImagesTool(tools.filter((tool) => tool.type === 'image'));
  }, [tools]);

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
    if (type === 'text') {
      dispatch(editText({ id, text: e.currentTarget.textContent }));
    }
  };

  const handleSendReview = async () => {
    setReview({ reviewType, title, tags, headers, texts, previewCover, reviewImages, coverImage });
    console.log(bufferImgs);
    console.log(bufferCover);

    try {
      const response = await createReview(
        id,
        reviewType,
        title,
        tags,
        headers,
        texts,
        coverImage,
        bufferImgs,
        bufferCover,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(tools);
  }, [tools]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="container-form">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select value={reviewType} onChange={(e) => setReviewType(e.target.value)}>
                <option>Кино</option>
                <option>Игры</option>
                <option>Книги</option>
                <option>Музыка</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Заголовок"
              />
            </Form.Group>
            <div className="editor">
              {tools.map((tool, id) => (
                <div key={tool.id} className="selected_tool">
                  {tool.type === 'text'
                    ? texts.map(
                        (obj) =>
                          obj.id === tool.id && (
                            <div
                              key={obj.id}
                              contentEditable={true}
                              className="text"
                              value={obj.text}
                              onInput={(e) => handleEditTool(e, tool.id, tool.type)}
                            />
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
                              data-placeholder="Заголовок"
                              onInput={(e) => handleEditTool(e, tool.id, tool.type)}
                            />
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
                              <div key={item.id} className="preview-images">
                                {item.id === tool.id ? (
                                  <img src={item.url} alt="img review" />
                                ) : null}
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
                                <p>Перетащите сюда изображение</p>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}
                  {/* {tool.type === 'text' || tool.type === 'header' ? (
                    <div onClick={() => handleEditTool(tool.type, tool.id)} className="edit">
                      <AiFillEdit />
                    </div>
                  ) : null} */}

                  <SettingsTools type={tool.type} id={tool.id} />
                </div>
              ))}
              <Typography setHeader={setHeader} setText={setText} />
            </div>

            <Form.Group className="mb-3 tags" controlId="formBasicEmail">
              <Form.Label>Теги</Form.Label>
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
                    <p>Перетащите сюда изображение</p>
                  </div>
                )}
              </div>
            )}
            <Button onClick={handleSendReview} variant="outline-success">
              Publish
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddReview;
