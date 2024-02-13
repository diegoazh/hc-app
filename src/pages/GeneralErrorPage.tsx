import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from '@ionic/react';
import { sadOutline, sadSharp } from 'ionicons/icons';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { Page } from '../layouts';
import { capitalize } from '../utils';
import './GeneralErrorPage.scss';

export const GeneralErrorPage: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary, // Call resetErrorBoundary() to reset the error boundary and retry the render.
}) => {
  const { t } = useTranslation();

  return (
    <Page title={capitalize(t('alert.headerError'))}>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol
            size="12"
            className="flex flex-col justify-center main-column"
          >
            <IonText className="mb-5">
              <h1 className="font-bold text-3xl text-center">
                {capitalize(t('alert.subHeaderError'))}
              </h1>
            </IonText>
            <div className="flex justify-center mb-5">
              <IonIcon
                md={sadSharp}
                ios={sadOutline}
                className="text-5xl"
              ></IonIcon>
            </div>
            <IonText className="mb-5">
              <p className="font-bold text-center">{error?.message}</p>
            </IonText>
            <IonButton onClick={() => resetErrorBoundary()} fill="clear">
              {capitalize(t('alert.buttonRetry'))}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  );
};
