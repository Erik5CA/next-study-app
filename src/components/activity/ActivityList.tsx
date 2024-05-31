import ListMessagesActivity from "./ListMessagesActivity";

function ActivityList({ query }: { query: string }) {
  return (
    <div className="hidden md:block bg-emerald-700 rounded-md h-min sticky top-4">
      <h3 className="bg-emerald-900 uppercase text-sm p-3 rounded-t-md">
        Recent Activities
      </h3>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <ListMessagesActivity query={query} />
      {/* </Suspense> */}
    </div>
  );
}

export default ActivityList;
