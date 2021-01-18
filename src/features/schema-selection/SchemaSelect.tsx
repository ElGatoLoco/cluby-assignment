import './SchemaSelect.css';

import { Col, Select } from 'antd';
import React, { FC } from 'react';

import { environment } from '../../environment';
import { useSchemaSelectionContext } from './context';

const { Option } = Select;

export const SchemaSelect: FC = () => {
  const { schema, onSchemaSelect } = useSchemaSelectionContext();

  return (
    <Col xs={{ span: 24 }} md={{ span: 8 }} className="schema-select">
      <Select size="large" value={schema?.id} onChange={onSchemaSelect} className="dropdown">
        {environment.availableSchemas.map((schemaId) => (
          <Option value={schemaId} key={schemaId}>
            {schemaId}
          </Option>
        ))}
      </Select>
    </Col>
  );
};
