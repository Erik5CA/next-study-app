import ListMessagesActivity from "@/components/activity/ListMessagesActivity";

function AvtivityPage() {
  return (
    <div className="p-4 flex justify-center items-center">
      <div className="bg-emerald-700 rounded-md">
        <h3 className="bg-emerald-900 uppercase text-sm p-3 rounded-t-md">
          Recent Activities
        </h3>
        <ListMessagesActivity query={""} />
      </div>
    </div>
  );
}

export default AvtivityPage;
