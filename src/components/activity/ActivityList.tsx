import Activity from "./Activity";

function ActivityList() {
  return (
    <div className="hidden md:block bg-emerald-700 rounded-md h-min sticky top-4">
      <h3 className="bg-emerald-900 uppercase text-sm p-3 rounded-t-md">
        Recent Activities
      </h3>

      <div className="p-3">
        <Activity />
        <Activity />
      </div>
    </div>
  );
}

export default ActivityList;
