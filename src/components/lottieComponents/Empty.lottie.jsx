import Lottie from "lottie-react";
import EmptyJson from "../../lottie/empty.json";
import React from "react";

const EmptyLottie = () => {
  return (
    <div className="w-[300px] h-[300px]">
      <Lottie animationData={EmptyJson} loop />
    </div>
  );
};

export default EmptyLottie;
