import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';
import { JsonApiIdentifierBuilder } from './jsonApiIdentifier.builder';
import { JsonApiLinksBuilder } from './jsonApiLinks.builder';
import { JsonApiRelationship } from './jsonApiRelationship.interface';
import { JsonApiRelationshipBuilder } from './jsonApiRelationship.builder';
import { JsonApiResource, JsonApiResourceLinks } from './jsonApiResource.interface';
import * as Util from './util.types';

export class JsonApiResourceBuilder<T extends Partial<JsonApiResource> = {}> extends JsonApiIdentifierBuilder<T> {
  public withId<U extends string>(id: U): JsonApiResourceBuilder<T & { id: U }> {
    return super.withId(id) as any;
  }

  public withType<U extends string>(type: U): JsonApiResourceBuilder<T & { type: U }> {
    return super.withType(type) as any;
  }

  public withLinks<U extends string, V extends object>(
    this: JsonApiResourceBuilder<Pick<JsonApiResource, 'id' | 'type' | 'links'>>,
    baseUrl: U,
    meta?: V,
  ): JsonApiResourceBuilder<T & { links: JsonApiResourceLinks }> {
    const selfUrl = this.extractSelfUrl();

    Object.assign(this.data, {
      links: new JsonApiLinksBuilder()
        .withSelf(`${baseUrl}${selfUrl}`, meta)
        .build(),
    });
    return this as any;
  }

  public withAttributes<U, V extends Util.Diff<keyof U, keyof T['relationships']>>(
    attributes: U
  ): JsonApiResourceBuilder<T & { attributes: { [P in keyof U]: P extends V ? U[P] : null } }> {
    Object.assign(this.data, { attributes });
    return this as any;
  }

  public withMeta<U extends object>(meta: U):  JsonApiResourceBuilder<T & { meta: U }> {
    Object.assign(this.data, { meta });
    return this as any;
  }

  public relateTo<
    U extends string,
    V extends Util.Diff<U, keyof T['attributes']>,
    W extends JsonApiRelationship
  > (
    this: JsonApiResourceBuilder<Pick<JsonApiResource, 'id' | 'type' | 'links' | 'relationships'>>,
    name: U,
    getRelationship: (builder: JsonApiRelationshipBuilder) => JsonApiRelationshipBuilder<W>
  ): JsonApiResourceBuilder<T & { relationships: { [P in U]: P extends V ? W : null } }> {
    const selfUrl = this.extractSelfUrl();
    const builder = new JsonApiRelationshipBuilder(name, selfUrl);

    Object.assign(this.data, {
      relationships: {
        ...this.data.relationships,
        [name]: getRelationship(builder).build(),
      }
    });
    return this as any;
  }

  private extractSelfUrl(this: JsonApiResourceBuilder<Pick<JsonApiResource, 'id' | 'type' | 'links'>>) {
    const { links, id, type } = this.data;
    if (isNil(links)) {
      return `/${type}/${id}`;
    }

    const { self } = links;
    if (isString(self)) {
      return self;
    }

    return self.href;
  }

  public build(this: JsonApiResourceBuilder<JsonApiResource>) {
    return Object.assign({}, this.data) as unknown as T;
  }
}
