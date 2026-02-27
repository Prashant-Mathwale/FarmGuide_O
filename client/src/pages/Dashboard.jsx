import { Link } from 'react-router-dom';
import { Sprout, Bug, TrendingUp, Sun } from 'lucide-react';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Welcome, {user?.fullName}!</h2>
            <p className="mb-8 text-lg text-gray-700">What would you like to do today?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/crop-rec" className="card hover:shadow-lg transition flex flex-col items-center justify-center p-8 text-center border-t-4 border-[var(--color-primary)]">
                    <Sprout size={48} className="text-[var(--color-primary)] mb-4" />
                    <h3 className="text-xl font-bold">Crop Recommendation</h3>
                    <p className="text-gray-600 mt-2">Get smart crop suggestions based on soil and weather.</p>
                </Link>

                <Link to="/disease-detect" className="card hover:shadow-lg transition flex flex-col items-center justify-center p-8 text-center border-t-4 border-red-500">
                    <Bug size={48} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-bold">Disease Detection</h3>
                    <p className="text-gray-600 mt-2">Upload a leaf image to instantly detect plant diseases.</p>
                </Link>

                <Link to="/market-prices" className="card hover:shadow-lg transition flex flex-col items-center justify-center p-8 text-center border-t-4 border-blue-500">
                    <TrendingUp size={48} className="text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold">Market Prices</h3>
                    <p className="text-gray-600 mt-2">Check the latest prices from nearby mandis.</p>
                </Link>

                <div className="card hover:shadow-lg transition flex flex-col items-center justify-center p-8 text-center border-t-4 border-yellow-500 cursor-not-allowed opacity-80">
                    <Sun size={48} className="text-yellow-500 mb-4" />
                    <h3 className="text-xl font-bold">Weather Advisory (Coming Soon)</h3>
                    <p className="text-gray-600 mt-2">Get hyper-local weather alerts for your farm.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
