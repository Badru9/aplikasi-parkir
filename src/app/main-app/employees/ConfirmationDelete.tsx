import { deletePegawai } from "@/app/services/pegawai";

export default function ConfirmationDialog({ data, setOpen }: any) {
  console.log(data);

  const handleDelete = async () => {
    console.log(data);
    setOpen(false);

    await deletePegawai(data.id);

    if (window !== undefined) window.location.reload();
  };

  return (
    <div className="flex items-center justify-center gap-3 w-full h-full bg-black/30 fixed overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-3 bg-white p-10 rounded-2xl shadow-md">
        <p className="text-xl text-black">
          Are you sure want to delete{" "}
          <span className="text-primary font-semibold">{data.nama}</span>?
        </p>
        <div className="flex gap-2 self-end">
          <button
            onClick={handleDelete}
            className="text-black px-5 py-1 rounded-full"
          >
            Yes
          </button>
          <button
            onClick={() => setOpen(false)}
            className="bg-primary text-white px-5 py-1 rounded-full"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
