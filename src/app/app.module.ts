import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule ,IonicModule.forRoot(), AppRoutingModule],
  providers: [SocialSharing,NativeStorage, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}
