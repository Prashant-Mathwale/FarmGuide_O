const SoilData = require('../models/SoilData');

const getCropRecommendation = async (req, res) => {
    const { N_level, P_level, K_level, pH_value, moisture } = req.body;
    try {
        // Save the input data
        const soilData = await SoilData.create({
            userId: req.user._id,
            N_level, P_level, K_level, pH_value, moisture
        });

        // Mock ML output
        const mockCrops = ['Wheat', 'Rice', 'Maize'];

        res.json({
            success: true,
            recommendedCrops: mockCrops,
            soilDataId: soilData._id
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const detectDisease = async (req, res) => {
    // In a real scenario, handle actual image upload (multer) and send to python ML model.
    try {
        // Mock ML output
        res.json({
            success: true,
            detectedDisease: 'Early Blight',
            confidenceScore: 0.92,
            suggestedAction: 'Apply Copper Oxychloride at 2g/L'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getCropRecommendation, detectDisease };
