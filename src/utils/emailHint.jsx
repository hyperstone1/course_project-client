import React from 'react';
import Popover from 'react-bootstrap/Popover';
export const popoverEmail = (
  <Popover id="popover-positioned-left">
    <Popover.Header as="h3">Email Hint</Popover.Header>
    <Popover.Body style={{ whiteSpace: 'non-wrap' }}>
      The email should look like "user@mail"
    </Popover.Body>
  </Popover>
);
