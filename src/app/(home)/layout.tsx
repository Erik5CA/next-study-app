import ActivityList from "@/components/activity/ActivityList";
import Topics from "@/components/topics/Topics";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-6 md:px-12 py-8 gap-4">
      <Topics />
      {children}
      <ActivityList />
    </main>
  );
}
