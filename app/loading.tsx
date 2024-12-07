import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="p-5 rounded-lg border">
        <Loader2 className="animate-spin mx-auto" />
        <p className="text-center">Loading</p>
      </div>
    </div>
  );
};

export default LoadingPage;
