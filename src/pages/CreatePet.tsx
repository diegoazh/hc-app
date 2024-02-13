import {
  IonActionSheet,
  IonCol,
  IonGrid,
  IonRow,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import { close, trash } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SwiperContainer } from 'swiper/element';
import 'swiper/scss';
import 'swiper/scss/pagination';
import {
  CreatePetStep1,
  CreatePetStep2,
  CreatePetStep3,
  CreateStepFooter,
} from '../components';
import { UserPhoto, useAppToast, usePhotoGallery } from '../hooks';
import { Page } from '../layouts';
import {
  ProductAge,
  ProductHealth,
  ProductSize,
  ProductType,
  capitalize,
} from '../utils';

export interface ICreatePetFormInputs {
  name: string;
  images: string;
  description?: string;
  age: (typeof ProductAge)[keyof typeof ProductAge] | null;
  type: (typeof ProductType)[keyof typeof ProductType] | null;
  size: (typeof ProductSize)[keyof typeof ProductSize] | null;
  health: (typeof ProductHealth)[keyof typeof ProductHealth] | null;
  state: string;
  city: string;
  neighborhood?: string;
  available?: boolean;
}

export const CreatePet: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  const swiper = useRef<SwiperContainer>(null);

  const ionRouter = useIonRouter();
  const { t } = useTranslation();
  const [presentAlert] = useIonAlert();

  const { photos, takePhoto, deletePhoto } = usePhotoGallery();
  const { presentAppToast } = useAppToast();

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
    formState: myFormState,
  } = useForm<ICreatePetFormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      images: '',
      age: null,
      type: null,
      size: null,
      health: null,
      state: '',
      city: '',
      neighborhood: undefined,
      description: undefined,
      available: false,
    },
  });

  const onSubmit: SubmitHandler<ICreatePetFormInputs> = (data) =>
    console.log(data); // TODO: remember to add country:'argentina' to the final object

  useEffect(() => {
    console.log(`isSubmitSuccessful: ${isSubmitSuccessful}`);

    if (isSubmitSuccessful && swiper.current) {
      photos.forEach((p) => deletePhoto(p));
      reset();
      ionRouter.push('/adoption', 'forward');
      swiper.current.swiper.slideTo(0);
      setCurrentStep(swiper.current.swiper.activeIndex);
    }
  }, [isSubmitSuccessful, swiper]);

  const Footer = (
    <CreateStepFooter
      formState={myFormState}
      currentStep={currentStep}
      backFn={() => {
        switch (currentStep) {
          case 0:
            deletePhoto(photos)
              .catch((error) => {
                presentAppToast(error.message, { color: 'danger' });
              })
              .finally(() => {
                ionRouter.push('/adoption', 'back');
              });
            break;

          default:
            if (swiper.current) {
              swiper.current?.swiper.slidePrev();
              setCurrentStep(swiper.current?.swiper.activeIndex);
            }
            break;
        }
      }}
      nextFn={() => {
        switch (currentStep) {
          case 0:
            trigger('images').then((result) => {
              if (result && photos.length && swiper.current) {
                swiper.current.swiper.slideNext();
                setCurrentStep(swiper.current.swiper.activeIndex);
              }
            });
            break;

          case 1:
            trigger(['name', 'age', 'type', 'size', 'health'])
              .then((result) => {
                if (result && swiper.current) {
                  swiper.current.swiper.slideNext();
                  setCurrentStep(swiper.current.swiper.activeIndex);
                }
              })
              .catch((e) => {
                // TODO: move this to hook
                presentAlert({
                  message: e?.message,
                  header: capitalize(t('alert.headerError')),
                  subHeader: capitalize(t('alert.subHeaderError')),
                  buttons: [capitalize(t('alert.buttonError'))],
                });
              });
            break;

          default:
            break;
        }
      }}
    />
  );

  return (
    <Page
      title={
        currentStep === 0
          ? capitalize(t('createPetStep1.title'))
          : currentStep === 1
            ? capitalize(t('createPetStep2.title'))
            : capitalize(t('createPetStep3.title'))
      }
      footer={Footer}
    >
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="12">
            <form id="create_pet_form" onSubmit={handleSubmit(onSubmit)}></form>
            <swiper-container
              ref={swiper}
              pagination={true}
              pagination-type="progressbar"
            >
              <swiper-slide>
                <CreatePetStep1
                  photos={photos}
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  takePhoto={takePhoto}
                  deletePhoto={deletePhoto}
                />
              </swiper-slide>
              <swiper-slide>
                <CreatePetStep2 errors={errors} register={register} />
              </swiper-slide>
              <swiper-slide>
                <CreatePetStep3
                  errors={errors}
                  getValues={getValues}
                  register={register}
                  setValue={setValue}
                />
              </swiper-slide>
            </swiper-container>
            {JSON.stringify(watch(), null, 2)} isDirty: {isDirty}
            isValid: {isValid}
          </IonCol>
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
