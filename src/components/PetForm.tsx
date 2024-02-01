import { OverlayEventDetail } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useRef } from 'react';
import { capitalize } from '@utils';
import { useTranslation } from 'react-i18next';

interface PetFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const PetForm: React.FC<PetFormProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const confirm = () => {
    modal.current?.dismiss({}, 'confirm');
  };

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      console.log('confirm');
    }

    setIsOpen(false);
  }

  return (
    <IonModal isOpen={isOpen} ref={modal} onWillDismiss={onWillDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              {capitalize(t('petForm.cancel'))}
            </IonButton>
          </IonButtons>
          <IonTitle>{capitalize(t('petForm.title'))}</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              {capitalize(t('petForm.confirm'))}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Enter your name"
            labelPlacement="stacked"
            ref={input}
            type="text"
            placeholder="Your name"
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
};
