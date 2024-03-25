import Sidebar from "./components/Sidebar";

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between relative p-10">
      <Sidebar />
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ab
          vitae praesentium tenetur delectus quam temporibus quo! Quo,
          distinctio explicabo.{" "}
        </p>
      </div>
    </main>
  );
}
