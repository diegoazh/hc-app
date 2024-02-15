import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  RefresherEventDetail,
} from '@ionic/react';
import { Page } from '@layouts';
import { capitalize } from '@utils';
import { add } from 'ionicons/icons';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStorage } from '../hooks';

export const PetList: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pets, setPets] = useState<any[]>([]);
  const { t } = useTranslation();
  const store = useStorage();

  const handleRefresh = useCallback<
    (event: CustomEvent<RefresherEventDetail>) => void
  >(
    (event: CustomEvent<RefresherEventDetail>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.get('pets').then((pets: any[]) => {
        setPets(pets);
        event.detail.complete();
      });
    },
    [setPets],
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store.get('pets').then((pets: any[]) => {
      setPets(pets);
    });
  });

  return (
    <>
      <Page
        title={capitalize(t('petList.title'))}
        handleRefresh={handleRefresh}
      >
        <IonGrid>
          <IonRow>
            {pets?.length &&
              pets.map((pet, index) => (
                <IonCol size="12" key={index}>
                  <IonCard>
                    <img src={pet.images.split('|')[0]} />
                    <IonCardHeader>
                      <IonCardTitle>{capitalize(pet.name)}</IonCardTitle>
                      <IonCardSubtitle>
                        {capitalize(pet.state)} - {capitalize(pet.city)}
                      </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                      <IonList inset={true}>
                        <IonItem>
                          <IonLabel>
                            {capitalize(t('createPetStep2.age.label'))}
                          </IonLabel>
                          <IonText color="medium">
                            {capitalize(t(pet.age))}
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel>
                            {capitalize(t('createPetStep2.type.label'))}
                          </IonLabel>
                          <IonText color="medium">
                            {capitalize(t(pet.type))}
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel>
                            {capitalize(t('createPetStep2.size.label'))}
                          </IonLabel>
                          <IonText color="medium">
                            {capitalize(t(pet.size))}
                          </IonText>
                        </IonItem>
                        <IonItem>
                          <IonLabel>
                            {capitalize(t('createPetStep2.health.label'))}
                          </IonLabel>
                          <IonText color="medium">
                            {capitalize(t(pet.health))}
                          </IonText>
                        </IonItem>
                      </IonList>
                      <IonText>
                        <p>{pet.description}</p>
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
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
