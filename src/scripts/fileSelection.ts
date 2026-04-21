import { getFirstFile, isSupportedImageFile, toImageObjectUrl } from './fileValidation';
import type { LoadedImage } from './types';

export const readSelectedImage = (fileList: FileList | null): LoadedImage | null => {
  const file = getFirstFile(fileList);

  if (file === null || !isSupportedImageFile(file)) {
    return null;
  }

  return {
    fileName: file.name,
    objectUrl: toImageObjectUrl(file),
  };
};
