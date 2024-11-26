import React from "react";
import SmartphoneCard from "./SmartphoneCard";

const RecommendationList = ({ recommendations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {recommendations?.map((smartphone) => (
        <SmartphoneCard key={smartphone._id} smartphone={smartphone} />
      ))}
    </div>
  );
};

export default RecommendationList;
