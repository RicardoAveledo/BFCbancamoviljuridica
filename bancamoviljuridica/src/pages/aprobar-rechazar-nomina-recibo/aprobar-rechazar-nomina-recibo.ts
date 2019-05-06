import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserSessionProvider } from '../../providers/user-session/user-session';
import xml2js from 'xml2js';
/**
 * Generated class for the AprobarRechazarNominaReciboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aprobar-rechazar-nomina-recibo',
  templateUrl: 'aprobar-rechazar-nomina-recibo.html',
})
export class AprobarRechazarNominaReciboPage {
  public item;
  public cuentaDebito:string;
  public cuentaCredito:string;
  public montoValue:number;
  public BANK_ID:string;            
  public BANK_NOMBRE:string;        
  public Cod:string;                
  public Es_Descripcion:string;     
  public Nombre:string;             
  public OP_Beneficiario:string;    
  public OP_CodClienteGrupo:string; 
  public OP_CodeTran:string;        
  public OP_Concepto:string;        
  public OP_DATA:string;            
  public OP_DATE:string;            
  public OP_Destino:string;         
  public OP_ID:string;              
  public OP_IdBeneficiario:string;  
  public OP_IdServicio:string;      
  public OP_Interface:string;       
  public OP_Mail:string;            
  public OP_Monto:string;           
  public OP_OlbId:string;          
  public OP_Origen:string;          
  public OP_RifGrupo:string;        
  public firmasFaltantes:string;        
  public cantidadFirmas:string;        
  public estado:string;     
  public fechaEfectiva:string;
  public horaEfectiva:string;   
  public FechaValor: string;  
  public HoraValor: string;  
  public NombreArchivo: string;  
  public EstadoLote: string;  
  public TotalRegistros: string;  
  public Monto: string;  
  public TipoCarga: string;  
  public MotivoPago: string;  
  public CuentaDebitar: string;  
  public correoUsuario:string;
  public usuarioProceso:string;
  public hours:number;
  public minutes:number;
  public day:number;
  public month:number;
  public year:number;
  public hoursStr:string;
  public minutesStr:string;
  public dayStr:string;
  public monthStr:string;
  public yearStr:string;
  public yearprint:string;
  public fecha:string;
  public fechaToSend:string;
  public referencia:string;
  public noCuenta:string;
  public CodigoOTP:string;

  constructor(public httpClient: HttpClient, private alertCtrl: AlertController, public userSession:UserSessionProvider, public navCtrl: NavController, public navParams: NavParams) {
      this.EstadoLote = navParams.get("EstadoLote");
      this.OP_CodeTran = navParams.get("OP_CodeTran");
      this.OP_ID = navParams.get("OP_ID");
      this.NombreArchivo = navParams.get("NombreArchivo");
      this.TipoCarga = navParams.get("TipoCarga");
      this.usuarioProceso = navParams.get("usuarioProceso");
      this.correoUsuario = navParams.get("correoUsuario");
      this.CuentaDebitar = navParams.get("CuentaDebitar");
      this.TotalRegistros = navParams.get("TotalRegistros");
      this.Monto = navParams.get("Monto");
      this.MotivoPago = navParams.get("MotivoPago");
      this.fechaEfectiva = navParams.get("fechaEfectiva");
      this.horaEfectiva = navParams.get("horaEfectiva");
      this.estado = navParams.get("estado");
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AprobarRechazarNominaReciboPage');
  }

}
