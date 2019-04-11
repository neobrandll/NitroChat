import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor() { }

  handleImage(imageData: string) {
    let imageFile;
    try {
      const base64ContentArray = imageData.split(',');
      const mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
      imageFile = this.base64toBlob(
          base64ContentArray[1],
          mimeType
      );
    } catch (error) {
      console.log(error);
      return of(null);
    }

    return of(imageFile);
  }

  base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
