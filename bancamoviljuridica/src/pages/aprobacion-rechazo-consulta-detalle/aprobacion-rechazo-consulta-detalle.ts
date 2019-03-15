import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AprobacionRechazoConsultaDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aprobacion-rechazo-consulta-detalle',
  templateUrl: 'aprobacion-rechazo-consulta-detalle.html',
})
export class AprobacionRechazoConsultaDetallePage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.item = navParams.get('itemPassed');
      this.firmasFaltantes = navParams.get('firmasFaltantes');
      this.cantidadFirmas = navParams.get('cantidadFirmas');
      
      console.log("Trae esto: ", this.item);
      this.cuentaCredito      = this.item.OP_Destino         ;
      this.cuentaDebito       = this.item.OP_Origen          ;
      this.montoValue         = this.item.OP_Monto           ;
      this.BANK_ID            = this.item.BANK_ID            ;                
      this.BANK_NOMBRE        = this.item.BANK_NOMBRE        ;
      //Cod trae el código de operación, con esto mostramos las opciones en la vista.                  
      this.Cod                = this.item.Cod                ;                           
      this.Es_Descripcion     = this.item.Es_Descripcion     ;
      this.Nombre             = this.item.Nombre             ;
      this.OP_Beneficiario    = this.item.OP_Beneficiario    ;
      this.OP_CodClienteGrupo = this.item.OP_CodClienteGrupo ;
      this.OP_CodeTran        = this.item.OP_CodeTran        ;
      this.OP_Concepto        = this.item.OP_Concepto        ;
      this.OP_DATA            = this.item.OP_DATA            ;
      this.OP_DATE            = this.item.OP_DATE            ;    
      this.OP_Destino         = this.item.OP_Destino         ;                      
      this.OP_ID              = this.item.OP_ID              ;                    
      this.OP_IdBeneficiario  = this.item.OP_IdBeneficiario  ;                          
      this.OP_IdServicio      = this.item.OP_IdServicio      ;                            
      this.OP_Interface       = this.item.OP_Interface       ;                        
      this.OP_Mail            = this.item.OP_Mail            ;                  
      this.OP_Monto           = this.item.OP_Monto           ;                    
      this.OP_OlbId           = this.item.OP_OlbId           ;                      
      this.OP_Origen          = this.item.OP_Origen          ;                      
      this.OP_RifGrupo        = this.item.OP_RifGrupo        ;      
      console.log("Monto:",this.montoValue)                  ;         
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AprobacionRechazoConsultaDetallePage');
  }

}
