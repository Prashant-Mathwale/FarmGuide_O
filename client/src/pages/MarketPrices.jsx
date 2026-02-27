import { useState, useEffect } from 'react';
import api from '../services/api';

function MarketPrices() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        cropName: '', districtName: ''
    });

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const res = await api.get('/market/prices', { params: filters });
            setPrices(res.data.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Initial fetch
        fetchPrices();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="card mb-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Live Market Prices</h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="cropName"
                        placeholder="Crop (e.g. Wheat)"
                        value={filters.cropName}
                        onChange={handleFilterChange}
                        className="flex-1 p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="districtName"
                        placeholder="District (e.g. Pune)"
                        value={filters.districtName}
                        onChange={handleFilterChange}
                        className="flex-1 p-2 border rounded"
                    />
                    <button onClick={fetchPrices} className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
                        Search
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center p-8 text-gray-500 font-medium">Fetching latest prices...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prices.map((item, idx) => (
                        <div key={idx} className="card border-l-4 border-blue-500">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{item.cropName}</h3>
                                    <p className="text-sm text-gray-500">{item.marketName}, {item.districtName}</p>
                                </div>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {new Date(item.recordedDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="text-center">
                                    <span className="block text-xs text-gray-500 uppercase">Min</span>
                                    <span className="font-medium text-red-500">₹{item.minPrice}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs text-gray-500 uppercase">Modal</span>
                                    <span className="text-lg font-bold text-[var(--color-primary)]">₹{item.modalPrice}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs text-gray-500 uppercase">Max</span>
                                    <span className="font-medium text-green-600">₹{item.maxPrice}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {prices.length === 0 && (
                        <p className="text-gray-500 text-center col-span-2">No data found for the selected filters.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default MarketPrices;
