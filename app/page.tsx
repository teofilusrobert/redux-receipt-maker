import type { Metadata } from "next";
import { Ingredient } from "./components/Ingredient";
import { Receipt } from "./components/Receipt";

export default function IndexPage() {
  return (
    <div>
      <div className="flex gap-4 p-4 flex-col sm:flex-row">
        <Ingredient />
        <Receipt />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Receipt Maker",
};
