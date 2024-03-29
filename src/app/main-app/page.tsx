import Sidebar from "./components/Sidebar";

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between relative p-10">
      <Sidebar />
      <div className="flex w-full pl-40 py-10 bg-teal-500 min-h-screen">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat,
          quam.
        </p>
      </div>
    </main>
  );
}
