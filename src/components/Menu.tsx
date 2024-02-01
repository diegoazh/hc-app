import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useStorage } from '@hooks';
import {
  listOutline,
  listSharp,
  logInOutline,
  logInSharp,
} from 'ionicons/icons';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.css';
import { useTranslation } from 'react-i18next';
import { capitalize } from '@utils';

interface AppPage {
  href?: string;
  url?: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export const Menu: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const store = useStorage();
  const [user, setUser] = useState<
    { name: string; email: string } | undefined
  >();

  const appPages: AppPage[] = [
    {
      title: capitalize(t('menu.adoption')),
      url: '/adoption',
      iosIcon: listOutline,
      mdIcon: listSharp,
    },
    {
      title: capitalize(t('menu.login')),
      href: 'https://app.starter.io/auth/login',
      iosIcon: logInOutline,
      mdIcon: logInSharp,
    },
  ];

  const secureAppPages: AppPage[] = [];

  store.get('logged').then((info) => {
    setUser(info);
  });

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{user?.name || 'Anonymous'}</IonListHeader>
          <IonNote>{user?.email || ''}</IonNote>
          {user?.email
            ? secureAppPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === appPage.url ? 'selected' : ''
                      }
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon
                        aria-hidden="true"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })
            : appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={
                        location.pathname === appPage.url ? 'selected' : ''
                      }
                      href={appPage.href}
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon
                        aria-hidden="true"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
