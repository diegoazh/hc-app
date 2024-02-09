import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { Page } from '../layouts';

export const CreatePetStep2: React.FC = () => {
  return (
    <Page title="Create pet add Pictures">
      {'Step 2'}
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonButton
              color="warning"
              routerLink="/create/step-1"
              routerDirection="back"
            >
              Back
            </IonButton>
            <IonButton routerLink="/create/step-3" routerDirection="forward">
              Next
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Page>
  );
};
