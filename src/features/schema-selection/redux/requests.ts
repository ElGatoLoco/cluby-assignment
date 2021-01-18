import request from '../../../shared/utils/request';

type SelectSchemaRequest = (schemaId: string) => Promise<Response>;
export const selectSchemaRequest: SelectSchemaRequest = (schemaId) => request.get(`/data/${schemaId}/schema`);
