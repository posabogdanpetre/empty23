const MOCK_DATA = [
  {
    name: "Transferul e în pericol! Gigi Becali a aflat pretențiile fotbalistului dorit la FCSB",
    description: "FCSB transfer saga as Gigi Becali discovers the demands of his target player.",
    image_url: "https://www.sport.ro/img/2026/06/14/201318/becali-9.png?fm=jpg&q=80&fit=crop&crop=1920%2C1080%2C0%2C0&w=1280",
    category: "Liga 1",
    author: "Adrian Popescu",
    published_at: "2026-06-14T10:30:00Z",
    url: "https://www.sport.ro/liga-1/transferul-e-in-pericol-gigi-becali-a-aflat-pretentiile-fotbalistului-dorit-la-fcsb.html"
  },
  {
    name: "Egipt, cu Mohamed Salah în formă, a reușit prima sa victorie la Campionatul Mondial",
    description: "Egypt achieves its first-ever World Cup victory with Mohamed Salah in top form against New Zealand.",
    image_url: "https://www.sport.ro/img/2026/06/10/063241/cm-2026.jpg?fm=jpg&q=80&fit=crop&crop=456%2C456%2C114%2C0&w=200",
    category: "CM 2026",
    author: "Maria Ionescu",
    published_at: "2026-06-10T18:45:00Z",
    url: "https://www.sport.ro/cm-2026/egipt-cu-mohamed-salah-in-forma-a-reusit-prima-sa-victorie-la-campionatul-mondial.html"
  }
];

module.exports = async ({ name = '' }) => {
  if (!name || typeof name !== 'string' || !name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide the name of the article you want to retrieve.' }]
    };
  }

  const query = name.trim().toLowerCase();
  const article = MOCK_DATA.find(item => item.name.toLowerCase().includes(query));

  if (!article) {
    return {
      content: [{ type: 'text', text: `No article found matching: ${name}` }]
    };
  }

  return {
    content: [{ 
      type: 'text', 
      text: `Found article: ${article.name} by ${article.author || 'Unknown'} in ${article.category || 'Sports'}. Published ${article.published_at || 'recently'}.` 
    }],
    structuredContent: { ...article }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/articles?name=${encodeURIComponent(name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/articles/search?q=${encodeURIComponent(name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API (e.g., https://api.sport.ro/v1)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/articles/search?q=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data.articles && data.articles[0] ? data.articles[0] : null;
 */