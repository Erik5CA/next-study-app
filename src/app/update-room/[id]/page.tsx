import FormRoom from "@/components/room/FormRoom";

function UpdateRoom({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  console.log(id);
  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <FormRoom id={id} />
    </div>
  );
}

export default UpdateRoom;
