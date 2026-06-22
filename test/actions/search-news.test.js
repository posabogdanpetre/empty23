const handler = require('../../actions/search-news/index.js');

describe('search_news handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({});
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({});
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.news is an array', async () => {
    const out = await handler({});
    expect(Array.isArray(out.structuredContent.news)).toBe(true);
    expect(out.structuredContent.news.length).toBeGreaterThan(0);
  });

  test('"Show me the latest sports news" returns all articles', async () => {
    const out = await handler({});
    expect(out.structuredContent.news.length).toBeGreaterThan(0);
    expect(out.content[0].text).toMatch(/Found \d+ recent sports news article/i);
  });

  test('filters by category when provided', async () => {
    const out = await handler({ category: 'Liga 1' });
    const articles = out.structuredContent.news;
    expect(articles.every(a => a.category === 'Liga 1')).toBe(true);
    expect(out.content[0].text).toMatch(/Liga 1/i);
  });

  test('returns empty array when category has no matches', async () => {
    const out = await handler({ category: 'NonExistent' });
    expect(out.structuredContent.news.length).toBe(0);
    expect(out.content[0].text).toMatch(/Found 0/i);
  });

  test('each article has required fields', async () => {
    const out = await handler({});
    const article = out.structuredContent.news[0];
    expect(article).toHaveProperty('name');
    expect(article).toHaveProperty('description');
    expect(article).toHaveProperty('category');
    expect(article).toHaveProperty('image_url');
  });
});