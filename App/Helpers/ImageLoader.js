import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from 'native-base';
import base64ToArrayBuffer from 'App/Helpers/base64-arraybuffer';
import * as Sessions from 'App/Storages/Sessions';
import * as Styles from 'App/Styles';

import * as Hooks from './Hooks';







/**
 * Helper for load image from Http
 */
export function imageLoader(image) {
    let isFullURL = /http/.test(image);
    let isLocal = /file/.test(image);

    if (isFullURL) {
        return { uri: image };
    } else if (isLocal) {
        return { uri: image };
    }
    else {
        return image;
    }
}



/**
 * Select & Upload Image
 * @param {Enum} type - single | multi
 * @param {Object} data - request data
 * @return {Promise}
 */

export function selectImage(
    type = 'single',
    upload_azure = false,
    data = {},
    mode = 'picker',
    customImagePickerOptions = {},
    enableGallery = true
) {

    let pickerSource = [
        { text: "Gallery", icon: 'image', iconColor: Styles.Colors.black, size: 10 },
        { text: "Camera", icon: 'camera', iconColor: Styles.Colors.black, size: 10 },
        { text: "Cancel", icon: 'close', iconColor: Styles.Colors.black, size: 10 },

    ];
    let cancelButtonIndex;
    let cameraButtonIndex;
    let galeryButtonIndex;

    if (enableGallery) {
        cancelButtonIndex = 2;
        cameraButtonIndex = 1;
        galeryButtonIndex = 0;
    }
    else {
        pickerSource.shift();
        cancelButtonIndex = 1;
        cameraButtonIndex = 0;
    }

    // BRYN CODE
    // Do not show alert error if user cancelled pick image
    let EXCEPTION_ERROR_MESSAGE = "User cancelled image selection";

    return new Promise((resolve, reject) => {
        let imagePickerOptions = {};
        switch (type) {
            case 'single':
                imagePickerOptions = {
                    width: 300,
                    height: 300,
                    cropping: true,
                    includeBase64: true,
                    mediaType: 'photo',
                }
                break;
            case 'multi':
                imagePickerOptions = {
                    multiple: true,
                    mediaType: 'photo',
                }
                break;
            case 'custom':
                imagePickerOptions = customImagePickerOptions
                break;
            default:
                type = 'single';
                imagePickerOptions = {
                    width: 300,
                    height: 300,
                    cropping: true,
                    includeBase64: true,
                    mediaType: 'photo',
                }
                break;
        }

        // if (Object.keys(data).length > 0) {
        // Select Source
        ActionSheet.show(
            {
                title: "Pilihan",
                options: pickerSource,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (buttonIndex === galeryButtonIndex) {
                    // Image Source from Galery
                    // Open Image Picker
                    ImagePicker.openPicker(imagePickerOptions).then((images) => {
                        Hooks.consoleLog("Image Picked", images);

                        if (upload_azure) {
                            imageUploader(type, data, images).then((response) => {
                                resolve(response);
                            }).catch((err) => {
                                reject({ message: `Image Uploader Error: ${err.message}` });
                            });
                        }
                        else {
                            resolve(images);
                        }

                    }).catch((err) => {
                        if (err.message !== EXCEPTION_ERROR_MESSAGE) {
                            reject({ message: `Image Picker Error: ${err.message}` });
                        }
                    });
                } else if (buttonIndex === cameraButtonIndex) {
                    // Image Source from Camera
                    // Open Image Picker
                    ImagePicker.openCamera(imagePickerOptions).then((images) => {
                        Hooks.consoleLog("Image Picked", images);

                        if (upload_azure) {
                            imageUploader(type, data, images).then((response) => {
                                resolve(response);
                            }).catch((err) => {
                                reject({ message: `Image Uploader Error: ${err.message}` });
                            });
                        }
                        else {
                            resolve(images);
                        }

                    }).catch((err) => {
                        if (err.message !== EXCEPTION_ERROR_MESSAGE) {
                            reject({ message: `Image Picker Error: ${err.message}` });
                        }
                    });
                }
            }
        );
        // } else {
        //   reject({ message: lang('error.upload_data') });
        // }
    });
}


