import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center h-80 bg-slate-500 w-full">
        <h2 className={`text-white font-bold text-3xl`}>Casting, simplified.</h2>
      </div>
      <div className={`flex flex-col max-w-[1440px] w-full mx-auto`}>
        <div className={`my-12 flex flex-row items-center w-full`}>
          <div className={`mx-12 flex flex-col items-center h-72 bg-sky-500 w-1/2 text-white p-4 py-8`}>
            <h3 className={`font-bold text-xl`}>Performers</h3>
            <p>
              <ul className={`mt-8 text-left flex flex-col gap-4`}>
                <li>- Audition for projects, apply for rosters</li>
                <li>- Easy reference to pay rates, AI protections, and more</li> 
                <li>- Host demos and embed them in your website</li>
                <li>- Prove your identity via cross-reference verification</li>
              </ul>
            </p>
          </div>
          <div className={`mx-12 flex flex-col items-center h-72 bg-emerald-500 w-1/2 text-white p-4 py-8`}>
            <h3 className={`font-bold text-xl`}>Project Managers/Directors</h3>
            <p>
              <ul className={`mt-8 text-left flex flex-col gap-4`}>
                <li>- Create standardized casting calls, attract professional talent</li>
                <li>- Ensure auditions are properly formatted and named</li>
                <li>- Create and manage talent rosters for future projects</li>
                <li>- Integrate with existing tools in your workflow</li>
              </ul>
            </p>
          </div>
        </div>
        <div>
          Additional text/content here
        </div>
      </div>
      
    </main>
  );
}