import { IonIcon } from '@ionic/react';
import {
  chevronBackOutline,
  chevronBackSharp,
  chevronForwardOutline,
  chevronForwardSharp,
  closeOutline,
  closeSharp,
} from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../utils';

export const CancelBtn = () => {
  const { t } = useTranslation();

  return (
    <>
      <IonIcon md={closeSharp} ios={closeOutline}></IonIcon>{' '}
      {capitalize(t('createPetStep1.cancelBtn'))}
    </>
  );
};

export const BackBtn = () => {
  const { t } = useTranslation();

  return (
    <>
      <IonIcon md={chevronBackSharp} ios={chevronBackOutline}></IonIcon>{' '}
      {capitalize(t('createPetStep1.backBtn'))}
    </>
  );
};

export const NextBtn = () => {
  const { t } = useTranslation();

  return (
    <>
      {capitalize(t('createPetStep1.nextBtn'))}{' '}
      <IonIcon md={chevronForwardSharp} ios={chevronForwardOutline}></IonIcon>
    </>
  );
};
