import Lottie from "lottie-react";
import loaderAnimation from "./loader.json";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie
        className="max-w-[400px]"
        loop={true}
        autoplay={true}
        animationData={loaderAnimation}
      />
      <span className="text-sm mt-4 text-center">
        Please wait while we fetch the latest updates...
      </span>
    </div>
  );
};

export default Loading;
