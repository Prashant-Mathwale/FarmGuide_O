import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import api from '../services/api';

function Register({ setAuthUser }) {
    const [formData, setFormData] = useState({
        fullName: '', phone: '', password: '', state: '', district: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/register', formData);
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            setAuthUser(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 py-12">
            <div className="absolute top-1/4 right-1/4 w-[30vw] h-[30vw] bg-emerald-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] bg-teal-600/20 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg z-10 glass-panel p-8"
            >
                <div className="flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                        <Sprout size={24} className="text-white" />
                    </Link>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Create an Account</h2>
                    <p className="text-slate-400 mt-2 text-sm">Join the next generation of farming</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input name="fullName" type="text" onChange={handleChange} required className="input-field py-2.5" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Mobile Number</label>
                        <input name="phone" type="text" onChange={handleChange} required className="input-field py-2.5" placeholder="9876543210" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input name="password" type="password" onChange={handleChange} required className="input-field py-2.5" placeholder="Create a strong password" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">State</label>
                            <input name="state" type="text" onChange={handleChange} required className="input-field py-2.5" placeholder="Maharashtra" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">District</label>
                            <input name="district" type="text" onChange={handleChange} required className="input-field py-2.5" placeholder="Pune" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary text-lg mt-4 shadow-emerald-500/30">
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                        Log in instead
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Register;
