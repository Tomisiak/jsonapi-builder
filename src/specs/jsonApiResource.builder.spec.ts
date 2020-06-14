import { JsonApiResourceBuilder } from '../jsonApiResource.builder';
import { JsonApiIdentifierBuilder } from '../jsonApiIdentifier.builder';

describe('JsonApiResource', () => {
  test('creates valid identifier object', () => {
    const expected = {
      id: 'test_id',
      type: 'test_type',
    };

    const result = new JsonApiResourceBuilder()
      .withId('test_id')
      .withType('test_type')
      .build();
    expect(result).toEqual(expected);
  });

  describe('#additional attributes field', () => {
    test('creates valid resource object', () => {
      const expected = {
        id: 'test_id',
        type: 'test_type',
        attributes: {
          testAttr1: 'test_attr1_value',
          testAttr2: 'test_attr2_value',
        },
      };

      const result = new JsonApiResourceBuilder()
        .withId('test_id')
        .withType('test_type')
        .withAttributes({
          testAttr1: 'test_attr1_value',
          testAttr2: 'test_attr2_value',
        })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#additional links field', () => {
    test('creates valid resource object - simple link', () => {
      const expected = {
        id: 'test_id',
        type: 'test_type',
        links: {
          self: 'http://example.com/test_type/test_id',
        },
      };

      const result = new JsonApiResourceBuilder()
        .withId('test_id')
        .withType('test_type')
        .withLinks('http://example.com')
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid resource object - object link', () => {
      const expected = {
        id: 'test_id',
        type: 'test_type',
        links: {
          self: {
            href: 'http://example.com/test_type/test_id',
            meta: { count: 10 },
          },
        },
      };

      const result = new JsonApiResourceBuilder()
        .withId('test_id')
        .withType('test_type')
        .withLinks('http://example.com', {
          count: 10,
        })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#additional meta field', () => {
    test('creates valid resource object', () => {
      const expected = {
        id: 'test_id',
        type: 'test_type',
        meta: { count: 10 },
      };

      const result = new JsonApiResourceBuilder()
        .withId('test_id')
        .withType('test_type')
        .withMeta({ count: 10 })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#additional relationships field', () => {
    test('creates valid resource object - single relationship', () => {
      const expected = {
        id: 'test_id',
        type: 'test_type',
        relationships: {
          testRelationship1: {
            data: {
              id: 'test_id_2',
              type: 'test_type_2',
            },
          },
        }
      };

      const result = new JsonApiResourceBuilder()
        .withId('test_id')
        .withType('test_type')
        .relateTo('testRelationship1', builder => (
          builder.withData(
            new JsonApiIdentifierBuilder()
              .withType('test_type_2')
              .withId('test_id_2')
              .build()
          )
        ))
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid resource object - multiple relationships', () => {
      const expected = {
        id: 'test_id',
        type: 'test_type',
        relationships: {
          testRelationship1: {
            data: {
              id: 'test_id_2',
              type: 'test_type_2',
            },
          },
          testRelationship2: {
            data: [{
              id: 'test_id_3',
              type: 'test_type_3',
            }, {
              id: 'test_id_4',
              type: 'test_type_4',
            }]
          }
        }
      };

      const result = new JsonApiResourceBuilder()
        .withId('test_id')
        .withType('test_type')
        .relateTo('testRelationship1', builder => (
          builder.withData(
            new JsonApiIdentifierBuilder()
              .withType('test_type_2')
              .withId('test_id_2')
              .build()
          )
        ))
        .relateTo('testRelationship2', builder => (
          builder.withData([
            new JsonApiIdentifierBuilder()
              .withType('test_type_3')
              .withId('test_id_3')
              .build(),
            new JsonApiIdentifierBuilder()
              .withType('test_type_4')
              .withId('test_id_4')
              .build()
          ])
        ))
        .build();
      expect(result).toEqual(expected);
    });
  });
});
