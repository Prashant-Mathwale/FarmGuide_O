import { useState } from 'react';
import api from '../services/api';

function CropRec() {
    const [formData, setFormData] = useState({ N_level: '', P_level: '', K_level: '', pH_value: '', moisture: '' });
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/ml/crop-recommendation', formData);
            setRecommendations(res.data.recommendedCrops);
        } catch (err) {
            alert('Error fetching recommendation');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)]">Soil Based Crop Recommendation</h2>

                {!recommendations ? (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium">Nitrogen (N)</label>
                                <input name="N_level" type="number" onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. 90" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phosphorus (P)</label>
                                <input name="P_level" type="number" onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. 42" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Potassium (K)</label>
                                <input name="K_level" type="number" onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. 43" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">pH Value</label>
                                <input name="pH_value" type="number" step="0.1" onChange={handleChange} required className="w-full p-2 border rounded" placeholder="e.g. 6.5" />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full btn-primary text-lg mt-4">
                            {loading ? 'Analyzing...' : 'Get Recommendation'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">Recommended Crops</h3>
                        <ul className="space-y-3">
                            {recommendations.map((crop, idx) => (
                                <li key={idx} className="bg-green-100 text-green-800 p-4 rounded text-lg font-medium shadow-sm">
                                    {crop}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setRecommendations(null)} className="mt-6 text-[var(--color-primary)] underline">
                            Check Another Context
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CropRec;
