import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
} from '@ionic/react';
import { cameraOutline, cameraSharp, trash, close } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { UserPhoto, usePhotoGallery } from '../hooks';
import { Page } from '../layouts';
import { capitalize } from '../utils';
import { CreateStepFooter } from '../components';
import { useState } from 'react';

export const CreatePetStep1: React.FC = () => {
  const { t } = useTranslation();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  return (
    <Page
      title={capitalize(t('createPetStep1.title'))}
      footer={<CreateStepFooter photos={photos} deletePhoto={deletePhoto} />}
    >
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
