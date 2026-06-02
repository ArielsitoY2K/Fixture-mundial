export default async function handler(req, res) {
    const API_KEY = process.env.SPORTS_API_KEY;
    const API_URL = 'https://api.sportsapipro.com/v2/football/world-cup-2026/standings';

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Error de SportsApiPro: ${response.statusText}` });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno en el servidor backend' });
    }
}