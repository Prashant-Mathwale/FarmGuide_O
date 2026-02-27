import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Tag } from 'lucide-react';
import api from '../services/api';

function MarketPrices() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ cropName: '', districtName: '' });

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const res = await api.get('/market/prices', { params: filters });
            setTimeout(() => {
                setPrices(res.data.data);
                setLoading(false);
            }, 600);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
    }, []);

    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    return (
        <div className="w-full max-w-6xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Market Intelligence</h2>
                    <p className="text-slate-400 text-lg">Real-time commodity spot prices across regional agricultural markets.</p>
                </div>

                <div className="flex gap-3 bg-slate-800/80 p-2 rounded-xl border border-slate-700/50 backdrop-blur-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text" name="cropName" placeholder="Commodity" value={filters.cropName} onChange={handleFilterChange}
                            className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 w-40"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text" name="districtName" placeholder="District" value={filters.districtName} onChange={handleFilterChange}
                            className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 w-40"
                        />
                    </div>
                    <button onClick={fetchPrices} className="bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-2 rounded-lg font-medium text-sm shadow-lg shadow-blue-500/20">
                        Query Model
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {prices.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={item._id || idx}
                            className="glass-card p-6"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white flex items-center">
                                        <Tag className="mr-2 text-blue-500" size={20} />
                                        {item.cropName}
                                    </h3>
                                    <p className="text-sm text-slate-400 flex items-center mt-1">
                                        <MapPin className="mr-1 opacity-70" size={14} /> {item.marketName}, {item.districtName}
                                    </p>
                                </div>
                                <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                                    {new Date(item.recordedDate || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-slate-700/50 pt-5">
                                <div className="text-center">
                                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Low</span>
                                    <span className="font-semibold text-slate-300">₹{item.minPrice}<span className="text-[10px] text-slate-500">/qtl</span></span>
                                </div>
                                <div className="text-center transform scale-110">
                                    <span className="block text-[10px] text-blue-400 uppercase tracking-widest font-bold mb-1">Modal</span>
                                    <span className="text-xl font-bold text-white bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20">₹{item.modalPrice}<span className="text-xs font-normal opacity-70">/qtl</span></span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">High</span>
                                    <span className="font-semibold text-slate-300">₹{item.maxPrice}<span className="text-[10px] text-slate-500">/qtl</span></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {prices.length === 0 && (
                        <div className="col-span-full h-40 flex items-center justify-center text-slate-500 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                            No aggregate data found for the specified query parameters.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MarketPrices;
