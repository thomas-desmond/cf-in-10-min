import ServiceStatus from "./ServiceStatus";
import NextJsAiTest from "./TestComponent";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-24">
      <ServiceStatus />
    </main>
  );
}
