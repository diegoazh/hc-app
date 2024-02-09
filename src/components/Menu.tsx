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
  logOutOutline,
  logOutSharp,
} from 'ionicons/icons';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Menu.scss';
import { useTranslation } from 'react-i18next';
import { capitalize } from '@utils';

interface AppPage {
  href?: string;
  url?: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  secure: boolean;
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
      secure: false,
    },
    {
      title: capitalize(t('menu.login')),
      href: 'https://app.starter.io/auth/login',
      iosIcon: logInOutline,
      mdIcon: logInSharp,
      secure: false,
    },
    {
      title: capitalize(t('menu.logout')),
      href: 'https://app.starter.io/auth/login',
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
      secure: false,
    },
  ];

  store.get('user').then((info) => {
    setUser(info);
  });

  const pagesResult = appPages
    .map((appPage, index) => {
      return (
        <IonMenuToggle key={index} autoHide={false}>
          <IonItem
            className={location.pathname === appPage.url ? 'selected' : ''}
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
    })
    .filter((item, index) => {
      if (
        appPages[index].secure &&
        user?.email &&
        appPages[index].title.toLowerCase() !== 'login'
      ) {
        return item;
      }

      if (
        !appPages[index].secure &&
        appPages[index].title.toLowerCase() !== 'logout'
      ) {
        return item;
      }
    });

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{user?.name || 'Anonymous'}</IonListHeader>
          <IonNote>{user?.email || ''}</IonNote>
          {pagesResult}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
