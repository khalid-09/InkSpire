import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="mb-10 mt-10 flex w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />;
    </div>
  );
};

export default LoadingSpinner;
