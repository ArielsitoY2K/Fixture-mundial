export default async function handler(req, res) {
     Recuperamos la API KEY oculta en las variables de entorno de Vercel
    const API_KEY = process.env.SPORTS_API_KEY;
    const API_URL = 'httpsapi.sportsapipro.comv2footballworld-cup-2026fixtures';

    try {
        const response = await fetch(API_URL, {
            headers {
                'Authorization' `Bearer ${API_KEY}`,
                'Accept' 'applicationjson'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error `Error de SportsApiPro ${response.statusText}` });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error 'Error interno en el servidor backend' });
    }
}