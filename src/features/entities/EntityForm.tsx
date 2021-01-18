import React, { FC } from 'react';
import { FormContextProvider } from 'react-form-fp';

import { useSchemaSelectionContext } from '../schema-selection/context';
import { EntityFormComponent } from './components/EntityFormComponent';
import { ENTITY_FORM_NAME } from './constants';
import { useEntitiesContext } from './context';
import { createFormModel, createValidationSchema } from './utils';

export const EntityForm: FC = () => {
  const { schema } = useSchemaSelectionContext();
  const { isEntityFormModalVisible } = useEntitiesContext();
  if (!schema || !isEntityFormModalVisible) {
    return <></>;
  }

  const formModel = createFormModel(ENTITY_FORM_NAME, schema.fields);
  const validationSchema = createValidationSchema(ENTITY_FORM_NAME, schema.fields);

  return (
    <FormContextProvider initialState={formModel} validationSchema={validationSchema}>
      <EntityFormComponent schema={schema} />
    </FormContextProvider>
  );
};
