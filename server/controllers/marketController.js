const axios = require('axios');
const MarketData = require('../models/MarketData');

const getMarketPrices = async (req, res) => {
    const { cropName, stateName, districtName } = req.query;

    // The data.gov.in endpoint for daily mandi prices
    const apiUrl = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
    const apiKey = process.env.DATA_GOV_API_KEY;

    try {
        // 1. Try to find recent data in our local MongoDB cache (last 24 hours)
        const cacheWindow = new Date(Date.now() - 24 * 60 * 60 * 1000);
        let prices = await MarketData.find({
            ...(cropName && { cropName: new RegExp(cropName, 'i') }),
            ...(stateName && { stateName: new RegExp(stateName, 'i') }),
            ...(districtName && { districtName: new RegExp(districtName, 'i') }),
            createdAt: { $gte: cacheWindow }
        });

        // 2. If recent data exists in cache, return it
        if (prices.length > 0) {
            return res.json({ success: true, source: 'cache', data: prices });
        }

        // 3. If no recent data and API key is not configured, fall back to mock data
        if (!apiKey || apiKey === 'your_api_key_here') {
            const mockData = [
                { cropName: cropName || 'Wheat', marketName: 'Local Mandi 1', districtName: districtName || 'Pune', stateName: stateName || 'Maharashtra', minPrice: 2000, maxPrice: 2200, modalPrice: 2100 },
                { cropName: cropName || 'Wheat', marketName: 'Regional Market', districtName: districtName || 'Pune', stateName: stateName || 'Maharashtra', minPrice: 1950, maxPrice: 2300, modalPrice: 2150 }
            ];
            return res.json({ success: true, source: 'mock', data: mockData });
        }

        // 4. If API key exists, fetch from data.gov.in
        // Build filters for the api.data.gov.in request
        // The API supports filters like filters[state]=Maharashtra
        const params = {
            'api-key': apiKey,
            format: 'json',
            limit: 50, // Limit to recent 50 to avoid massive payloads
        };

        // Capitalize the first letter of each word to match data.gov exactness
        const toTitleCase = (str) => {
            return str.toLowerCase().split(' ').map(function (word) {
                return (word.charAt(0).toUpperCase() + word.slice(1));
            }).join(' ');
        }

        if (stateName) params['filters[state]'] = toTitleCase(stateName);
        if (districtName) params['filters[district]'] = toTitleCase(districtName);
        if (cropName) params['filters[commodity]'] = toTitleCase(cropName);

        const response = await axios.get(apiUrl, { params });

        if (response.data && response.data.records) {
            // 5. Transform their ugly array of objects into our cleaner schema
            const parseDate = (dateString) => {
                if (!dateString) return new Date();
                const parts = dateString.split('/');
                if (parts.length === 3) {
                    return new Date(parts[2], parts[1] - 1, parts[0]);
                }
                return new Date(dateString);
            };

            const newPrices = response.data.records.map(record => ({
                cropName: record.commodity,
                marketName: record.market,
                districtName: record.district,
                stateName: record.state,
                minPrice: parseInt(record.min_price),
                maxPrice: parseInt(record.max_price),
                modalPrice: parseInt(record.modal_price),
                recordedDate: parseDate(record.arrival_date)
            }));

            // 6. Save to our MongoDB cache
            if (newPrices.length > 0) {
                await MarketData.insertMany(newPrices);
                return res.json({ success: true, source: 'api', data: newPrices });
            }
        }

        // 7. If API returned no results but didn't error
        res.json({ success: true, source: 'api', data: [] });

    } catch (error) {
        console.error("Market API Error:", error.message);
        res.status(500).json({ success: false, message: 'Failed to fetch market prices' });
    }
};

module.exports = { getMarketPrices };
