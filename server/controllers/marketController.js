const MarketData = require('../models/MarketData');

const getMarketPrices = async (req, res) => {
    const { cropName, stateName, districtName } = req.query;
    try {
        // Creating some mock data if collection is empty
        let prices = await MarketData.find({
            ...(cropName && { cropName: new RegExp(cropName, 'i') }),
            ...(stateName && { stateName: new RegExp(stateName, 'i') }),
            ...(districtName && { districtName: new RegExp(districtName, 'i') })
        });

        if (prices.length === 0) {
            prices = [
                { cropName: cropName || 'Wheat', marketName: 'Local Mandi 1', districtName: districtName || 'Pune', stateName: stateName || 'Maharashtra', minPrice: 2000, maxPrice: 2200, modalPrice: 2100 },
                { cropName: cropName || 'Wheat', marketName: 'Regional Market', districtName: districtName || 'Pune', stateName: stateName || 'Maharashtra', minPrice: 1950, maxPrice: 2300, modalPrice: 2150 }
            ];
        }

        res.json({ success: true, data: prices });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getMarketPrices };
