import { JsonApiRelationshipBuilder } from '../jsonApiRelationship.builder';
import { JsonApiIdentifierBuilder } from '../jsonApiIdentifier.builder';

describe('JsonApiRelationship', () => {
  describe('#differrent types of data', () => {
    test('creates valid relationship object - data is null', () => {
      const expected = {
        data: null,
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', '')
        .withData(null)
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid relationship object - data is single object', () => {
      const expected = {
        data: {
          id: 'test_id',
          type: 'test_type',
        },
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', '')
        .withData(
          new JsonApiIdentifierBuilder()
            .withId('test_id')
            .withType('test_type')
            .build(),
        ).build();
      expect(result).toEqual(expected);
    });

    test('creates valid relationship object - data is an Array', () => {
      const expected = {
        data: [{
          id: 'test_id',
          type: 'test_type',
        }, {
          id: 'test_id_2',
          type: 'test_type_2',
        }],
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', '')
        .withData([
          new JsonApiIdentifierBuilder()
            .withId('test_id')
            .withType('test_type')
            .build(),
          new JsonApiIdentifierBuilder()
            .withId('test_id_2')
            .withType('test_type_2')
            .build()
        ]).build();
      expect(result).toEqual(expected);
    });
  });

  describe('#meta information', () => {
    test('creates valid relationship object', () => {
      const expected = {
        meta: { count: 10 },
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', '')
        .withMeta({ count: 10 })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#resource linkage', () => {
    test('creates valid relationship object - simple linkage', () => {
      const expected = {
        links: {
          self: '/relationships/relationship_1',
          related: '/relationship_1',
        }
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', '')
        .withLinks()
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid relationship object - object linkage', () => {
      const expected = {
        links: {
          self: {
            href: 'http://example.com/relationships/relationship_1',
            meta: { count: 10 },
          },
          related: {
            href: 'http://example.com/relationship_1',
            meta: { count: 10 },
          },
        }
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', 'http://example.com')
        .withLinks({ count: 10 })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#mixed fields', () => {
    test('creates valid relationship object', () => {
      const expected = {
        meta: { count: 10 },
        data: [{
          id: 'test_id',
          type: 'test_type',
        }, {
          id: 'test_id_2',
          type: 'test_type_2',
        }],
      };

      const result = new JsonApiRelationshipBuilder('relationship_1', '')
        .withMeta({ count: 10 })
        .withData([
          new JsonApiIdentifierBuilder()
            .withId('test_id')
            .withType('test_type')
            .build(),
          new JsonApiIdentifierBuilder()
            .withId('test_id_2')
            .withType('test_type_2')
            .build()
        ]).build();
      expect(result).toEqual(expected);
    });
  });
});
