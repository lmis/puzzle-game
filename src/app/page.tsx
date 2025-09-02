import { Game } from "@/client/components/Game";
import { MobileNotice } from "@/client/components/notices/MobileNotice";

export default async function Page() {
  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden">
      <MobileNotice />
      <Game />
    </main>
  );
}
