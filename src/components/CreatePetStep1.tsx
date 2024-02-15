import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonRow,
  IonText,
} from '@ionic/react';
import {
  cameraOutline,
  cameraSharp,
  close,
  closeCircleOutline,
  closeCircleSharp,
  trash,
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DeletePhotoFn, TakePhotoFn, UserPhoto } from '../hooks';
import { ICreatePetFormInputs } from '../pages';
import { capitalize } from '../utils';

export interface CreatePetStep1Props {
  photos: UserPhoto[];
  errors: FieldErrors<ICreatePetFormInputs>;
  register: UseFormRegister<ICreatePetFormInputs>;
  setValue: UseFormSetValue<ICreatePetFormInputs>;
  takePhoto: TakePhotoFn;
  deletePhoto: DeletePhotoFn;
}

export const CreatePetStep1: React.FC<CreatePetStep1Props> = ({
  photos,
  errors,
  register,
  setValue,
  deletePhoto,
  takePhoto,
}) => {
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const { t } = useTranslation();

  useEffect(() => {
    setValue(
      'images',
      photos.reduce(
        (prev: string, current) =>
          prev ? `${prev}|${current.webviewPath}` : `${current.webviewPath}`,
        '',
      ),
    );
  }, [photos]);

  return (
    <>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="12">
            <IonButton
              expand="block"
              onClick={() => {
                takePhoto();
              }}
            >
              <IonIcon
                size="large"
                md={cameraSharp}
                ios={cameraOutline}
              ></IonIcon>
            </IonButton>
            {errors.images && (
              <IonText color="danger">
                <p>
                  <IonIcon
                    ios={closeCircleOutline}
                    md={closeCircleSharp}
                  ></IonIcon>
                  {errors.images.message}
                </p>
              </IonText>
            )}
            <IonInput
              hidden={true}
              label="images"
              {...register('images', {
                required: {
                  value: true,
                  message: capitalize(
                    t('createPetStep1.images.errors.required'),
                  ),
                },
              })}
            ></IonInput>
          </IonCol>
          {photos.map((photo, index) => (
            <IonCol size="6" key={index}>
              <IonImg
                src={photo.webviewPath}
                // todo: replace style with classes
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
    </>
  );
};
