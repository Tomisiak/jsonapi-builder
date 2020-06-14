import { JsonApiLink } from './jsonApiLinks.interface';
import { JsonApiIdentifier } from './jsonApiIdentifier.interface';

export interface JsonApiRelationshipLinks {
  self: JsonApiLink<string, Record<any, any>>;
  related: JsonApiLink<string, Record<any, any>>;
}
export type JsonApiRelationshipData = JsonApiIdentifier | JsonApiIdentifier[] | null;
export type JsonApiRelationship = { links: JsonApiRelationshipLinks } | {
  data: JsonApiRelationshipData;
} | {
  meta: any;
}
