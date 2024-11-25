export default function SmartphoneCard({ smartphone }) {
  return (
    <div className="border rounded p-4 shadow-md">
      <img
        src={smartphone.image}
        alt={smartphone.model}
        className="w-48 h-48 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{smartphone.model}</h2>
      <p className="text-gray-700">Brand: {smartphone.brand}</p>
      <p className="text-gray-700">Price: ${smartphone.price.toFixed(2)}</p>
      <p className="text-gray-700">Processor: {smartphone.processor}</p>
      <p className="text-gray-700">Storage & RAM: {smartphone.storageAndRam}</p>
      <p className="text-gray-700">Camera: {smartphone.camera}</p>
    </div>
  );
}
