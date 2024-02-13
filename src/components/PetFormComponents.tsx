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
      {capitalize(t('formButtons.cancelBtn'))}
    </>
  );
};

export const BackBtn = () => {
  const { t } = useTranslation();

  return (
    <>
      <IonIcon md={chevronBackSharp} ios={chevronBackOutline}></IonIcon>{' '}
      {capitalize(t('formButtons.backBtn'))}
    </>
  );
};

export const NextBtn = () => {
  const { t } = useTranslation();

  return (
    <>
      {capitalize(t('formButtons.nextBtn'))}{' '}
      <IonIcon md={chevronForwardSharp} ios={chevronForwardOutline}></IonIcon>
    </>
  );
};

export const SubmitBtn = () => {
  const { t } = useTranslation();

  return <>{capitalize(t('formButtons.submitBtn'))}</>;
};
