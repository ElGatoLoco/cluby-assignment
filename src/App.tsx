import 'antd/dist/antd.css';

import './App.css';

import { Row } from 'antd';
import React, { FC } from 'react';

import { EntitiesActions } from './features/entities/components/EntitiesActions';
import { EntitiesList } from './features/entities/components/EntitiesList';
import { EntityForm } from './features/entities/EntityForm';
import { useSchemaSelectionContext } from './features/schema-selection/context';
import { SchemaSelect } from './features/schema-selection/SchemaSelect';
import { Spinner } from './shared/components/Spinner';

const App: FC = () => {
  const { loading } = useSchemaSelectionContext();

  return (
    <div className="App">
      <Row className="header">
        {loading ? (
          <Spinner mode="light" />
        ) : (
          <>
            <SchemaSelect />
            <EntitiesActions />
          </>
        )}

        <EntityForm />
      </Row>
      <Row>
        <EntitiesList />
      </Row>
    </div>
  );
};

export default App;
