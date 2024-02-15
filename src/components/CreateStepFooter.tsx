import { IonButton } from '@ionic/react';
import { BackBtn, CancelBtn, NextBtn, SubmitBtn } from './PetFormComponents';

interface CreateStepFooterProps {
  currentStep: number;
  backFn: () => void;
  nextFn: () => void;
}

export const CreateStepFooter: React.FC<CreateStepFooterProps> = ({
  currentStep,
  backFn,
  nextFn,
}) => {
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
      >
        {currentStep < 2 ? <NextBtn /> : <SubmitBtn />}
      </IonButton>
    </div>
  );
};
