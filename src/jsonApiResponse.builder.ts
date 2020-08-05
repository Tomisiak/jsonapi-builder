import { JsonApiResponse, JsonApiResponseData } from './jsonApiResponse.interface';
import { JsonApiLink } from './jsonApiLinks.interface';
import { JsonApiLinksBuilder } from './jsonApiLinks.builder';
import { JsonApiResource } from './jsonApiResource.interface';

export class JsonApiResponseBuilder<T = {}> {
  private data: T = {} as any;

  public withData<U extends JsonApiResponseData>(data: U): JsonApiResponseBuilder<T & { data: U }> {
    Object.assign(this.data, { data });
    return this as any;
  }

  public withLinks<U extends string, V extends object>(url: U, meta?: V):
  JsonApiResponseBuilder<T & { links: { self: JsonApiLink<U, V> } }> {
    Object.assign(this.data, { links: new JsonApiLinksBuilder().withSelf(url, meta).build() });
    return this as any;
  }

  public withMeta<U extends object>(meta: U): JsonApiResponseBuilder<T & { meta: U }> {
    Object.assign(this.data, { meta });
    return this as any;
  }

  public withIncluded<U extends JsonApiResource[]>(included: U): JsonApiResponseBuilder<T & { included: U }> {
    Object.assign(this.data, { included });
    return this as any;
  }

  public build(this: JsonApiResponseBuilder<JsonApiResponse>) {
    return Object.assign({}, this.data) as unknown as T;
  }
}
