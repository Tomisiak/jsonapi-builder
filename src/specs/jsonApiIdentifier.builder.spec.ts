import { JsonApiIdentifierBuilder } from '../jsonApiIdentifier.builder';

describe('JsonApiIdentifier', () => {
  test('creates valid identifier object', () => {
    const expected = {
      id: 'test_id',
      type: 'test_type',
    };

    const result = new JsonApiIdentifierBuilder()
      .withType('test_type')
      .withId('test_id')
      .build();
    expect(result).toEqual(expected);
  });
});
