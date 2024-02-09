import { IonButton, useIonRouter } from '@ionic/react';
import { t } from 'i18next';
import { DeletePhotoFn, UserPhoto, useAppToast } from '../hooks';

interface CreateStepFooterProps {
  photos: UserPhoto[];
  deletePhoto: DeletePhotoFn;
}

export const CreateStepFooter: React.FC<CreateStepFooterProps> = ({
  photos,
  deletePhoto,
}) => {
  const ionRouter = useIonRouter();
  const { presentAppToast } = useAppToast();

  return (
    <div className="flex justify-between">
      <IonButton
        color="warning"
        routerDirection="back"
        className="capitalize"
        onClick={() => {
          deletePhoto(photos)
            .then(() => {
              ionRouter.push('/adoption', 'back');
            })
            .catch((error) => {
              presentAppToast(error.message, { color: 'danger' });
              ionRouter.push('/adoption', 'back');
            });
        }}
      >
        {t('createPetStep1.cancelBtn')}
      </IonButton>
      <IonButton
        routerLink="/create/step-2"
        routerDirection="forward"
        className="capitalize"
      >
        {t('createPetStep1.nextBtn')}
      </IonButton>
    </div>
  );
};
