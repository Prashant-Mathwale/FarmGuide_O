import { useState } from 'react';
import api from '../services/api';
import { UploadCloud } from 'lucide-react';

function DiseaseDetect() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
            setResult(null); // reset prior result
        }
    };

    const handleDetect = async () => {
        if (!selectedImage) return;
        setLoading(true);
        try {
            // In real scenario we use FormData app.post with multipart/form-data
            const res = await api.post('/ml/disease-detect', {});
            setResult(res.data);
        } catch (err) {
            alert('Detection failed');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto mt-8">
            <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-red-600">Crop Disease Detection</h2>

                <div className="mb-6 flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Crop Leaf" className="max-h-64 object-contain rounded" />
                    ) : (
                        <div className="text-center">
                            <UploadCloud size={48} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-500">Tap to upload a leaf image</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute opacity-0 w-full h-full cursor-pointer"
                        style={previewUrl ? { display: 'none' } : {}}
                    />
                </div>

                {previewUrl && !result && (
                    <button onClick={handleDetect} disabled={loading} className="w-full btn-primary bg-red-600 hover:bg-red-700 text-lg">
                        {loading ? 'Analyzing Image...' : 'Detect Disease'}
                    </button>
                )}

                {result && (
                    <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
                        <h3 className="text-xl font-bold text-red-800 mb-2">Detection Result</h3>
                        <p className="text-lg"><strong>Disease:</strong> {result.detectedDisease} ({(result.confidenceScore * 100).toFixed(1)}%)</p>
                        <div className="mt-4 p-3 bg-white rounded border border-red-100">
                            <span className="font-bold text-gray-700 block mb-1">Recommended Action:</span>
                            <p className="text-gray-800">{result.suggestedAction}</p>
                        </div>
                        <button onClick={() => { setPreviewUrl(null); setResult(null); }} className="mt-4 w-full p-2 text-red-600 font-medium hover:underline text-center rounded">
                            Scan Another Leaf
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DiseaseDetect;
