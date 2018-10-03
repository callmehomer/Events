import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Instagram } from '@ionic-native/instagram';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  myPhoto: string;
  readyToShare = false;

  constructor(public navCtrl: NavController, private camera: Camera, private instagram: Instagram) {
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      this.readyToShare = true;
     }, (err) => {
      // Handle error
     });
  }

  sharePhoto(){
    this.instagram.share(this.myPhoto, 'some copy pase').then(() => {
      this.readyToShare = false;
    })
  }
}
