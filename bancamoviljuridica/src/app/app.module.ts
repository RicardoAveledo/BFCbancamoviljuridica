import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PosiciNConsolidadaPage } from '../pages/posici-nconsolidada/posici-nconsolidada';
import { TransferenciasPage } from '../pages/transferencias/transferencias';
import { OperacionesDeTDCPage } from '../pages/operaciones-de-tdc/operaciones-de-tdc';
import { LoginPage } from '../pages/login/login';
import { AprobaciNRechazoPage } from '../pages/aprobaci-nrechazo/aprobaci-nrechazo';
import { DetalleDeLaCuentaPage } from '../pages/detalle-de-la-cuenta/detalle-de-la-cuenta';
import { DetalleDeTarjetaPage } from '../pages/detalle-de-tarjeta/detalle-de-tarjeta';
import { TransferenciasMismoTitularBFCPage } from '../pages/transferencias-mismo-titular-bfc/transferencias-mismo-titular-bfc';
import { ConfirmaciNTransferenciaMismoTitularBFCPage } from '../pages/confirmaci-ntransferencia-mismo-titular-bfc/confirmaci-ntransferencia-mismo-titular-bfc';
import { TransferenciaMismoTitularBFCReciboPage } from '../pages/transferencia-mismo-titular-bfcrecibo/transferencia-mismo-titular-bfcrecibo';
import { TransferenciaMismoTitularOtrosBancosPage } from '../pages/transferencia-mismo-titular-otros-bancos/transferencia-mismo-titular-otros-bancos';
import { TransferenciaTercerosBFCPage } from '../pages/transferencia-terceros-bfc/transferencia-terceros-bfc';
import { TransferenciasTercerosDetallePage } from '../pages/transferencias-terceros-detalle/transferencias-terceros-detalle';
import { TransferenciaTercerosOtrosBancosPage } from '../pages/transferencia-terceros-otros-bancos/transferencia-terceros-otros-bancos';
import { TransferenciaTercerosOtrosBancosReciboPage } from '../pages/transferencia-terceros-otros-bancos-recibo/transferencia-terceros-otros-bancos-recibo';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MyApp,
    PosiciNConsolidadaPage,
    TransferenciasPage,
    OperacionesDeTDCPage,
    LoginPage,
    AprobaciNRechazoPage,
    DetalleDeLaCuentaPage,
    DetalleDeTarjetaPage,
    TransferenciasMismoTitularBFCPage,
    ConfirmaciNTransferenciaMismoTitularBFCPage,
    TransferenciaMismoTitularBFCReciboPage,
    TransferenciaMismoTitularOtrosBancosPage,
    TransferenciaTercerosBFCPage,
    TransferenciasTercerosDetallePage,
    TransferenciaTercerosOtrosBancosPage,
    TransferenciaTercerosOtrosBancosReciboPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Regresar',
      iconMode: 'ios',
      backButtonIcon: 'none',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }
  )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PosiciNConsolidadaPage,
    TransferenciasPage,
    OperacionesDeTDCPage,
    LoginPage,
    AprobaciNRechazoPage,
    DetalleDeLaCuentaPage,
    DetalleDeTarjetaPage,
    TransferenciasMismoTitularBFCPage,
    ConfirmaciNTransferenciaMismoTitularBFCPage,
    TransferenciaMismoTitularBFCReciboPage,
    TransferenciaMismoTitularOtrosBancosPage,
    TransferenciaTercerosBFCPage,
    TransferenciasTercerosDetallePage,
    TransferenciaTercerosOtrosBancosPage,
    TransferenciaTercerosOtrosBancosReciboPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}