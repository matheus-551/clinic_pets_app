import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <div className="w-screen h-screen flex bg-white">
        {/* SIDEBAR (somente desktop) */}
        <Sidebar />

        <div className="flex flex-col w-full">
          {/* NAVBAR MOBILE */}
          <Navbar />

          <main className="pt-4 pb-8 px-4 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
