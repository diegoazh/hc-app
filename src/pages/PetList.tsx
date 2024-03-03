import { useQuery } from '@apollo/client';
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
import { useCallback } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { AllProductsQuery } from '../__generated__/graphql';
import { PRODUCTS } from '../graphql-api';
import { EmptyState, LoadingState } from '../components';

export const PetList: React.FC = () => {
  const { loading, data, error } = useQuery<AllProductsQuery>(PRODUCTS);
  const { showBoundary } = useErrorBoundary();
  const { t } = useTranslation();

  const handleRefresh = useCallback<
    (event: CustomEvent<RefresherEventDetail>) => void
  >((event: CustomEvent<RefresherEventDetail>) => {
    event.detail.complete();
  }, []);

  if (error) {
    showBoundary(error);
  } else {
    return (
      <>
        <Page
          title={capitalize(t('petList.title'))}
          handleRefresh={handleRefresh}
        >
          <IonGrid>
            <IonRow>
              {loading ? (
                <LoadingState message={t('petList.loadingState')} />
              ) : !data?.products.length ? (
                <EmptyState message={t('petList.emptyState')} />
              ) : (
                data?.products.map((pet, index) => (
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
                ))
              )}
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
  }
};
