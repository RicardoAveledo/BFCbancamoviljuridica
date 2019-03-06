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
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginProvider } from '../providers/login/login';
import { UserSessionProvider } from '../providers/user-session/user-session';
import { AprobacionRechazoPrincipalPage } from '../pages/aprobacion-rechazo-principal/aprobacion-rechazo-principal';
import { TdcMismoTitularBfcPage } from '../pages/tdc-mismo-titular-bfc/tdc-mismo-titular-bfc';
import { TdcMismoTitularOtrosBancosPage } from '../pages/tdc-mismo-titular-otros-bancos/tdc-mismo-titular-otros-bancos';
import { TdcTercerosBfcPageModule } from '../pages/tdc-terceros-bfc/tdc-terceros-bfc.module';
import { TdcTercerosBfcPage } from '../pages/tdc-terceros-bfc/tdc-terceros-bfc';
import { TdcTercerosOtrosBancosPage } from '../pages/tdc-terceros-otros-bancos/tdc-terceros-otros-bancos';
import { TransferenciaTercerosBfcConfirmarPage } from '../pages/transferencia-terceros-bfc-confirmar/transferencia-terceros-bfc-confirmar';
import { TransferenciasTercerosBfcReciboPage } from '../pages/transferencias-terceros-bfc-recibo/transferencias-terceros-bfc-recibo';
import { TransferenciaMismoTitularOtrosBancosDetallePage } from '../pages/transferencia-mismo-titular-otros-bancos-detalle/transferencia-mismo-titular-otros-bancos-detalle';
import { TransferenciaMismoTitularOtrosBancosConfirmarPage } from '../pages/transferencia-mismo-titular-otros-bancos-confirmar/transferencia-mismo-titular-otros-bancos-confirmar';
import { TransferenciaMismoTitularOtrosBancosReciboPage } from '../pages/transferencia-mismo-titular-otros-bancos-recibo/transferencia-mismo-titular-otros-bancos-recibo';
import { TransferenciaTercerosOtrosBancosDetallePage } from '../pages/transferencia-terceros-otros-bancos-detalle/transferencia-terceros-otros-bancos-detalle';
import { TransferenciaTercerosOtrosBancosConfirmarPage } from '../pages/transferencia-terceros-otros-bancos-confirmar/transferencia-terceros-otros-bancos-confirmar';
import { PagoTdcMismoTitularBfcPage } from '../pages/pago-tdc-mismo-titular-bfc/pago-tdc-mismo-titular-bfc';
import { PagoTdcMismoTitularBfcConfirmarPage } from '../pages/pago-tdc-mismo-titular-bfc-confirmar/pago-tdc-mismo-titular-bfc-confirmar';
import { PagoTdcMismoTitularBfcReciboPage } from '../pages/pago-tdc-mismo-titular-bfc-recibo/pago-tdc-mismo-titular-bfc-recibo';
import { PagoTdcTercerosBfcConfirmarPage } from '../pages/pago-tdc-terceros-bfc-confirmar/pago-tdc-terceros-bfc-confirmar';
import { PagoTdcTercerosBfcDetallePage } from '../pages/pago-tdc-terceros-bfc-detalle/pago-tdc-terceros-bfc-detalle';
import { PagoTdcTercerosBfcReciboPage } from '../pages/pago-tdc-terceros-bfc-recibo/pago-tdc-terceros-bfc-recibo';
import { PagoTdcTercerosBfcPage } from '../pages/pago-tdc-terceros-bfc/pago-tdc-terceros-bfc';

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
    TransferenciaMismoTitularOtrosBancosDetallePage,
    TransferenciaMismoTitularOtrosBancosConfirmarPage,
    TransferenciaMismoTitularOtrosBancosReciboPage,
    TransferenciaTercerosBfcConfirmarPage,
    TransferenciasTercerosBfcReciboPage,
    TransferenciasTercerosDetallePage,
    TransferenciaTercerosOtrosBancosPage,
    TransferenciaTercerosOtrosBancosDetallePage,
    TransferenciaTercerosOtrosBancosConfirmarPage,
    TransferenciaTercerosOtrosBancosReciboPage,
    TransferenciaTercerosBFCPage,
    AprobacionRechazoPrincipalPage,
    TdcMismoTitularBfcPage,
    TdcMismoTitularOtrosBancosPage,
    TdcTercerosBfcPage,
    TdcTercerosOtrosBancosPage,
    PagoTdcMismoTitularBfcPage,
    PagoTdcMismoTitularBfcConfirmarPage,
    PagoTdcMismoTitularBfcReciboPage,
    PagoTdcTercerosBfcConfirmarPage,
    PagoTdcTercerosBfcDetallePage,
    PagoTdcTercerosBfcReciboPage,
    PagoTdcTercerosBfcPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    TransferenciaMismoTitularOtrosBancosDetallePage,
    TransferenciaMismoTitularOtrosBancosConfirmarPage,
    TransferenciaMismoTitularOtrosBancosReciboPage,
    TransferenciaTercerosBfcConfirmarPage,
    TransferenciasTercerosBfcReciboPage,
    TransferenciaTercerosBFCPage,
    TransferenciasTercerosDetallePage,
    TransferenciaTercerosOtrosBancosPage,
    TransferenciaTercerosOtrosBancosDetallePage,
    TransferenciaTercerosOtrosBancosConfirmarPage,
    TransferenciaTercerosOtrosBancosReciboPage,
    AprobacionRechazoPrincipalPage,
    TdcMismoTitularBfcPage,
    TdcMismoTitularOtrosBancosPage,
    TdcTercerosBfcPage,
    TdcTercerosOtrosBancosPage,
    PagoTdcMismoTitularBfcPage,
    PagoTdcMismoTitularBfcConfirmarPage,
    PagoTdcMismoTitularBfcReciboPage,
    PagoTdcTercerosBfcConfirmarPage,
    PagoTdcTercerosBfcDetallePage,
    PagoTdcTercerosBfcReciboPage,
    PagoTdcTercerosBfcPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    HttpClientModule,
    UserSessionProvider
  ]
})
export class AppModule {}