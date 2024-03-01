import { IonCol, IonSpinner, IonText } from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../utils';

interface EmptyStateProps {
  message?: string;
}

export const LoadingState: React.FC<EmptyStateProps> = ({ message }) => {
  const { t } = useTranslation();

  const finalMessage = message || t('defaultLoadingStateMessage');

  return (
    <IonCol size="12" className="flex flex-col justify-center main-column">
      <IonText>
        <h2 className="text-center font-semibold text-2xl">
          {capitalize(finalMessage)} <br />{' '}
          <IonSpinner
            name="dots"
            style={{ width: '3rem', height: '3rem' }}
          ></IonSpinner>
        </h2>
      </IonText>
    </IonCol>
  );
};
