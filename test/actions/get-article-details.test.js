const handler = require('../../actions/get-article-details/index.js');

describe('get_article_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ name: 'Gigi Becali' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object (detail concept)', async () => {
    const out = await handler({ name: 'Gigi Becali' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
    expect(out.structuredContent).toHaveProperty('name');
    expect(out.structuredContent).toHaveProperty('description');
  });

  test('returns error message when required arg is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/provide|name/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('"Tell me more about the Gigi Becali FCSB transfer article" returns article details', async () => {
    const out = await handler({ name: 'Gigi Becali' });
    expect(out.structuredContent.name).toContain('Gigi Becali');
    expect(out.structuredContent.category).toBe('Liga 1');
  });

  test('returns not found message for unknown article', async () => {
    const out = await handler({ name: 'Unknown Article Title That Does Not Exist' });
    expect(out.content[0].text).toMatch(/no article found/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('article detail includes all expected fields', async () => {
    const out = await handler({ name: 'Mohamed Salah' });
    expect(out.structuredContent).toHaveProperty('name');
    expect(out.structuredContent).toHaveProperty('description');
    expect(out.structuredContent).toHaveProperty('category');
    expect(out.structuredContent).toHaveProperty('author');
    expect(out.structuredContent).toHaveProperty('published_at');
    expect(out.structuredContent).toHaveProperty('image_url');
    expect(out.structuredContent).toHaveProperty('url');
  });
});