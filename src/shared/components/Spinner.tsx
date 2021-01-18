import './Spinner.css';

import { Col, Spin } from 'antd';
import React, { FC } from 'react';

export const Spinner: FC<{ mode?: 'light' | 'dark' }> = ({ mode = 'light' }) => {
  return (
    <Col className="spinner-wrapper">
      <Spin className={mode === 'light' ? 'light' : 'dark'} />
    </Col>
  );
};
