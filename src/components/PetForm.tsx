import { OverlayEventDetail } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  ProductAge,
  ProductHealth,
  ProductSize,
  ProductType,
  capitalize,
} from '@utils';
import {
  cameraOutline,
  cameraSharp,
  closeCircleOutline,
  closeCircleSharp,
} from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { usePhotoGallery } from '@hooks';
import './PetForm.scss';

interface PetFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

interface IFormInputs {
  name: string;
  images: string;
  description: string;
  age: (typeof ProductAge)[keyof typeof ProductAge] | null;
  type: (typeof ProductType)[keyof typeof ProductType] | null;
  size: (typeof ProductSize)[keyof typeof ProductSize] | null;
  health: (typeof ProductHealth)[keyof typeof ProductHealth] | null;
  country: string;
  state: string;
  city: string;
  neighborhood?: string;
  available: boolean;
}

export const PetForm: React.FC<PetFormProps> = ({ isOpen, setIsOpen }) => {
  const [states, setStates] = useState<{ id: number; nombre: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [cities, setCities] = useState<{ id: number; nombre: string }[]>([]);
  const modal = useRef<HTMLIonModalElement>(null);
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      images: '',
      age: null,
      type: null,
      size: null,
      health: null,
      country: 'argentina',
      state: '',
      city: '',
      neighborhood: '',
      description: '',
      available: true,
    },
  });
  const { t } = useTranslation();
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();

  useEffect(() => {
    if (isSubmitSuccessful) {
      photos.forEach((p) => deletePhoto(p));
      reset();

      modal.current?.dismiss({}, 'confirm');
    }
  }, [modal, reset, isSubmitSuccessful]);

  useEffect(() => {
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
      .then(
        (res) =>
          res.json() as unknown as {
            provincias: { id: number; nombre: string }[];
          },
      )
      .then((data) => {
        setStates([...data.provincias]);
      });
  }, [setStates]);

  useEffect(() => {
    if (selectedState) {
      fetch(
        'https://apis.datos.gob.ar/georef/api/localidades?' +
          new URLSearchParams(
            `?provincia=${selectedState}&orden=nombre&aplanar=true&campos=basico&max=1000&exacto=true&formato=json`,
          ),
      )
        .then(
          (res) =>
            res.json() as unknown as {
              localidades: { id: number; nombre: string }[];
            },
        )
        .then((data) => {
          setCities([...data.localidades]);
        });
    }
  }, [selectedState, setCities]);

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
      console.log('confirm');
    }

    setIsOpen(false);
  };

  const { ...stateSelectRegistered } = register('state', { required: true });

  return (
    <IonModal isOpen={isOpen} ref={modal} onWillDismiss={onWillDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              {capitalize(t('petForm.cancel'))}
            </IonButton>
          </IonButtons>
          <IonTitle>{capitalize(t('petForm.title'))}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h1 className="w-full text-2xl font-bold uppercase ion-text-center">
                  {capitalize(t('petForm.pageTitle'))}
                </h1>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
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
                />
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <IonInput
                  label={capitalize(t('petForm.form.name.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.name.placeholder'))}
                  type="text"
                  {...register('name', {
                    required: true,
                    maxLength: 80,
                    minLength: 3,
                  })}
                />
                {errors?.name?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.name.errors.required'))}
                    </p>
                  </IonText>
                )}
                {errors?.name?.type === 'minLength' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(
                        t('petForm.form.name.errors.minLength', {
                          minLength: 3,
                        }),
                      )}
                    </p>
                  </IonText>
                )}
                {errors?.name?.type === 'maxLength' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(
                        t('petForm.form.name.errors.maxLength', {
                          maxLength: 80,
                        }),
                      )}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.age.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.age.placeholder'))}
                  {...register('age', {
                    required: true,
                  })}
                >
                  <IonSelectOption value={ProductAge.PUPPY}>
                    {capitalize(t('petForm.form.age.options.puppy'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductAge.ADULT}>
                    {capitalize(t('petForm.form.age.options.adult'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductAge.ELDER}>
                    {capitalize(t('petForm.form.age.options.elder'))}
                  </IonSelectOption>
                </IonSelect>
                {errors?.age?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.age.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.type.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.type.placeholder'))}
                  {...register('type', {
                    required: true,
                  })}
                >
                  <IonSelectOption value={ProductType.CAT}>
                    {capitalize(t('petForm.form.type.options.cat'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductType.DOG}>
                    {capitalize(t('petForm.form.type.options.dog'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductType.OTHER}>
                    {capitalize(t('petForm.form.type.options.other'))}
                  </IonSelectOption>
                </IonSelect>
                {errors?.type?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.type.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.size.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.size.placeholder'))}
                  {...register('size', {
                    required: true,
                  })}
                >
                  <IonSelectOption value={ProductSize.SMALL}>
                    {capitalize(t('petForm.form.size.options.small'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductSize.MEDIUM}>
                    {capitalize(t('petForm.form.size.options.medium'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductSize.BIG}>
                    {capitalize(t('petForm.form.size.options.big'))}
                  </IonSelectOption>
                </IonSelect>
                {errors?.size?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.size.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.health.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.health.placeholder'))}
                  {...register('health', {
                    required: true,
                  })}
                >
                  <IonSelectOption value={ProductHealth.HEALTHY}>
                    {capitalize(t('petForm.form.health.options.healthy'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductHealth.UNHEALTHY}>
                    {capitalize(t('petForm.form.health.options.unhealthy'))}
                  </IonSelectOption>
                  <IonSelectOption value={ProductHealth.UNDER_TREATMENT}>
                    {capitalize(
                      t('petForm.form.health.options.underTreatment'),
                    )}
                  </IonSelectOption>
                </IonSelect>
                {errors?.health?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.health.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.country.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(
                    t('petForm.form.country.placeholder'),
                  )}
                  {...register('country', { required: true })}
                  value={'argentina'}
                >
                  <IonSelectOption value={'argentina'}>
                    Argentina
                  </IonSelectOption>
                </IonSelect>
                {errors?.country?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.state.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.state.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.state.placeholder'))}
                  onIonChange={(e) => {
                    setValue('state', e.detail.value);
                    setValue('city', '');
                    setSelectedState(getValues('state'));
                  }}
                  {...stateSelectRegistered}
                  // {...register('state', { required: true })}
                >
                  {states.map((state, index) => (
                    <IonSelectOption key={index} value={state.nombre}>
                      {capitalize(state.nombre)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {errors?.state?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.state.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonSelect
                  label={capitalize(t('petForm.form.city.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(t('petForm.form.city.placeholder'))}
                  {...register('city', { required: true })}
                >
                  {cities.map((city, index) => (
                    <IonSelectOption key={index} value={city.nombre}>
                      {capitalize(city.nombre)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                {errors?.city?.type === 'required' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(t('petForm.form.city.errors.required'))}
                    </p>
                  </IonText>
                )}

                <IonInput
                  label={capitalize(t('petForm.form.neighborhood.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(
                    t('petForm.form.neighborhood.placeholder'),
                  )}
                  type="text"
                  {...register('name', {
                    maxLength: 500,
                    minLength: 3,
                  })}
                />
                {errors?.neighborhood?.type === 'minLength' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(
                        t('petForm.form.neighborhood.errors.minLength', {
                          minLength: 3,
                        }),
                      )}
                    </p>
                  </IonText>
                )}
                {errors?.neighborhood?.type === 'maxLength' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(
                        t('petForm.form.neighborhood.errors.maxLength', {
                          maxLength: 80,
                        }),
                      )}
                    </p>
                  </IonText>
                )}

                <IonTextarea
                  label={capitalize(t('petForm.form.description.label'))}
                  labelPlacement="stacked"
                  placeholder={capitalize(
                    t('petForm.form.description.placeholder'),
                  )}
                  {...register('description', {
                    required: false,
                    maxLength: 3000,
                    minLength: 0,
                  })}
                ></IonTextarea>
                {errors?.description?.type === 'maxLength' && (
                  <IonText color="danger">
                    <p>
                      <IonIcon
                        ios={closeCircleOutline}
                        md={closeCircleSharp}
                      ></IonIcon>
                      {capitalize(
                        t('petForm.form.description.errors.maxLength', {
                          maxLength: 3000,
                        }),
                      )}
                    </p>
                  </IonText>
                )}
                <IonButton type="submit" expand="block">
                  {capitalize(t('petForm.submitBtn'))}
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon md={cameraSharp} ios={cameraOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonModal>
  );
};
