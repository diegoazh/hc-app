import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';
import { cameraOutline, cameraSharp, close, trash } from 'ionicons/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CancelBtn, CreateStepFooter, NextBtn } from '../components';
import { UserPhoto, useAppToast, usePhotoGallery } from '../hooks';
import { Page } from '../layouts';
import { capitalize } from '../utils';

export const CreatePetStep1: React.FC = () => {
  const { t } = useTranslation();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const ionRouter = useIonRouter();
  const { presentAppToast } = useAppToast();
  const [presentAlert] = useIonAlert();

  const Footer = (
    <CreateStepFooter
      backBtn={<CancelBtn />}
      nextBtn={<NextBtn />}
      backFn={() => {
        deletePhoto(photos)
          .then(() => {
            ionRouter.push('/adoption', 'back');
          })
          .catch((error) => {
            presentAppToast(error.message, { color: 'danger' });
            ionRouter.push('/adoption', 'back');
          });
      }}
      nextFn={() => {
        if (photos.length) {
          ionRouter.push('/create/step-2', 'forward');
        } else {
          presentAlert({
            header: capitalize(t('createPetStep1.noPhotoHeader')),
            subHeader: capitalize(t('createPetStep1.noPhotoSubHeader')),
            message: capitalize(t('createPetStep1.noPhotoMessage')),
            buttons: [capitalize(t('createPetStep1.noPhotoBtn'))],
          });
        }
      }}
    />
  );

  return (
    <Page title={capitalize(t('createPetStep1.title'))} footer={Footer}>
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonButton expand="block" onClick={() => takePhoto()}>
              <IonIcon
                size="large"
                md={cameraSharp}
                ios={cameraOutline}
              ></IonIcon>
            </IonButton>
          </IonCol>
          {photos.map((photo, index) => (
            <IonCol size="6" key={index}>
              <IonImg
                src={photo.webviewPath}
                style={{
                  borderWidth: '5px',
                  borderStyle: 'solid',
                  borderColor: 'darkgrey',
                  borderRadius: '2px',
                }}
                onClick={() => {
                  setPhotoToDelete(photo);
                }}
              />
            </IonCol>
          ))}
          {!photos.length ? (
            <IonCol size="12">
              <IonText>
                <h3 className="normal-case text-xl py-6">
                  {t('createPetStep1.emptyState')}
                </h3>
              </IonText>
            </IonCol>
          ) : undefined}
        </IonRow>
      </IonGrid>
      <IonActionSheet
        isOpen={!!photoToDelete}
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            },
          },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(undefined)}
      />
    </Page>
  );
};
