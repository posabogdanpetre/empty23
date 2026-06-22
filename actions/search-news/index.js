// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    "name": "Transferul e în pericol! Gigi Becali a aflat pretențiile fotbalistului dorit la FCSB",
    "description": "FCSB transfer saga as Gigi Becali discovers the demands of his target player.",
    "category": "Liga 1",
    "published_at": "2026-06-14T10:30:00Z",
    "image_url": "https://www.sport.ro/img/2026/06/14/201318/becali-9.png?fm=jpg&q=80&fit=crop&crop=1920%2C1080%2C0%2C0&w=1280",
    "url": "https://www.sport.ro/fotbal/liga-1/transferul-e-in-pericol-gigi-becali-a-aflat-pretentiile"
  },
  {
    "name": "Egipt, cu Mohamed Salah în formă, a reușit prima sa victorie la Campionatul Mondial",
    "description": "Egypt achieves its first-ever World Cup victory with Mohamed Salah in top form against New Zealand.",
    "category": "CM 2026",
    "published_at": "2026-06-10T18:45:00Z",
    "image_url": "https://www.sport.ro/img/2026/06/10/063241/cm-2026.jpg?fm=jpg&q=80&fit=crop&crop=456%2C456%2C114%2C0&w=200",
    "url": "https://www.sport.ro/fotbal/cm-2026/egipt-mohamed-salah-victorie"
  },
  {
    "name": "Premier League: Manchester City câștigă dramatic în minutul 90",
    "description": "Manchester City secures a dramatic late win in the 90th minute against Arsenal.",
    "category": "Premier League",
    "published_at": "2026-06-20T21:00:00Z",
    "image_url": "https://www.sport.ro/img/2026/06/20/premier-league.jpg",
    "url": "https://www.sport.ro/fotbal/premier-league/manchester-city-arsenal"
  },
  {
    "name": "Atletism: Record mondial la maraton stabilit la Berlin",
    "description": "New world record set at the Berlin Marathon in an impressive performance.",
    "category": "Atletism",
    "published_at": "2026-06-15T08:20:00Z",
    "image_url": "https://www.sport.ro/img/2026/06/15/atletism-berlin.jpg",
    "url": "https://www.sport.ro/sporturi/atletism/record-mondial-maraton-berlin"
  }
];

module.exports = async ({ category = '' }) => {
  let results = MOCK_DATA;

  // Filter by category if provided
  if (category && category.trim()) {
    const filterCategory = category.trim();
    results = MOCK_DATA.filter(article => article.category === filterCategory);
  }

  const count = results.length;
  const contentText = category
    ? `Found ${count} ${category} article${count !== 1 ? 's' : ''}.`
    : `Found ${count} recent sports news article${count !== 1 ? 's' : ''}.`;

  return {
    content: [
      { type: 'text', text: contentText }
    ],
    // structuredContent.news — bare array outputSchema; key derived from actionName "search_news"
    structuredContent: {
      news: results
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/news?category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the sports news API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/news${category ? `?category=${encodeURIComponent(category)}` : ''}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */