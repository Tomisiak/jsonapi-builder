import { JsonApiIdentifier } from './jsonApiIdentifier.interface';
import { JsonApiResource } from './jsonApiResource.interface';
import { JsonApiResponse } from './jsonApiResponse.interface';
import { JsonApiLinks } from './jsonApiLinks.interface';
import { JsonApiIdentifierBuilder } from './jsonApiIdentifier.builder';
import { JsonApiResourceBuilder } from './jsonApiResource.builder';
import { JsonApiResponseBuilder } from './jsonApiResponse.builder';
import { JsonApiLinksBuilder } from './jsonApiLinks.builder';

export const jsonApi = {
  identifier: <U extends JsonApiIdentifier>(
    cb: (builder: JsonApiIdentifierBuilder) => JsonApiIdentifierBuilder<U>,
  ) => {
    const builder = new JsonApiIdentifierBuilder();
    return cb(builder).build();
  },
  resource: <U extends JsonApiResource>(cb: (builder: JsonApiResourceBuilder) => JsonApiResourceBuilder<U>) => {
    const builder = new JsonApiResourceBuilder();
    return cb(builder).build();
  },
  response: <U extends JsonApiResponse>(cb: (builder: JsonApiResponseBuilder) => JsonApiResponseBuilder<U>) => {
    const builder = new JsonApiResponseBuilder();
    return cb(builder).build();
  },
  links: <U extends JsonApiLinks>(cb: (builder: JsonApiLinksBuilder) => JsonApiLinksBuilder<U>) => {
    const builder = new JsonApiLinksBuilder();
    return cb(builder).build();
  },
};
