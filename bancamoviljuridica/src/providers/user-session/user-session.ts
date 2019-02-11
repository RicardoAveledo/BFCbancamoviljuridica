import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserSessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSessionProvider {
  public validar:boolean = false;
  public validarPC:boolean = false;
  public validarTR:boolean = false;
  public validarTDC:boolean = false;
  public validarAPR:boolean = false;
  public cuentas:any[] = [];
  public AF_CLAsig:string = "";
  public AF_Cedula:string = "";
  public AF_Clave:string = "";
  public AF_CodCliente1:string = "";
  public AF_CodPrincipal:string = "";
  public AF_Codcliente:string = "";
  public AF_DiasPassword:string = "";
  public AF_Especial:string = "";
  public AF_FecConst:string = "";
  public AF_FechaPassword:string = "";
  public AF_Id:string = "";
  public AF_IdPrincipal:string = "";
  public AF_NombrePrincipal:string = "";
  public AF_NombreUsuario:string = "";
  public AF_PassWordTransacciones:string = "";
  public AF_Password:string = ""; 
  public AF_PreguntaDesafio:string = "";
  public AF_RespuestaPD:string = "";
  public AF_Rif:string = "";
  public AF_TK_FechaCreacion:string = "";
  public AF_TK_FechaUltModificacion:string = "";
  public AF_TK_NombreUsuarioCreacion:string = "";
  public AF_TK_NombreUsuarioUltModificacion:string = "";
  public AF_TK_Status:string = "";  
  public AF_Tarjeta:string = "";
  public AF_Tipo:string = "";
  public CO_Celular:string = "";
  public CO_CodClienteADM:string = "";
  public CO_DocId:string = "";
  public CO_Email:string = "";  
  public CO_EmailRegistroIB:string = "";
  public CO_Id:string = "";  
  public CO_IdentADM:string = "";
  public CO_NOMBRES:string = "";
  public CO_NombresADM:string = "";
  public CO_TelefonoRegistroIB:string = "";
  public ES_Descripcion:string = "";
  public ES_Id:string = "";
  public FI_Descripcion:string = "";  
  public FI_Id:string = "";
  public PE_id:string = "";  
  public ST_Codigo:string = "";
  public ST_Descripcion:string = "";
  public ST_Id:string = "";
  public TI_Descripcion:string = "";
  public TI_Codigo:string = "";
  public TI_Id:string = "";        

  constructor(public http: HttpClient) {
    console.log('Hello UserSessionProvider Provider');
  }

}