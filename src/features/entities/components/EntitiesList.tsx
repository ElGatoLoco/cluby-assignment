import './EntitiesList.css';

import { Button, Card, Col, Typography } from 'antd';
import React, { FC, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Spinner } from '../../../shared/components/Spinner';
import { useSchemaSelectionContext } from '../../schema-selection/context';
import { useEntitiesContext } from '../context';

const { Title, Text } = Typography;

export const EntitiesList: FC = () => {
  const { schema } = useSchemaSelectionContext();
  const { editEntity, entities, removeExistingEntity, loading } = useEntitiesContext();

  // Added for performance reasons - to avoid calculating something unique during render
  // Ideally, we would have an ID of some kind
  const entitiesWithKey = useMemo(() => {
    return entities.map((entity) => ({ ...entity, key: uuidv4() }));
  }, [entities]);

  const findFieldTitleByKey = useCallback(
    (key: string) => {
      return schema?.fields.find(({ id }) => id === key)?.title || key;
    },
    [schema?.fields],
  );

  if (!loading && entities.length === 0) {
    return (
      <Title level={3} className="title">
        {`There are no records present in ${schema?.title}`}
      </Title>
    );
  }

  return (
    <Col span={24} className="entities-wrapper">
      {loading ? (
        <Spinner mode="dark" />
      ) : (
        <>
          <Title level={3} className="title">
            {schema?.title}
          </Title>
          <div className="list-container">
            {entitiesWithKey.map((entity, index) => (
              <Col xs={{ span: 24 }} md={{ span: 12 }} key={entity.key}>
                <Card className="card">
                  {Object.entries(entities[index]).map(([key, val]) => {
                    return (
                      <div key={key}>
                        <Text className="text field">{findFieldTitleByKey(key)}: </Text>
                        <Text className="text value" strong>
                          {val}
                        </Text>
                      </div>
                    );
                  })}
                  <div className="buttons-container">
                    <Button onClick={editEntity(entities[index])} type="primary" size="large">
                      edit
                    </Button>
                    <Button onClick={removeExistingEntity(entities[index])} danger size="large">
                      remove
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </div>
        </>
      )}
    </Col>
  );
};
