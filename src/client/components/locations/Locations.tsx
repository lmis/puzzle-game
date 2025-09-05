import { AgentBrautkleid } from "@/client/components/locations/AgentBrautkleid";
import { AgentStoppschild } from "@/client/components/locations/AgentStoppschild";
import { Agents } from "@/client/components/locations/Agents";
import { Ashtray } from "@/client/components/locations/Ashtray";
import { Briefcase } from "@/client/components/locations/Briefcase";
import { CoffeeCup } from "@/client/components/locations/CoffeCup";
import { Help } from "@/client/components/locations/Help";
import { Introduction } from "@/client/components/locations/Introduction";
import { Safehouse } from "@/client/components/locations/Safehouse";
import { Terminal } from "@/client/components/locations/terminal/Terminal";

export const Locations = () => (
  <>
    <Introduction />
    <Safehouse />
    <Agents />
    <AgentBrautkleid />
    <AgentStoppschild />
    <Ashtray />
    <Briefcase />
    <CoffeeCup />
    <Terminal />
    <Help />
  </>
);
