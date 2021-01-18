import request from '../../../shared/utils/request';
import { Entity } from './types';

type GetEntitiesRequest = (schemaId: string) => Promise<Response>;
export const getEntitiesRequest: GetEntitiesRequest = (schemaId) => request.get(`/data/${schemaId}`);

type PostUpdatedEntitiesRequest = (schemaId: string, entities: Entity[]) => Promise<Response>;
export const postUpdatedEntitiesRequest: PostUpdatedEntitiesRequest = (schemaId, entities) =>
  request.post(`/data/${schemaId}`, { data: entities });
