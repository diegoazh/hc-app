import { useStorage } from '@hooks';
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
import { capitalize } from '@utils';
import {
  listOutline,
  listSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
} from 'ionicons/icons';
import { User } from 'oidc-client-ts';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation } from 'react-router-dom';
import './Menu.scss';

interface AppPage {
  href?: string;
  url?: string;
  onClick?: () => void;
  iosIcon: string;
  mdIcon: string;
  title: string;
  secure: boolean;
}

export const Menu: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<User | null | undefined>(null);

  const { t } = useTranslation();
  const location = useLocation();
  const store = useStorage();
  const { signinRedirect, signoutSilent, user } = useAuth();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    setLoggedUser(user);
  }, [loggedUser, user]);

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
      onClick: () =>
        signinRedirect().catch((e) => {
          showBoundary(e);
        }),
      iosIcon: logInOutline,
      mdIcon: logInSharp,
      secure: false,
    },
    {
      title: capitalize(t('menu.logout')),
      onClick: () =>
        signoutSilent().catch((e) => {
          showBoundary(e);
        }),
      iosIcon: logOutOutline,
      mdIcon: logOutSharp,
      secure: true,
    },
  ];

  store.get('user').then((info) => {
    setLoggedUser(info);
  });

  const pagesResult = appPages
    .map((appPage, index) => {
      return (
        <IonMenuToggle key={index} autoHide={false}>
          {(appPage.title.toLowerCase() === 'login' ||
            appPage.title.toLowerCase() === 'logout') && <hr />}
          <IonItem
            className={location.pathname === appPage.url ? 'selected' : ''}
            href={appPage.href}
            routerLink={appPage.url}
            onClick={appPage.onClick}
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
      if (loggedUser?.profile.email) {
        if (appPages[index].title.toLowerCase() !== 'login') {
          return item;
        }
      } else {
        if (!appPages[index].secure) {
          return item;
        }
      }
    });

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>
            {loggedUser?.profile.name || 'Anonymous'}
          </IonListHeader>
          <IonNote>{loggedUser?.profile.email || ''}</IonNote>
          {pagesResult}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
