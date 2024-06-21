import Image from "next/image";
import loadingImage from "./icon.png";

export default function Loading() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-myCustom-textPrimary">
      <Image
        src={loadingImage}
        alt="loading"
        width="100"
        height="100"
        className="object-fit animate-bounce"
      />
    </main>
  );
}
