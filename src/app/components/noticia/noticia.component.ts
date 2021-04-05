import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../pages/interfaces/interfaces';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { DataLocalService } from '../../services/data-local.service';
const { Browser } = Plugins;
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;
  constructor(private actionSheetController: ActionSheetController, private socialSharing: SocialSharing,
    private dataLocal: DataLocalService, private platform: Platform) { }

  ngOnInit() { }
  async abrirNoticia() {
    await Browser.open({ url: this.noticia.url });

  }
  async lanzarMenu() {
    let guardarBorrarBtn;
    if (this.enFavoritos) {
      //Borrar en Favoritos
      guardarBorrarBtn={
        text: 'Borrar Favorito',
        icon: 'trash',
        handler: () => {
          console.log('Borrar Favorito');
          this.dataLocal.borrarNoticia(this.noticia)
        }
      };
    }else{
      guardarBorrarBtn={
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          console.log('Play clicked');
          this.dataLocal.guardarNoticia(this.noticia)
        }
      }
    }
    const actionSheet = await this.actionSheetController.create({

      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
            this.compartirNoticia();
           
          },
          
        }, 
        guardarBorrarBtn,
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }
  compartirNoticia(){
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      )
    }else{
      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Noticia Compartida Correctamente'))
          .catch((error) => console.log('Error al Compartir', error));
      }else{
        console.log('No se soporta en este navegador')
      }
    }
   
  }
}
