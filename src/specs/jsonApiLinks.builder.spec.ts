import { JsonApiLinksBuilder } from '../jsonApiLinks.builder';

describe('JsonApiLinks', () => {
  test('creates valid links object - empty', () => {
    const expected = {};

    const result = new JsonApiLinksBuilder()
      .build();
    expect(result).toEqual(expected);
  });

  describe('#simple type links', () => {
    test('creates valid links object - self only', () => {
      const expected = {
        self: 'http://example.com/relationships/related',
      };

      const result = new JsonApiLinksBuilder()
        .withSelf('http://example.com/relationships/related')
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid links object - related only', () => {
      const expected = {
        related: 'http://example.com/related',
      };

      const result = new JsonApiLinksBuilder()
        .withRelated('http://example.com/related')
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid links object - both related and self', () => {
      const expected = {
        self: 'http://example.com/relationships/related',
        related: 'http://example.com/related',
      };

      const result = new JsonApiLinksBuilder()
        .withSelf('http://example.com/relationships/related')
        .withRelated('http://example.com/related')
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#object type links with meta', () => {
    test('creates valid links object - self only', () => {
      const expected = {
        self: {
          href: 'http://example.com/relationships/related',
          meta: {
            count: 10,
          }
        },
      };

      const result = new JsonApiLinksBuilder()
        .withSelf('http://example.com/relationships/related', {
          count: 10,
        })
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid links object - related only', () => {
      const expected = {
        related: {
          href: 'http://example.com/related',
          meta: { count: 8 },
        },
      };

      const result = new JsonApiLinksBuilder()
        .withRelated('http://example.com/related', {
          count: 8
        })
        .build();
      expect(result).toEqual(expected);
    });

    test('creates valid links object - both related and self', () => {
      const expected = {
        self: {
          href: 'http://example.com/relationships/related',
          meta: { count: 10 },
        },
        related: {
          href: 'http://example.com/related',
          meta: { count: 8 },
        },
      };

      const result = new JsonApiLinksBuilder()
        .withSelf('http://example.com/relationships/related', {
          count: 10,
        })
        .withRelated('http://example.com/related', {
          count: 8,
        })
        .build();
      expect(result).toEqual(expected);
    });
  });

  describe('#mixed type links', () => {
    test('creates valid links object', () => {
      const expected = {
        self: {
          href: 'http://example.com/relationships/related',
          meta: { count: 10 },
        },
        related: 'http://example.com/related',
      };

      const result = new JsonApiLinksBuilder()
        .withRelated('http://example.com/related')
        .withSelf('http://example.com/relationships/related', {
          count: 10,
        })
        .build();
      expect(result).toEqual(expected);
    });
  });
});
