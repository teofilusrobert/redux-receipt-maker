"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setName,
  setEditName,
  deleteFood,
  updateFood,
  addStep,
  deleteStep,
  updateStep,
  selectName,
  selectFoods,
  selectSteps,
  IReceiptFood,
  setStepInput,
  selectStepInput,
  selectIsEditName,
  setFocusedComponent,
  selectFocusComponent,
} from "@/lib/features/receipt/receiptSlice";
import {
  returnFood,
} from "@/lib/features/ingredient/ingredientSlice";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

export const Receipt = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectName);
  const isEditName = useAppSelector(selectIsEditName);
  const foods = useAppSelector(selectFoods);
  const steps = useAppSelector(selectSteps);
  const stepInput = useAppSelector(selectStepInput);
  const focusComponent = useAppSelector(selectFocusComponent);

  function handleRemoveFood(food:IReceiptFood) {
    dispatch(deleteFood(food));
    dispatch(returnFood(food));
  }

  function handleValueChange(food: IReceiptFood, value: string) {
    const updatedFood = {
      ...food,
      value: Number(value),
    }
    dispatch(updateFood(updatedFood));
  }

  function handleValueBlur(food: IReceiptFood) {
    const updatedFood = {
      ...food,
      value: !!food.value ? food.value : 0,
      isEdit: false,
    }
    dispatch(updateFood(updatedFood));
  }

  async function handleEdit(food: IReceiptFood) {
    const updatedFood = {
      ...food,
      isEdit: true,
    }
    await dispatch(updateFood(updatedFood));
    const el = window.document.getElementById(`food-${food.id}`)
    if (el !== null) {
      el.focus()
    };
  }

  function handleKeyDown(e:any) {
    if (e.key === 'Enter') {
      dispatch(addStep())
      dispatch(setStepInput(""))
    }
  }

  function handleStepEditChange(editedIndex: number, text: string) {
    const newSteps = steps.map((step, stepIndex) => {
      if(stepIndex == editedIndex) return ({ ...step, text })
      return step
    })
    dispatch(updateStep(newSteps))
  }

  async function handleStepEditClick(editedIndex: number) {
    const newSteps = steps.map((step, stepIndex) => {
      if(stepIndex == editedIndex) return ({ ...step, isEdit: true })
      return step
    })
    await dispatch(updateStep(newSteps))
    const el = window.document.getElementById(`step-${editedIndex}`)
    if (el !== null) {
      el.focus()
    };
  }

  function handleStepEditBlur(editedIndex: number) {
    const newSteps = steps.map((step, stepIndex) => {
      if(stepIndex == editedIndex) return ({ ...step, isEdit: false })
      return step
    })
    dispatch(updateStep(newSteps))
  }

  async function handleNameEditClick() {
    await dispatch(setEditName(true))
    const el = window.document.getElementById("receipt-name")
    if (el !== null) {
      el.focus()
    };
  }

  return (
    <div className="flex-1 bg-slate-100 p-4">
      <div className="w-full text-center mb-2">
        {isEditName && <input
          id="receipt-name"
          value={name}
          placeholder="Nama Resep"
          onChange={(e) => dispatch(setName(e.target.value))}
          className="w-full h-8 text-center"
          onBlur={() => dispatch(setEditName(false))}
        />}
        {!isEditName && <h2 className="font-bold" onClick={handleNameEditClick}>{name}</h2>}
      </div>
      <hr/>
      <h4 className="mt-4">Bahan:</h4>
      <div className="flex flex-col gap-1 my-2">
        {(!foods || foods.length == 0) && <p>(Pilih bahan di list)</p>}
        {foods && foods.map((food) =>
          <div 
            key={food.id} 
            onClick={() => dispatch(setFocusedComponent({ type: 'ingr', id: food.id }))} 
            className={(focusComponent.type === 'ingr' && focusComponent.id === food.id) 
              ? "flex w-full justify-between bg-blue-100 rounded p-2" 
              : "flex w-full justify-between cursor-pointer p-2"
            }
          >
            <div className="flex gap-2">
              <div className="flex gap-2 w-[90px]">
                {(food.isEdit) && 
                  <input
                    id={`food-${food.id}`}
                    value={food.value || ''}
                    type="number" 
                    className="w-12 h-6 text-center" 
                    onChange={(e) => handleValueChange(food, e.target.value)} 
                    onBlur={() => handleValueBlur(food)} 
                  />
                }
                {!food.isEdit && food.value} {food.unit}
              </div>
              {food.name}
            </div>
            {focusComponent.type === 'ingr' && focusComponent.id === food.id && <div className="flex gap-2">
              {!food.isEdit && 
                <button onClick={() => handleEdit(food)}>
                  <PencilIcon className="h-6 w-6 text-blue-500" />
                </button>
              }
              <button className="text-red-500" onClick={() => handleRemoveFood(food)}>
                <TrashIcon className="h-6 w-6 text-red-500" />
              </button>
            </div>}
          </div>
        )}
      </div>
      <hr/>
      <h4 className="mt-2">Tata cara:</h4>
      <div className="flex flex-col gap-1">
        {steps && steps.map((step, stepIndex) =>
          <div 
            key={stepIndex} 
            onClick={() => dispatch(setFocusedComponent({ type: 'step', id: stepIndex }))} 
            className={(focusComponent.type === 'step' && focusComponent.id === stepIndex) 
            ? "flex justify-between gap-2 bg-blue-100 p-2 rounded" : "flex justify-between gap-2 p-2 cursor-pointer"}
          >
            {!step.isEdit && <p>{stepIndex + 1}. {step.text}</p>}
            {step.isEdit && 
              <input 
                id={`step-${stepIndex}`}
                value={step.text} 
                onChange={(e) => handleStepEditChange(stepIndex, e.target.value)} 
                onBlur={() => handleStepEditBlur(stepIndex)} 
              />
            }
            {(focusComponent.type === 'step' && focusComponent.id === stepIndex) && 
              <div className="flex gap-2">
                {!step.isEdit && 
                  <button onClick={() => handleStepEditClick(stepIndex)}>
                    <PencilIcon className="h-6 w-6 text-blue-500" />
                  </button>
                }
                <button className="text-red-500" onClick={() => dispatch(deleteStep(stepIndex))}>
                  <TrashIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
            }
          </div>
        )}
      </div>
      <input
        value={stepInput}
        placeholder="Tulis tata cara baru (enter untuk input)"
        onChange={(e) => dispatch(setStepInput(e.target.value))} 
        onKeyDown={handleKeyDown}
        className="w-full mt-2 p-2"
      />
    </div>
  );
};
