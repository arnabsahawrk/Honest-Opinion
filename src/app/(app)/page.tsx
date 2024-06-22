import Slider from "@/components/custom/Slider";

export default function Home() {
  return (
    <main className="text-myCustom-textPrimary bg-myCustom-bgPrimary ">
      <section className="container mx-auto flex flex-grow flex-col items-center justify-center px-4 md:px-24 py-12 min-h-[calc(100vh-128px)]">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Send Your Thoughts, Your Opinion, With Complete Anonymity
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Honest Opinion - Where Your Identity Stays Anonymous.
          </p>
        </div>
        <Slider />
      </section>
    </main>
  );
}
