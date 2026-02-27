import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Register({ setAuthUser }) {
    const [formData, setFormData] = useState({
        fullName: '', phone: '', password: '', state: '', district: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', formData);
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            setAuthUser(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-center text-[var(--color-primary)]">Farmer Registration</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Full Name</label>
                        <input name="fullName" type="text" onChange={handleChange} required className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Mobile Number</label>
                        <input name="phone" type="text" onChange={handleChange} required className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input name="password" type="password" onChange={handleChange} required className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4 flex space-x-2">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">State</label>
                            <input name="state" type="text" onChange={handleChange} required className="w-full p-2 border rounded" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium">District</label>
                            <input name="district" type="text" onChange={handleChange} required className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <button type="submit" className="w-full btn-primary text-lg mt-4">Register</button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-[var(--color-primary)] font-medium hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
