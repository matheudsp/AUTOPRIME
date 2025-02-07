import { ClipLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex min-h-screen w-full flex-grow flex-col items-center justify-center bg-background">
      <ClipLoader color="#f97316" size={40} />
    </div>
  );
};

export default Loading;
