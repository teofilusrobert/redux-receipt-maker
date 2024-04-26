"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  TFood,
  pickFood,
  selectFoods,
} from "@/lib/features/ingredient/ingredientSlice";
import {
  IReceiptFood,
  addFood,
} from "@/lib/features/receipt/receiptSlice";

function compareByName(a:TFood, b:TFood) {
  if ( a.name < b.name ){
    return -1;
  }
  return 1;
}

export const Ingredient = () => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectFoods);
  const sortedFoods = [...foods].sort(compareByName)

  async function handleFoodClick(food: TFood) {
    dispatch(pickFood(food))
    await dispatch(addFood(food as IReceiptFood))
    const el = window.document.getElementById(`food-${food.id}`)
    if (el !== null) {
      el.focus()
    };
  }
  
  return (
    <div className="flex-1 bg-slate-100 p-4">
      <h3>List Bahan-bahan:</h3>
      <div className="flex flex-col gap-2 mt-4">
        {sortedFoods && sortedFoods.map((food) =>
          <button
            key={food.id}
            className="w-full bg-white border p-2"
            onClick={() => handleFoodClick(food)}
          >{food.name}</button>
        )}
      </div>
    </div>
  );
};
