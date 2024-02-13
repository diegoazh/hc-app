import { IonButton } from '@ionic/react';
import { BackBtn, CancelBtn, NextBtn, SubmitBtn } from './PetFormComponents';
import { FormState } from 'react-hook-form';
import { ICreatePetFormInputs } from '../pages';
import { useEffect, useState } from 'react';

interface CreateStepFooterProps {
  formState: FormState<ICreatePetFormInputs>;
  currentStep: number;
  backFn: () => void;
  nextFn: () => void;
}

export const CreateStepFooter: React.FC<CreateStepFooterProps> = ({
  formState,
  currentStep,
  backFn,
  nextFn,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const { isDirty, isValid } = formState;

    console.log(isDirty, isValid);

    if (currentStep === 2) {
      setIsDisabled(!isDirty || !isValid);
    } else {
      setIsDisabled(false);
    }
  }, [formState]);

  return (
    <div className="flex justify-between">
      <IonButton color="warning" className="capitalize" onClick={backFn}>
        {currentStep === 0 ? <CancelBtn /> : <BackBtn />}
      </IonButton>
      <IonButton
        className="capitalize"
        onClick={nextFn}
        type={currentStep === 2 ? 'submit' : 'button'}
        form={currentStep === 2 ? 'create_pet_form' : undefined}
        disabled={isDisabled}
      >
        {currentStep < 2 ? <NextBtn /> : <SubmitBtn />}
      </IonButton>
    </div>
  );
};
