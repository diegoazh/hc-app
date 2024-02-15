import {
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonToggle,
} from '@ionic/react';
import { closeCircleOutline, closeCircleSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatePetFormInputs } from '../pages';
import { capitalize } from '../utils';

interface ICreateStep3Props {
  register: UseFormRegister<ICreatePetFormInputs>;
  errors: FieldErrors<ICreatePetFormInputs>;
  setValue: UseFormSetValue<ICreatePetFormInputs>;
  getValues: UseFormGetValues<ICreatePetFormInputs>;
}

export const CreatePetStep3: React.FC<ICreateStep3Props> = ({
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [states, setStates] = useState<{ id: number; nombre: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [cities, setCities] = useState<{ id: number; nombre: string }[]>([]);

  const { t } = useTranslation();

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

  // const { ...stateSelectRegistered } = register('state', {
  //   required: {
  //     value: true,
  //     message: capitalize(t('createPetStep3.state.errors.required')),
  //   },
  // });

  return (
    <IonGrid className="ion-padding">
      <IonRow>
        <IonCol size="12">
          <IonSelect
            label={capitalize(t('createPetStep3.state.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep3.state.placeholder'))}
            onIonChange={(e) => {
              e.preventDefault();
              setValue('state', e.detail.value);
              setValue('city', '');
              setSelectedState(getValues('state'));
            }}
            // {...stateSelectRegistered}
            {...register('state', {
              required: {
                value: true,
                message: capitalize(t('createPetStep3.state.errors.required')),
              },
            })}
          >
            {states.map((state, index) => (
              <IonSelectOption key={index} value={state.nombre}>
                {capitalize(state.nombre)}
              </IonSelectOption>
            ))}
          </IonSelect>
          {errors.state && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.state.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          {
            // TODO: convert city select in a modal with selectable and searchable list
          }
          <IonSelect
            label={capitalize(t('createPetStep3.city.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep3.city.placeholder'))}
            {...register('city', {
              required: {
                value: true,
                message: capitalize(t('createPetStep3.city.errors.required')),
              },
            })}
          >
            {cities.map((city, index) => (
              <IonSelectOption key={index} value={city.nombre}>
                {capitalize(city.nombre)}
              </IonSelectOption>
            ))}
          </IonSelect>
          {errors.city && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.city.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonInput
            label={capitalize(t('createPetStep3.neighborhood.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(
              t('createPetStep3.neighborhood.placeholder'),
            )}
            type="text"
            {...register('neighborhood', {
              maxLength: {
                value: 500,
                message: capitalize(
                  t('createPetStep3.neighborhood.errors.maxLength', {
                    maxLength: 80,
                  }),
                ),
              },
              minLength: {
                value: 3,
                message: capitalize(
                  t('createPetStep3.neighborhood.errors.minLength', {
                    minLength: 3,
                  }),
                ),
              },
            })}
          />
          {errors.neighborhood && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.neighborhood.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonTextarea
            label={capitalize(t('createPetStep3.description.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(
              t('createPetStep3.description.placeholder'),
            )}
            {...register('description', {
              maxLength: {
                value: 3000,
                message: capitalize(
                  t('createPetStep3.description.errors.maxLength', {
                    maxLength: 3000,
                  }),
                ),
              },
            })}
          ></IonTextarea>
          {errors.description && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.description.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <div className="flex justify-around">
            <IonToggle
              onIonChange={(e) => {
                e.preventDefault();
                setValue('available', e.detail.checked);
              }}
              {...register('available')}
              checked={getValues('available')}
            >
              <IonText>
                <p className="bold text-lg">
                  {capitalize(t('createPetStep3.available.label'))}
                </p>
              </IonText>
            </IonToggle>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
