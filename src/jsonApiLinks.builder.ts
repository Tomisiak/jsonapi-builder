import isNil from 'lodash.isnil';
import { JsonApiLink, JsonApiLinks } from './jsonApiLinks.interface';

export class JsonApiLinksBuilder<T = {}> {
  private data: T = {} as any;

  public withSelf<
    U extends string,
    V extends object,
  >(selfUrl: U, meta?: V): JsonApiLinksBuilder<T & { self: JsonApiLink<U, V> }> {
    return this.withUrl('self', selfUrl, meta);
  }

  public withRelated<
    U extends string,
    V extends object,
  >(relatedUrl: U, meta?: V): JsonApiLinksBuilder<T & { related: JsonApiLink<U, V> }> {
    return this.withUrl('related', relatedUrl, meta);
  }

  public build(this: JsonApiLinksBuilder<JsonApiLinks>) {
    return Object.assign({}, this.data) as unknown as T;
  }

  private withUrl<
    T extends string,
    U extends string,
    V extends object,
  >(name: T, href: U, meta?: V) {
    if (!isNil(meta)) {
      Object.assign(this.data, { [name]: { href, meta } });
    } else {
      Object.assign(this.data, { [name]: href });
    }

    return this as any;
  }
}
