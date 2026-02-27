import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import api from '../services/api';

function Login({ setAuthUser }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { phone, password });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            setAuthUser(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
            <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-emerald-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-teal-600/20 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10 glass-panel p-8"
            >
                <div className="flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                        <Sprout size={32} className="text-white" />
                    </Link>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Log in to manage your smart farm</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center justify-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Mobile Number</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. 9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary text-lg mt-2">
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                        Create an account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;
