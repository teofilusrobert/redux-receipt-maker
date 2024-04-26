import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TFood = {
  id: number,
  name: string,
  unit: string,
}

export interface IngredientSliceState {
  foods: TFood[];
  pickedFoods: TFood[];
}

const initialState: IngredientSliceState = {
  foods: [
    { id: 1, name: "Apel", unit: "buah" },
    { id: 2, name: "Daging Sapi", unit: "kg" },
    { id: 3, name: "Tepung Terigu", unit: "kg" },
    { id: 4, name: "Garam", unit: "sdm" },
    { id: 5, name: "Ayam", unit: "kg" },
    { id: 6, name: "Tepung Maizena", unit: "kg" },
  ],
  pickedFoods: [],
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const ingredientSlice = createAppSlice({
  name: "ingredient",
  initialState,
  reducers: (create) => ({
    pickFood: create.reducer(
      (state, action: PayloadAction<TFood>) => {
        state.pickedFoods = [...state.pickedFoods, action.payload];
        state.foods = state.foods.filter((food) => food.id != action.payload.id);
      },
    ),
    returnFood: create.reducer(
      (state, action: PayloadAction<TFood>) => {
        const returnedFood = state.pickedFoods.filter((food) => food.id == action.payload.id)[0]
        state.foods = [...state.foods, returnedFood];
        state.pickedFoods = state.pickedFoods.filter((food) => food.id != returnedFood.id);
      },
    ),
  }),
  selectors: {
    selectFoods: (ingr) => ingr.foods,
  },
});

// Action creators are generated for each case reducer function.
export const { pickFood, returnFood  } =
ingredientSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectFoods } = ingredientSlice.selectors;