import { IonCol, IonGrid, IonRow, useIonRouter } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { BackBtn, CreateStepFooter, NextBtn } from '../components';
import { Page } from '../layouts';
import { capitalize } from '../utils';

export const CreatePetStep2: React.FC = () => {
  const { t } = useTranslation();
  const ionRouter = useIonRouter();

  const Footer = (
    <CreateStepFooter
      backBtn={<BackBtn />}
      nextBtn={<NextBtn />}
      backFn={() => {
        ionRouter.push('/create/step-1', 'back');
      }}
      nextFn={() => {
        ionRouter.push('/create/step-3', 'forward');
      }}
    />
  );

  return (
    <Page title={capitalize(t('createPetStep2.title'))} footer={Footer}>
      <IonGrid>
        <IonRow>
          <IonCol size="12">CreatePetStep2</IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  );
};
