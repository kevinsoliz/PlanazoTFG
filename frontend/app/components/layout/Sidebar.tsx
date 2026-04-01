const Sidebar = () => {
  return (
    <section className="border flex-1 flex flex-col items-center py-4 pr-4 gap-7">
      <header className="border flex flex-col items-center gap-1">
        <div className="w-20 h-20 rounded-full bg-neutral/80 flex justify-center items-center mt-8 text-neutral-content">
          K
        </div>
        <span>
          <p className="text-md text-center font-bold">Kevin Soliz</p>
          <p className="text-xs text-center text-neutral/50">@kevin_soliz</p>
        </span>
      </header>
      <article className="border flex w-full justify-around">
        <div className="flex flex-col items-center">
          <p className="font-bold">472</p>
          <p className="text-xs">Planes</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">12.4k</p>
          <p className="text-xs">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">228</p>
          <p className="text-xs">Following</p>
        </div>
      </article>
      <article className="border flex flex-wrap justify-center w-full gap-3">
        <span className="badge badge-primary">Aventura</span>
        <span className="badge badge-secondary">Cultura</span>
        <span className="badge badge-accent">Deporte</span>
        <span className="badge badge-neutral">Música</span>
        <span className="badge badge-outline">Gastronomía</span>
      </article>
      <article className="border w-full">
        <legend className="text-sm font-bold mb-1">Story Higlights</legend>
        <div className="flex justify-between flex-wrap">
          <section className="flex flex-col items-center" >
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
          <section className="flex flex-col items-center" >
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
          <section className="flex flex-col items-center" >
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabr</p>
          </section>
          <section className="flex flex-col items-center" >
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
          
          
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
