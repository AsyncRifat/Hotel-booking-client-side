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
    <div className="min-h-[400px]  grid grid-cols-1 md:grid-cols-9 px-3 md:px-16 gap-16">
      <div className="md:col-span-4 place-content-center">
        <motion.h1
          className="text-5xl jost mt-14 mb-5 text-black text-center font-semibold px-3 md:px-0"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          📍 Our Hotel Location
        </motion.h1>

        <motion.p
          className="text-gray-500 text-center jost px-3 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Visit us in the heart of{' '}
          <span className="font-semibold text-amber-700">Dhaka</span>,
          Bangladesh. Book now for the best experience!
        </motion.p>
      </div>

      <div className=" md:col-span-5 md:ml-20 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-300">
        <MapContainer
          center={[23.7496, 90.3941]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%' }}
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
