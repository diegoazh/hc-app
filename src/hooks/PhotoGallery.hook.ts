import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import _difference from 'lodash.difference';

export type DeletePhotoFn = (
  photosToDelete: UserPhoto | UserPhoto[],
) => Promise<void>;
export type TakePhotoFn = () => Promise<void>;

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const PHOTO_STORAGE = 'photos';

export const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTO_STORAGE });
      const photosInPreferences = (
        value ? JSON.parse(value) : []
      ) as UserPhoto[];

      if (isPlatform('hybrid')) {
        for (const photo of photosInPreferences) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });

          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }

      setPhotos(photosInPreferences);
    };

    loadSaved();
  }, []);

  const savePhoto = async (
    photo: Photo,
    fileName: string,
  ): Promise<UserPhoto> => {
    let base64Data: string;

    if (isPlatform('hybrid') && photo.path) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      base64Data = file.data as string;
    } else if (photo.webPath) {
      base64Data = await base64FromPath(photo.webPath);
    } else {
      return Promise.reject('path or webPath can be empty');
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform('hybrid')) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }

    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = `${Date.now()}_hc-pet.jpeg`;
    await savePhoto(photo, fileName);
    setPhotos((prevPhotos) => {
      const newPhotos = [
        ...prevPhotos,
        {
          filepath: fileName,
          webviewPath: photo.webPath,
        },
      ];
      Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });

      return newPhotos;
    });
  };

  const deletePhoto = async (photosToDelete: UserPhoto | UserPhoto[]) => {
    const toDelete = !Array.isArray(photosToDelete)
      ? [photosToDelete]
      : photosToDelete;
    const newPhotos = _difference(photos, toDelete);
    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
    const fileNames = toDelete.map((p) =>
      p.filepath.substring(p.filepath.lastIndexOf('/') + 1),
    );
    const fileDeletePromises = fileNames.map((f) => {
      Filesystem.deleteFile({ path: f, directory: Directory.Data });
    });

    await Promise.all(fileDeletePromises);
    setPhotos(newPhotos);
  };

  return { photos, takePhoto, deletePhoto };
};

export async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };

    reader.readAsDataURL(blob);
  });
}
