import { PetForm } from '@components';
import {
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonRow,
  RefresherEventDetail,
} from '@ionic/react';
import { Page } from '@layouts';
import { capitalize } from '@utils';
import { add } from 'ionicons/icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PetList: React.FC = () => {
  const [pets, setPets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
            <IonCol size="12">This is a test {pets}</IonCol>
          </IonRow>
        </IonGrid>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            onClick={
              () => setIsOpen(true) // TODO: if user is not logged-in redirect to register
            }
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </Page>
      <PetForm isOpen={isOpen} setIsOpen={setIsOpen}></PetForm>
    </>
  );
};

export default PetList;
