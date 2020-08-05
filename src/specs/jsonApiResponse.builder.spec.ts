import { JsonApiResponseBuilder } from '../jsonApiResponse.builder';
import { JsonApiResourceBuilder } from '../jsonApiResource.builder';

describe('JsonApiResponse', () => {
  describe('#data field', () => {
    test('creates valid repsponse object - data is null', () => {
      const expected = {
        data: null,
      };

      const result = new JsonApiResponseBuilder()
        .withData(null)
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid repsponse object - data is an object', () => {
      const expected = {
        data: {
          id: 'test_id',
          type: 'test_type',
          attributes: {
            testAttr1: 'testAttr1_value',
          }
        },
      };

      const result = new JsonApiResponseBuilder()
        .withData(new JsonApiResourceBuilder()
          .withId('test_id')
          .withType('test_type')
          .withAttributes({
            testAttr1: 'testAttr1_value',
          })
          .build(),
        )
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid repsponse object - data is an Array', () => {
      const expected = {
        data: [{
          id: 'test_id',
          type: 'test_type',
        }, {
          id: 'test_id_2',
          type: 'test_type_2',
          meta: {
            count: 10,
          }
        }],
      };

      const result = new JsonApiResponseBuilder()
        .withData([
          new JsonApiResourceBuilder()
            .withId('test_id')
            .withType('test_type')
            .build(),
          new JsonApiResourceBuilder()
            .withId('test_id_2')
            .withType('test_type_2')
            .withMeta({ count: 10 })
            .build(),
        ])
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#meta field', () => {
    test('creates valid response object', () => {
      const expected = {
        data: null,
        meta: { count: 10 },
      };

      const result = new JsonApiResponseBuilder()
        .withData(null)
        .withMeta({ count: 10 })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#links field', () => {
    test('creates valid response object - simple url', () => {
      const expected = {
        data: null,
        links: {
          self: 'http://example.com'
        },
      };

      const result = new JsonApiResponseBuilder()
        .withData(null)
        .withLinks('http://example.com')
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid response object - object url', () => {
      const expected = {
        data: [],
        links: {
          self: {
            href: 'http://example.com',
            meta: { count: 0 },
          }
        },
      };

      const result = new JsonApiResponseBuilder()
        .withData([])
        .withLinks('http://example.com', {
          count: 0,
        })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#included field', () => {
    test('creates valid response object', () => {
      const expected = {
        data: {
          id: 'test_id',
          type: 'test_type',
          attributes: {
            testAttr1: 'testAttr1_value',
          },
          relationships: {
            testRelationship1: {
              data: {
                id: 'test_id_2',
                type: 'test_type_2',
              },
            },
            testRelationship2: {
              data: {
                id: 'test_id_3',
                type: 'test_type_3',
              },
            },
          }
        },
        included: [
          {
            id: 'test_id_2',
            type: 'test_type_2',
            attributes: {
              testAttr2: 'testAttr2_value',
            },
          },
          {
            id: 'test_id_3',
            type: 'test_type_3',
            attributes: {
              testAttr3: 'testAttr3_value',
            },
          },
        ],
      };

      const relationship1Builder = new JsonApiResourceBuilder()
        .withId('test_id_2')
        .withType('test_type_2');
      const relationship2Builder = new JsonApiResourceBuilder()
        .withId('test_id_3')
        .withType('test_type_3');

      const result = new JsonApiResponseBuilder()
        .withData(new JsonApiResourceBuilder()
          .withId('test_id')
          .withType('test_type')
          .withAttributes({
            testAttr1: 'testAttr1_value',
          })
          .relateTo('testRelationship1', b => b
            .withData(relationship1Builder.build()))
          .relateTo('testRelationship2', b => b
            .withData(relationship2Builder.build()))
          .build()
        )
        .withIncluded([
          relationship1Builder
            .withAttributes({
              testAttr2: 'testAttr2_value',
            })
            .build(),
          relationship2Builder
            .withAttributes({
              testAttr3: 'testAttr3_value',
            })
            .build(),
        ])
        .build();
      expect(result).toEqual(expected);
    });
  });
});
