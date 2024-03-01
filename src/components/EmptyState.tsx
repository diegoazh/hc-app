import { IonCol, IonText } from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../utils';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  const { t } = useTranslation();

  const finalMessage = message || t('defaultEmptyStateMessage');

  return (
    <IonCol size="12" className="flex flex-col justify-center main-column">
      <IonText>
        <h2 className="text-center font-semibold text-2xl">
          {capitalize(finalMessage)} <br /> 🤔
        </h2>
      </IonText>
    </IonCol>
  );
};
