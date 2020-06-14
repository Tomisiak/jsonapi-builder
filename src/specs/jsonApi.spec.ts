import { jsonApi } from '../jsonApi';

describe('JsonApi', () => {
  describe('#identifier', () => {
    test('creates valid identifier object', () => {
      const expected = {
        type: 'articles',
        id: '1',
      };

      const result = jsonApi.identifier(b => b
        .withType('articles')
        .withId('1')
      );
      expect(result).toEqual(expected);
    });
  });

  describe('#resource', () => {
    test('creates valid resource object - missing links', () => {
      const expected = {
        type: 'articles',
        id: '1',
        attributes: {
          title: 'JavaScript'
        },
        relationships: {
          author: {
            links: {
              self: '/articles/1/relationships/author',
              related: '/articles/1/author'
            },
            data: {
              type: 'people',
              id: '9'
            },
          },
        },
      };

      const result = jsonApi.resource(b => b
        .withId('1')
        .withType('articles')
        .withAttributes({
          title: 'JavaScript',
        })
        .relateTo('author', b => b
          .withLinks()
          .withData(jsonApi.identifier(b => b
            .withId('9')
            .withType('people')
          ))
        )
      );
      expect(result).toEqual(expected);
    });

    test('creates valid resource object - links attached', () => {
      const expected = {
        type: 'articles',
        id: '1',
        attributes: {
          title: 'JavaScript'
        },
        relationships: {
          author: {
            links: {
              self: 'http://example.com/articles/1/relationships/author',
              related: 'http://example.com/articles/1/author'
            },
            data: {
              type: 'people',
              id: '9'
            },
          },
        },
        links: {
          self: 'http://example.com/articles/1'
        }
      };

      const result = jsonApi.resource(b => b
        .withId('1')
        .withType('articles')
        .withLinks('http://example.com')
        .withAttributes({
          title: 'JavaScript',
        })
        .relateTo('author', b => b
          .withLinks()
          .withData(jsonApi.identifier(b => b
            .withId('9')
            .withType('people')
          ))
        )
      );
      expect(result).toEqual(expected);
    });
  });

  describe('#response', () => {
    test('create valid response object', () => {
      const expected = {
        data: [{
          type: 'articles',
          id: '1',
          attributes: {
            title: 'JSON API'
          },
          links: {
            self: 'http://example.com/articles/1'
          },
          relationships: {
            author: {
              links: {
                self: 'http://example.com/articles/1/relationships/author',
                related: 'http://example.com/articles/1/author'
              },
              data: { type: 'people', id: '9' }
            },
            comments: {
              links: {
                self: 'http://example.com/articles/1/relationships/comments',
                related: 'http://example.com/articles/1/comments'
              },
              data: [
                { type: 'comments', id: '5' },
                { type: 'comments', id: '12' }
              ],
            },
          },
        }],
        meta: {
          copyright: 'Copyright 2019',
          authors: ['John Doe', 'Jane Doe'],
        },
      };

      const result = jsonApi.response(b => b
        .withData([
          jsonApi.resource(b => b
            .withType('articles')
            .withId('1')
            .withAttributes({
              title: 'JSON API'
            })
            .withLinks('http://example.com')
            .relateTo('author', b => b
              .withLinks()
              .withData(jsonApi.identifier(b => b
                .withId('9')
                .withType('people')
              ))
            )
            .relateTo('comments', b => b
              .withLinks()
              .withData([
                jsonApi.resource(b => b
                  .withType('comments')
                  .withId('5')),
                jsonApi.resource(b => b
                  .withType('comments')
                  .withId('12'))
              ]),
            ),
          ),
        ])
        .withMeta({
          copyright: 'Copyright 2019',
          authors: ['John Doe', 'Jane Doe'],
        }),
      );
      expect(result).toEqual(expected);
    });
  });
});
