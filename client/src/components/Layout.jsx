import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, user, setUser }) => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-transparent">
            <Sidebar user={user} setUser={setUser} />
            <div className="flex-1 ml-64 p-8 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full z-10"
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Layout;
