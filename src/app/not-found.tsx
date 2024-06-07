import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[85vh]">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <h2 className="text-4xl font-bold">404</h2>
      <Link href="/" className="text-emerald-600 text-base hover:underline">
        Go to Main
      </Link>
    </div>
  );
}

export default NotFound;
