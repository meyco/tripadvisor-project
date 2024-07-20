import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
    const apiKey = 'DE95C1878588466BACE05BB222F1B143'; // Please enter your API key here.
    let latitude = req.query.lat;//get latitude from hstml
    let longitude = req.query.lon;//get latitude from html

    const urlSearch = `https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${apiKey}&category=attractions&radius=5&radiusUnit=km&language=en`;
    
    try {
        const response = await fetch(urlSearch, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const TripAdvserData = await response.json();
        res.json(TripAdvserData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
