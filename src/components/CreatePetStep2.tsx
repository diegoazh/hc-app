import {
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import { closeCircleOutline, closeCircleSharp } from 'ionicons/icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ProductAge,
  ProductHealth,
  ProductSize,
  ProductType,
  capitalize,
} from '../utils';
import { ICreatePetFormInputs } from '../pages';

interface ICreatePetStep2Props {
  register: UseFormRegister<ICreatePetFormInputs>;
  errors: FieldErrors<ICreatePetFormInputs>;
}

export const CreatePetStep2: React.FC<ICreatePetStep2Props> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation();

  return (
    <IonGrid className="ion-padding">
      <IonRow>
        <IonCol size="12">
          <IonInput
            label={capitalize(t('createPetStep2.name.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep2.name.placeholder'))}
            type="text"
            {...register('name', {
              required: {
                value: true,
                message: capitalize(t('createPetStep2.name.errors.required')),
              },
              maxLength: {
                value: 80,
                message: capitalize(
                  t('createPetStep2.name.errors.maxLength', {
                    maxLength: 80,
                  }),
                ),
              },
              minLength: {
                value: 3,
                message: capitalize(
                  t('createPetStep2.name.errors.minLength', {
                    minLength: 3,
                  }),
                ),
              },
            })}
          />
          {errors.name && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.name.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonSelect
            label={capitalize(t('createPetStep2.age.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep2.age.placeholder'))}
            {...register('age', {
              required: {
                value: true,
                message: capitalize(t('createPetStep2.age.errors.required')),
              },
            })}
          >
            <IonSelectOption value={ProductAge.PUPPY}>
              {capitalize(t('createPetStep2.age.options.puppy'))}
            </IonSelectOption>
            <IonSelectOption value={ProductAge.ADULT}>
              {capitalize(t('createPetStep2.age.options.adult'))}
            </IonSelectOption>
            <IonSelectOption value={ProductAge.ELDER}>
              {capitalize(t('createPetStep2.age.options.elder'))}
            </IonSelectOption>
          </IonSelect>
          {errors.age && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.age.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonSelect
            label={capitalize(t('createPetStep2.type.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep2.type.placeholder'))}
            {...register('type', {
              required: {
                value: true,
                message: capitalize(t('createPetStep2.type.errors.required')),
              },
            })}
          >
            <IonSelectOption value={ProductType.CAT}>
              {capitalize(t('createPetStep2.type.options.cat'))}
            </IonSelectOption>
            <IonSelectOption value={ProductType.DOG}>
              {capitalize(t('createPetStep2.type.options.dog'))}
            </IonSelectOption>
            <IonSelectOption value={ProductType.OTHER}>
              {capitalize(t('createPetStep2.type.options.other'))}
            </IonSelectOption>
          </IonSelect>
          {errors.type && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.type.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonSelect
            label={capitalize(t('createPetStep2.size.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep2.size.placeholder'))}
            {...register('size', {
              required: {
                value: true,
                message: capitalize(t('createPetStep2.size.errors.required')),
              },
            })}
          >
            <IonSelectOption value={ProductSize.SMALL}>
              {capitalize(t('createPetStep2.size.options.small'))}
            </IonSelectOption>
            <IonSelectOption value={ProductSize.MEDIUM}>
              {capitalize(t('createPetStep2.size.options.medium'))}
            </IonSelectOption>
            <IonSelectOption value={ProductSize.BIG}>
              {capitalize(t('createPetStep2.size.options.big'))}
            </IonSelectOption>
          </IonSelect>
          {errors.size && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.size.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonSelect
            label={capitalize(t('createPetStep2.health.label'))}
            labelPlacement="stacked"
            placeholder={capitalize(t('createPetStep2.health.placeholder'))}
            {...register('health', {
              required: {
                value: true,
                message: capitalize(t('createPetStep2.health.errors.required')),
              },
            })}
          >
            <IonSelectOption value={ProductHealth.HEALTHY}>
              {capitalize(t('createPetStep2.health.options.healthy'))}
            </IonSelectOption>
            <IonSelectOption value={ProductHealth.UNHEALTHY}>
              {capitalize(t('createPetStep2.health.options.unhealthy'))}
            </IonSelectOption>
            <IonSelectOption value={ProductHealth.UNDER_TREATMENT}>
              {capitalize(t('createPetStep2.health.options.underTreatment'))}
            </IonSelectOption>
          </IonSelect>
          {errors.health && (
            <IonText color="danger">
              <p>
                <IonIcon
                  ios={closeCircleOutline}
                  md={closeCircleSharp}
                ></IonIcon>
                {errors.health.message}
              </p>
            </IonText>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
