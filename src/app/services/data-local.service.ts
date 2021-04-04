import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Article } from '../pages/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[]=[];
  constructor(private nativeStorage: NativeStorage, public toastController: ToastController) { 
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  guardarNoticia(noticia: Article){
      const existe = this.noticias.find(noti => noti.title === noticia.title)
      if (!existe) {
        this.noticias.unshift(noticia);
        this.nativeStorage.setItem('favoritos', this.noticias)
      }
     this.presentToast('Agregado a Favoritos')
  }
  async cargarFavoritos(){
    const favoritos=  await this.nativeStorage.getItem('favoritos');
    if (favoritos) {
      this.noticias= favoritos;
    }
  }
  borrarNoticia(noticia: Article){
      this.noticias = this.noticias.filter(noti => noti.title !== noticia.title)
      this.nativeStorage.setItem('favoritos', this.noticias)
      this.presentToast('Borrado de Favoritos')
  }
}
