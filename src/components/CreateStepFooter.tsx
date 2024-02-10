import { IonButton } from '@ionic/react';

interface CreateStepFooterProps {
  backBtn: JSX.Element | string;
  backFn: () => void;
  nextBtn: JSX.Element | string;
  nextFn: () => void;
}

export const CreateStepFooter: React.FC<CreateStepFooterProps> = ({
  backBtn,
  nextBtn,
  backFn,
  nextFn,
}) => {
  return (
    <div className="flex justify-between">
      <IonButton color="warning" className="capitalize" onClick={backFn}>
        {backBtn}
      </IonButton>
      <IonButton className="capitalize" onClick={nextFn}>
        {nextBtn}
      </IonButton>
    </div>
  );
};
