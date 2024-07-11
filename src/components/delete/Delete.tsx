function Delete({
  name,
  id,
  action,
}: {
  name: string;
  id: number;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className=" bg-emerald-700 rounded-md">
      <h3 className="bg-emerald-900 uppercase text-sm p-3 rounded-t-md">
        Back
      </h3>

      <form className="p-6 text-xl flex flex-col items-center" action={action}>
        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold italic">{name}</span>
        </p>
        <input type="hidden" name="roomId" value={id} />

        <button className="bg-teal-600 py-2 px-4 shadow-md text-base text-slate-200 rounded-md mt-5 hover:bg-teal-700">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default Delete;
