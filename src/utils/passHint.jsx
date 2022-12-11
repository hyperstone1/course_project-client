import React from 'react';
import Popover from 'react-bootstrap/Popover';
export const popoverPass = (
  <Popover id="popover-positioned-left">
    <Popover.Header as="h3">Password Hint</Popover.Header>
    <Popover.Body style={{ whiteSpace: 'non-wrap' }}>
      The password must contain at least 6 characters and include:
      <p>
        ● <strong>lowercase or uppercase letters of the Latin alphabet;</strong>
      </p>
      <p>
        ● <strong>numbers;</strong>
      </p>
      The password can also contain any special character.
    </Popover.Body>
  </Popover>
);
