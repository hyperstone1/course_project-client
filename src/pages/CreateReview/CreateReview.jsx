import React from 'react';
import './index.scss';
import Form from 'react-bootstrap/Form';

const CreateReview = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Загрузите изображение</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Напишите текст вашей рецензии</Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Теги</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateReview;
