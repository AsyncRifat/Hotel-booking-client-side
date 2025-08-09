import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const DhakaLocation = () => {
  return (
    <div className="min-h-[520px] flex flex-col items-center justify-center bg-gradient-to-r from-[#eff7f7] to-teal-50 px-3 md:px-0">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 openSans text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📍 Our Hotel Location
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-6 text-lg text-center max-w-xl montserrat"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Visit us in the heart of{' '}
        <span className="font-semibold text-amber-700">Dhaka</span>, Bangladesh.
        Book now for the best experience!
      </motion.p>

      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl border-4 border-gray-300">
        <MapContainer
          center={[23.7496, 90.3941]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[23.7496, 90.3941]} icon={customIcon}>
            <Popup className="font-semibold text-center text-amber-700">
              Our Hotel 📌 <br /> Dhaka, Bangladesh
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default DhakaLocation;
