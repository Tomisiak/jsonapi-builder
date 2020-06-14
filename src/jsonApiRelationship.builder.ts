import { JsonApiLinksBuilder } from './jsonApiLinks.builder';
import {
  JsonApiRelationship,
  JsonApiRelationshipData,
  JsonApiRelationshipLinks,
} from './jsonApiRelationship.interface';

export class JsonApiRelationshipBuilder<T = {}> {
  private name: string;
  private parentUrl: string;
  private data: T = {} as any;

  constructor(name: string, parentUrl: string) {
    this.name = name;
    this.parentUrl = parentUrl;
  }

  public withLinks<V extends object, W extends JsonApiRelationshipLinks>(
    meta?: V,
  ): JsonApiRelationshipBuilder<T & { links: W }> {
    const { name, parentUrl } = this;

    Object.assign(this.data, {
      links: new JsonApiLinksBuilder()
        .withSelf(`${parentUrl}/relationships/${name}`, meta)
        .withRelated(`${parentUrl}/${name}`, meta)
        .build(),
    });
    return this as any;
  }

  public withData<U extends JsonApiRelationshipData>(data: U):
  JsonApiRelationshipBuilder<T & { data: U }> {
    Object.assign(this.data, { data });
    return this as any;
  }

  public withMeta<U extends object>(meta: U): JsonApiRelationshipBuilder<T & { meta: U }> {
    Object.assign(this.data, { meta });
    return this as any;
  }

  public build(this: JsonApiRelationshipBuilder<JsonApiRelationship>) {
    return Object.assign({}, this.data) as unknown as T;
  }
}
