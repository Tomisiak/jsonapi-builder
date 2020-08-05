import { JsonApiIdentifier } from './jsonApiIdentifier.interface';

export class JsonApiIdentifierBuilder<T = {}> {
  protected data: T = {} as any;

  public withId<U extends string>(id: U): JsonApiIdentifierBuilder<T & { id: U }> {
    Object.assign(this.data, { id });
    return this as any;
  }

  public withType<U extends string>(type: U): JsonApiIdentifierBuilder<T & { type: U }> {
    Object.assign(this.data, { type });
    return this as any;
  }

  public  build(this: JsonApiIdentifierBuilder<JsonApiIdentifier>) {
    return Object.assign({}, this.data) as unknown as T;
  }
}
