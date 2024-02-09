import { ToastOptions, useIonToast } from '@ionic/react';
import { HookOverlayOptions } from '@ionic/react/dist/types/hooks/HookOverlayOptions';

type AppToastOptions = ToastOptions & HookOverlayOptions;

export const useAppToast = () => {
  const [present] = useIonToast();

  function presentAppToast(
    message: string,
    extraOptions?: Omit<AppToastOptions, 'message'>,
  ): void;
  function presentAppToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    duration: number,
    extraOptions?: Omit<AppToastOptions, 'message' | 'position' | 'duration'>,
  ): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function presentAppToast(...options: any[]): void {
    if (options.length < 4) {
      const [message, extraOptions] = options as [
        message: string,
        extraOptions: Omit<AppToastOptions, 'message'>,
      ];
      const { duration = 5000, position = 'bottom', ...extras } = extraOptions;

      present({
        message,
        duration,
        position,
        ...extras,
      });
    } else {
      const [message, position = 'bottom', duration = 5000, extras = {}] =
        options;

      present({
        message,
        duration,
        position,
        ...extras,
      });
    }
  }

  return { presentAppToast };
};
