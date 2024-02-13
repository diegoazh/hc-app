import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  RefresherEventDetail,
} from '@ionic/react';
import { Page } from '@layouts';
import { capitalize } from '@utils';
import { add } from 'ionicons/icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PetList: React.FC = () => {
  const [pets, setPets] = useState([]);
  const { t } = useTranslation();
  const handleRefresh = useCallback<
    (event: CustomEvent<RefresherEventDetail>) => void
  >(
    (event: CustomEvent<RefresherEventDetail>) => {
      setTimeout(() => {
        setPets([]);
        event.detail.complete();
      }, 2000);
    },
    [setPets],
  );

  return (
    <>
      <Page
        title={capitalize(t('petList.title'))}
        handleRefresh={handleRefresh}
      >
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              {' '}
              <IonText>
                <p>This is a test [{pets}]</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/create" routerDirection="forward">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </Page>
    </>
  );
};
