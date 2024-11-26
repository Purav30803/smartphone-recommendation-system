import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

const SmartphoneDetails = () => {
  const [smartphone, setSmartphone] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {

      fetch(`http://localhost:8080/api/smartphones/${id}`)
        .then((res) => res.json())
        .then((data) => setSmartphone(data));
    }
  }, [id]);

  if (!smartphone) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">{smartphone.brand} - {smartphone.model}</h1>
        <p><strong>Price:</strong> ${smartphone.price}</p>
        <p><strong>Processor:</strong> {smartphone.processor}</p>
        <p><strong>Camera:</strong> {smartphone.camera}</p>
        <p><strong>Storage:</strong> {smartphone.storageAndRam}</p>
        <p><strong>Operating System:</strong> {smartphone.operatingSystem}</p>
        <p><strong>Display:</strong> {smartphone.display}</p>
        <p><strong>Battery:</strong> {smartphone.batteryAndCharging}</p>
      </div>
    </div>
  );
};

export default SmartphoneDetails;
