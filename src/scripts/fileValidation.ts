import { supportedImageMimeTypes } from './constants';

const supportedMimeTypeSet = new Set<string>(supportedImageMimeTypes);

export const isSupportedImageFile = (file: File): boolean => supportedMimeTypeSet.has(file.type);

export const getFirstFile = (fileList: FileList | null): File | null => fileList?.item(0) ?? null;

export const toImageObjectUrl = (file: File): string => URL.createObjectURL(file);
