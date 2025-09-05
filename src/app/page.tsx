import { Game } from "@/client/components/Game";
import { MobileNotice } from "@/client/components/notices/MobileNotice";

const Page = async () => (
  <main className="h-screen w-screen overflow-hidden">
    <MobileNotice />
    <Game />
  </main>
);

export default Page;
