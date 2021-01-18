import './EntitiesActions.css';

import { Button, Col } from 'antd';
import React, { FC, useMemo } from 'react';

import { areObjectsEqual } from '../../../shared/utils/are-objects-equal';
import { useEntitiesContext } from '../context';

export const EntitiesActions: FC = () => {
  const {
    openEntityFormModal,
    revertChanges,
    sendUpdatedEntityDataToTheApi,
    entities,
    lastSavedEntities,
  } = useEntitiesContext();

  const hasSomethingChanged = useMemo(() => {
    return areObjectsEqual(entities, lastSavedEntities);
  }, [entities, lastSavedEntities]);

  return (
    <Col xs={{ span: 24 }} md={{ span: 16 }} className="actions-wrapper">
      <Button className="button" size="large" onClick={openEntityFormModal}>
        Add new
      </Button>
      <Button className="button" size="large" onClick={revertChanges} disabled={hasSomethingChanged}>
        Revert
      </Button>
      <Button className="button" size="large" onClick={sendUpdatedEntityDataToTheApi} disabled={hasSomethingChanged}>
        Save changes
      </Button>
    </Col>
  );
};
