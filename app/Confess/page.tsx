import Navbar from "../components/Navbar";
import ConfessAndShowVerdict from "../components/ConfessAndShowVerdict";

export default function Confess() {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col gap-y-10 w-full items-center justify-center mt-10">
        <div className="flex flex-col gap-y-2 w-fit text-center">
          <h1 className="text-[#F5BD1E] font-bold text-4xl">Confess!</h1>
          <hr className="bg-[#F5BD1E] h-2 rounded-full border-0" />
        </div>
        <div className="flex flex-col w-full justify-center gap-y-5">
          <ConfessAndShowVerdict />
        </div>
      </div>
    </>
  );
}
