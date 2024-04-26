import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TFood } from "../ingredient/ingredientSlice";

export interface IReceiptFood extends TFood {
  value?: number;
  isEdit: boolean;
} 

export interface ISteps{
  text: string;
  isEdit: boolean;
} 

export type TFocusComponent = {
  type: 'ingr' | 'step' | '',
  id: number,
}

export interface ReceiptSliceState {
  name: string;
  isEditName: boolean;
  foods: IReceiptFood[];
  steps: ISteps[];
  stepInput: string;
  focusComponent: TFocusComponent;
}

const initialState: ReceiptSliceState = {
  name: "",
  isEditName: true,
  foods: [],
  steps: [],
  stepInput: '',
  focusComponent: { type: '', id: -1 }
};

export const receiptSlice = createAppSlice({
  name: "receipt",
  initialState,
  reducers: (create) => ({
    setName: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.name = action.payload;
      },
    ),
    setEditName: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.isEditName = action.payload;
      },
    ),
    addFood: create.reducer(
      (state, action: PayloadAction<IReceiptFood>) => {
        state.foods = [...state.foods, {...action.payload, isEdit:true}];
      },
    ),
    deleteFood: create.reducer(
      (state, action: PayloadAction<IReceiptFood>) => {
        state.foods = state.foods.filter((food) => food.id != action.payload.id);
      },
    ),
    updateFood: create.reducer(
      (state, action: PayloadAction<IReceiptFood>) => {
        state.foods = state.foods.map((food) => (food.id == action.payload.id ? action.payload : food));
      },
    ),
    setStepInput: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.stepInput = action.payload;
      },
    ),
    addStep: create.reducer(
      (state) => {
        state.steps = [...state.steps, {text: state.stepInput, isEdit:false}];
        state.stepInput = '';
      },
    ),
    deleteStep: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.steps = state.steps.filter((step, stepIndex) => stepIndex != action.payload);
      },
    ),
    updateStep: create.reducer(
      (state, action: PayloadAction<ISteps[]>) => {
        state.steps = action.payload;
      },
    ),
    setFocusedComponent: create.reducer(
      (state, action: PayloadAction<TFocusComponent>) => {
        state.focusComponent = action.payload;
      },
    ),
  }),
  selectors: {
    selectName: (rec) => rec.name,
    selectIsEditName: (rec) => rec.isEditName,
    selectFoods: (rec) => rec.foods,
    selectSteps: (rec) => rec.steps,
    selectStepInput: (rec) => rec.stepInput,
    selectFocusComponent: (rec) => rec.focusComponent,
  },
});

// Action creators are generated for each case reducer function.
export const { setName, setEditName, addFood, deleteFood, updateFood, setStepInput, addStep, deleteStep, updateStep, setFocusedComponent } =
receiptSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectName, selectIsEditName, selectFoods, selectSteps, selectStepInput, selectFocusComponent } = receiptSlice.selectors;