import { useRouter } from "next/router";
import '../../app/global.css';
export default function SmartphoneDetail({ smartphone }) {
  const router = useRouter();
  const { id } = router.query;

  if (!smartphone) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold">Smartphone Details</h1>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-6">
          {/* Image and Basic Details */}
          <img
            src={smartphone.image}
            alt={smartphone.model}
            className="w-full h-96 object-cover rounded-xl mb-6"
          />
          <h2 className="text-4xl font-bold mb-4">{smartphone.model}</h2>
          <p className="text-gray-400 text-lg mb-4">Brand: {smartphone.brand}</p>
          <p className="text-lg text-white mb-6">Price: ${smartphone.price}</p>

          {/* Detailed Specifications */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4">Specifications</h3>
            <ul className="text-gray-300 space-y-4">
              <li>
                <strong>Processor:</strong> {smartphone.processor}
              </li>
              <li>
                <strong>Storage and RAM:</strong> {smartphone.storageAndRam}
              </li>
              <li>
                <strong>Dimensions:</strong> {smartphone.dimensions}
              </li>
              <li>
                <strong>Display:</strong> {smartphone.display}
              </li>
              <li>
                <strong>Camera:</strong> {smartphone.camera}
              </li>
              <li>
                <strong>Battery & Charging:</strong> {smartphone.batteryAndCharging}
              </li>
              <li>
                <strong>Sensors:</strong> {smartphone.sensors}
              </li>
              <li>
                <strong>Operating System:</strong> {smartphone.operatingSystem}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`http://127.0.0.1:8080/api/smartphones/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch smartphone details");
    }

    const smartphone = await res.json();
    return { props: { smartphone } };
  } catch (error) {
    console.error(error);
    return { props: { smartphone: null } };
  }
}
