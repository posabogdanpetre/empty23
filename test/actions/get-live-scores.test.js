const handler = require('../../actions/get-live-scores/index.js');

describe('get_live_scores handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ date: '2026-06-22' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ date: '2026-06-22' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.scores is an array of leagues with matches', async () => {
    const out = await handler({ date: '2026-06-22' });
    expect(Array.isArray(out.structuredContent.scores)).toBe(true);
    expect(out.structuredContent.scores.length).toBeGreaterThan(0);
    
    const firstLeague = out.structuredContent.scores[0];
    expect(firstLeague).toHaveProperty('league');
    expect(firstLeague).toHaveProperty('matches');
    expect(Array.isArray(firstLeague.matches)).toBe(true);
  });

  test('match objects have required fields', async () => {
    const out = await handler({});
    const firstMatch = out.structuredContent.scores[0].matches[0];
    
    expect(firstMatch).toHaveProperty('home_team');
    expect(firstMatch).toHaveProperty('away_team');
    expect(firstMatch).toHaveProperty('score');
    expect(firstMatch).toHaveProperty('kick_off_time');
    expect(firstMatch).toHaveProperty('status');
  });

  test('defaults to today when date parameter is omitted', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/Found \d+ football matches/);
    expect(out.structuredContent.scores.length).toBeGreaterThan(0);
  });

  test('content text includes live match count when matches are live', async () => {
    const out = await handler({ date: '2026-06-22' });
    const hasLiveMatches = out.structuredContent.scores.some(league =>
      league.matches.some(m => m.status === 'live')
    );
    
    if (hasLiveMatches) {
      expect(out.content[0].text).toMatch(/currently live/i);
    }
  });
});