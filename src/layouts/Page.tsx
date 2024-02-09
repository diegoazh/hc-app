import {
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import './Page.scss';

interface PageProps {
  title: string;
  footer?: JSX.Element;
  handleRefresh?: (event: CustomEvent<RefresherEventDetail>) => void;
  children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  title,
  footer,
  handleRefresh,
  children,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="dark" />
          </IonButtons>
          <IonTitle className="ion-text-center">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
      {footer ? (
        <IonFooter>
          <IonToolbar>{footer}</IonToolbar>
        </IonFooter>
      ) : undefined}
    </IonPage>
  );
};
