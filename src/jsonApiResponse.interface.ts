import { JsonApiLink } from './jsonApiLinks.interface';
import { JsonApiResource } from './jsonApiResource.interface';

export interface JsonApiResponseLinks {
  self: JsonApiLink<string, Record<any, any>>;
}

export type JsonApiResponseData = JsonApiResource | JsonApiResource[] | null;

export interface JsonApiDataDocument {
  data: JsonApiResponseData;
}

export type JsonApiResponse = JsonApiDataDocument & {
  links?: JsonApiResponseLinks;
  meta?: any;
}
