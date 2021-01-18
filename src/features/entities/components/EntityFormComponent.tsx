import './EntityFormComponent.css';

import { Form, Input, Modal } from 'antd';
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-form-fp';

import { Schema } from '../../schema-selection/redux/types';
import { ENTITY_FORM_NAME } from '../constants';
import { useEntitiesContext } from '../context';
import { Entity } from '../redux/types';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export const EntityFormComponent: FC<{ schema: Schema }> = ({ schema }) => {
  const {
    state: { errors, [ENTITY_FORM_NAME]: entityForm },
    setFieldValue,
    validate,
    validateForm,
    clearForm,
  } = useFormContext<typeof ENTITY_FORM_NAME, Entity>();

  const {
    isEntityFormModalVisible,
    submitEntityForm,
    closeEntityFormModal,
    currentlyEditedEntity,
  } = useEntitiesContext();

  const onFormClose = useCallback(() => {
    clearForm(ENTITY_FORM_NAME);
    closeEntityFormModal();
  }, [clearForm, closeEntityFormModal]);

  useEffect(() => {
    schema.fields.forEach((field) => {
      if (currentlyEditedEntity) {
        setFieldValue(ENTITY_FORM_NAME)(field.id)(currentlyEditedEntity[field.id]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyEditedEntity]);

  const handleFieldValueChange = useCallback(
    (field: string) => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(ENTITY_FORM_NAME)(field)(value);
    },
    [setFieldValue],
  );

  const validateFieldValue = useCallback(
    (field: string) => ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      validate(ENTITY_FORM_NAME)(field)(value || entityForm[field]);
    },
    [entityForm, validate],
  );

  const onFormSubmit = useCallback(() => {
    const isFormValid = validateForm(ENTITY_FORM_NAME, entityForm);

    if (isFormValid) {
      clearForm(ENTITY_FORM_NAME);
      submitEntityForm(entityForm);
    }
  }, [clearForm, entityForm, submitEntityForm, validateForm]);

  const formTitle = useMemo(() => {
    return currentlyEditedEntity ? `Editing item in ${schema.title}` : 'Add new entity';
  }, [currentlyEditedEntity, schema.title]);

  return (
    <Modal
      title={formTitle}
      visible={isEntityFormModalVisible}
      onOk={onFormSubmit}
      onCancel={onFormClose}
      centered
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <Form {...layout} layout="vertical">
        {schema.fields.map((field) => (
          <Form.Item
            label={field.title}
            key={field.id}
            validateStatus={errors[ENTITY_FORM_NAME][field.id] ? 'error' : ''}
          >
            <Input
              value={entityForm[field.id]}
              onChange={handleFieldValueChange(field.id)}
              onBlur={validateFieldValue(field.id)}
              className={errors[ENTITY_FORM_NAME][field.id] ? 'error' : ''}
            />
            <div className="error-message">{errors[ENTITY_FORM_NAME][field.id]}</div>
            <hr />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};
