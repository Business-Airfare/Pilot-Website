import HeroScrub from "./components/HeroScrub";

export default function Home() {
  return (
    <>
      <HeroScrub />
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-24 text-white">
        <h1 className="text-4xl font-bold tracking-tight">Business Airfare</h1>
        <p className="mt-4 text-lg text-neutral-400">
          Landing page — section-by-section build
        </p>
      </main>
    </>
  );
}
