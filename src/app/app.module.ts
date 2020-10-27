import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuftragItemComponent } from './auftrag-item/auftrag-item.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { IdbService } from './services/idb.service';

@NgModule({
  declarations: [AppComponent, AuftragItemComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('sw-master.js', {
      enabled: environment.production,
    }),
  ],
  providers: [IdbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
