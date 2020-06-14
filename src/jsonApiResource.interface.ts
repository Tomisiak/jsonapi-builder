import { JsonApiLink } from './jsonApiLinks.interface';
import { JsonApiIdentifier } from './jsonApiIdentifier.interface';
import { JsonApiRelationship } from './jsonApiRelationship.interface';

export interface JsonApiResourceLinks {
  self: JsonApiLink<string, Record<any, any>>;
}
export interface JsonApiResource extends JsonApiIdentifier {
  links?: JsonApiResourceLinks;
  meta?: any;
  relationships?: Record<string, JsonApiRelationship>;
  attributes?: Record<string, any>;
}
