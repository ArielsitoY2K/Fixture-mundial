const https = require('https');

module.exports = async function handler(req, res) {
    const API_KEY = process.env.SPORTS_API_KEY;
    // Si la tabla de posiciones se obtiene con /groups, cambia 'standings' por 'groups' aquí abajo
    const url = 'https://v2.football.sportsapipro.com/api/world-cup-2026/standings';

    const options = {
        headers: {
            'x-api-key': API_KEY,
            'Accept': 'application/json',
            'User-Agent': 'VercelServerlessFunction'
        },
        timeout: 10000
    };

    return new Promise((resolve) => {
        https.get(url, options, (apiResponse) => {
            let data = '';

            apiResponse.on('data', (chunk) => {
                data += chunk;
            });

            apiResponse.on('end', () => {
                if (apiResponse.statusCode !== 200) {
                    return resolve(res.status(apiResponse.statusCode).json({ 
                        error: `La API respondió con código ${apiResponse.statusCode}. Detalle: ${data.substring(0, 120)}` 
                    }));
                }
                try {
                    const jsonData = JSON.parse(data);
                    return resolve(res.status(200).json(jsonData));
                } catch (e) {
                    return resolve(res.status(500).json({ error: "La API respondió, pero los datos no eran un JSON válido." }));
                }
            });

        }).on('error', (err) => {
            return resolve(res.status(500).json({ 
                error: `Fallo de conexión en el servidor: ${err.message} [Código: ${err.code}]` 
            }));
        });
    });
};
