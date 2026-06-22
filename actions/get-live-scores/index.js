// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block at the bottom of this file for endpoint details.
const MOCK_DATA = [
  {
    league: "Premier League",
    matches: [
      { home_team: "Arsenal", away_team: "Chelsea", score: "2-1", kick_off_time: "15:00", status: "live" },
      { home_team: "Liverpool", away_team: "Man United", score: "3-2", kick_off_time: "17:30", status: "finished" },
      { home_team: "Man City", away_team: "Tottenham", score: "-", kick_off_time: "20:00", status: "scheduled" }
    ]
  },
  {
    league: "La Liga",
    matches: [
      { home_team: "Barcelona", away_team: "Real Madrid", score: "1-1", kick_off_time: "18:00", status: "live" },
      { home_team: "Atletico", away_team: "Sevilla", score: "2-0", kick_off_time: "16:00", status: "finished" }
    ]
  },
  {
    league: "Bundesliga",
    matches: [
      { home_team: "Bayern Munich", away_team: "Dortmund", score: "3-1", kick_off_time: "14:30", status: "finished" }
    ]
  }
];

module.exports = async ({ date = '' }) => {
  // date parameter is optional — defaults to today's date if omitted
  const targetDate = date.trim() || new Date().toISOString().split('T')[0];

  // TODO: In production, fetch live scores from the real API using targetDate
  // For now, return MOCK_DATA filtered by date if needed

  const allLeagues = MOCK_DATA;

  // Count total matches across all leagues
  const totalMatches = allLeagues.reduce((sum, league) => sum + league.matches.length, 0);
  const liveCount = allLeagues.reduce((sum, league) => 
    sum + league.matches.filter(m => m.status === 'live').length, 0);

  const contentText = liveCount > 0
    ? `Found ${totalMatches} football matches across ${allLeagues.length} leagues. ${liveCount} matches are currently live.`
    : `Found ${totalMatches} football matches across ${allLeagues.length} leagues for ${targetDate}.`;

  return {
    content: [{ type: 'text', text: contentText }],
    // structuredContent.scores — bare array outputSchema; key derived from actionName "get_live_scores"
    structuredContent: { scores: allLeagues }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual sports API):
 *   GET ${process.env.API_BASE_URL}/scores?date=${date}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the sports data API
 *   API_KEY        API key for authentication (add to .env and app.config.yaml)
 *
 * Authentication: check the API provider's documentation for the correct
 *   auth header pattern (e.g., X-API-Key, Authorization: Bearer token).
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/scores?date=${encodeURIComponent(date)}`,
 *     { headers: { 'X-API-Key': process.env.API_KEY } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.leagues // adjust based on actual API response shape
 */