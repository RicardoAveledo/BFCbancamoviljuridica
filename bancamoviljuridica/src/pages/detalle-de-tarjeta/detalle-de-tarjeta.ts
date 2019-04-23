  import { Component } from '@angular/core';
  import { NavController, DateTime, NavParams } from 'ionic-angular';
  import { UserSessionProvider } from '../../providers/user-session/user-session';
  import { HttpHeaders, HttpClient } from '@angular/common/http';
  import xml2js from 'xml2js';
  import { parseDate } from 'ionic-angular/umd/util/datetime-util';
  import { stringify } from '@angular/core/src/util';
  
  @Component({
    selector: 'page-detalle-de-tarjeta',
    templateUrl: 'detalle-de-tarjeta.html'
  })
  export class DetalleDeTarjetaPage {
   
    public checkFirstTime:boolean=true;
    public listvalores:any[]=[]; 
    public sortingListAccount:any[]=[]; 
    public sortingListDates:any[]=[]; 
    public listmeses:any[]=[]; 
    public cuentas:any[]=[];
    public cuentaselected:any[]=[];
    public AF_CodCliente:string;
    public AF_Rif:string;
    public SBloqueado:string ;
    public SContable:string;
    public SDiferido:string;
    public PMinimo:string;
    public FPago:string;
    public CDisponible:string;
    public SDisponible:string;
    public SNroCuenta:string;
    public posicionSelected:number;
    constructor(public userSession:UserSessionProvider, public navCtrl: NavController, public httpClient: HttpClient, public navParams: NavParams) {
      this.AF_CodCliente = userSession.AF_Codcliente;
      this.AF_Rif = userSession.AF_Rif;
      this.cuentaselected = navParams.get('cuentaselected');
      this.posicionSelected = navParams.get('posicion');
      this.cuentas = userSession.tdc;
      this.reloadAccountData();
    }
    
    goBack(params){
      if (!params) params = {};
      this.navCtrl.pop();
    }
  
    reloadAccountData(){
      var itemselected:any[] = this.cuentas[this.posicionSelected]
      console.log("Esto esta en usersession.tdc",this.cuentas);
      console.log(this.cuentas);
      console.log(this.userSession.tdc);
      console.log(itemselected);
      //Estandar: [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible];
      this.FPago=itemselected[7];
      this.SDisponible=itemselected[2];
      this.PMinimo=itemselected[8];
      this.CDisponible=itemselected[4];
      console.log(itemselected[0]);
      this.listvalores=[];
      try {
          //Ahora se procede a traer el menú dinámico:
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'text/xml');
        var httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'text/xml'
          })
        };

        //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
        //Traeremos el id, de la ráfaga anterior (La respuesta, del login) 
    
        var myDated:string = new Date().toISOString();
        var one:number=1;
        var myDateh:string = new Date().toISOString();
        var month:number = new Date().getMonth();
        console.log(month)
        var year:number = new Date().getFullYear();
        var yearprint:string = year.toString().substr(-2);
        var checkyear:boolean;
        if (((year%4==0) && (year%100!=0))||(year % 400 == 0)){
          checkyear = true;
        }else{
          checkyear = false;
        }   
        var monthaux:number = month;
        var yearaux:number = year;
        var cont:number[] =[0,1,2,3,4,5,6,7,8,9,10,11]
        var months:any[]=[];
        months.push(["Últimos 20 movimientos", 0,0,0])
        for (let posicion of cont) {
          var diaInicio:number= 1;
          var diaFin:number;
          var monthName:String;
          if (monthaux+1==1){
            diaFin=31;
            monthName="Enero "+ yearaux.toString();
          }else 
          if(monthaux+1==2){
            if (checkyear){
              diaFin=29;
            } else {
              diaFin =28
            }
            monthName="Febrero "+ yearaux.toString();
          }else
          if (monthaux+1==3){
            diaFin=31;
            monthName="Marzo "+ yearaux.toString();
          }else 
          if (monthaux+1==4){
            diaFin=30;
            monthName="Abril "+ yearaux.toString();
          }else 
          if (monthaux+1==5){
            diaFin=31;
            monthName="Mayo "+ yearaux.toString();
          }else 
          if (monthaux+1==6){
            diaFin=30;
            monthName="Junio "+ yearaux.toString();
          }else 
          if (monthaux+1==7){
            diaFin=31;
            monthName="Julio "+ yearaux.toString();
          }else 
          if (monthaux+1==8){
            diaFin=31;
            monthName="Agosto "+ yearaux.toString();
          }else 
          if (monthaux+1==9){
            diaFin=30;
            monthName="Septiembre "+ yearaux.toString();
          }else 
          if (monthaux+1==10){
            diaFin=31;
            monthName="Octubre "+ yearaux.toString();
          }else 
          if (monthaux+1==11){
            diaFin=30;
            monthName="Noviembre "+ yearaux.toString();
          }else 
          if (monthaux+1==12){
            diaFin=31;
            monthName="Diciembre "+ yearaux.toString();
          }
          months.push([monthName,diaFin,monthaux+1,yearaux]);
          monthaux = monthaux - 1;
          if(monthaux<0){
            monthaux = 11;
            yearaux = yearaux -1;
          }
        }
        var monthsToShow:any[] = []
        for (let print of months){
          console.log(print);
        }
        
        console.log(months);
        this.listmeses = months;
        
        console.log(year)
        var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Afiliado20Movimientos xmlns="http://tempuri.org/">
            <AF_CodCliente>`+this.AF_CodCliente+`</AF_CodCliente>
            <AF_Rif>`+this.AF_Rif+`</AF_Rif>
            <SNroCuenta>`+this.cuentaselected[0]+`</SNroCuenta>
            <fechad>010101</fechad>
            <fechah>010101</fechah>
            <cantMov>20</cantMov>
          </Afiliado20Movimientos>
        </soap:Body>
      </soap:Envelope>`
        console.log('mando esto: '+ this.userSession.AF_Codcliente +' '+this.userSession.AF_Rif +' '+ postData )
      //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
          this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsIbsMovil.asmx?op=Afiliado20Movimientos",postData,httpOptions )
        .subscribe(data => {
          console.log('Data: '+data['_body']); 
          }, error => {
               //Hacemos el parse tal cual como antes:
               console.log('Error: '+JSON.stringify(error));
               var str = JSON.stringify(error);
               console.log("stingified: ", str);
               var search_array = JSON.parse(str);
               console.log("result: ", search_array.error.text);
               var parser = new DOMParser();
               var doc = parser.parseFromString(search_array.error.text, "application/xml");
               console.log(doc);
               var el = doc.createElement("p");
               el.appendChild(doc.getElementsByTagName("soap:Envelope").item(0));
               var tmp = doc.createElement("div");
               tmp.appendChild(el);
               console.log(tmp.innerHTML);
               var parseString = xml2js.parseString;
               var xml = tmp.innerHTML;
               var texto:string = "";
               var self = this;
               parseString(xml, self, function (err, result) {
                   try{
                         console.dir(result);
                         var str = JSON.stringify(result);
                         console.log("stringified: ", result);
                         var search_array = JSON.parse(str);
  
                         var i:number =0;
                         console.log("a");
                         var self2=self
                         search_array.p['soap:Envelope']['0']['soap:Body']['0'].Afiliado20MovimientosResponse['0'].Afiliado20MovimientosResult['0'].stmjvCuentas['0'].smtDetalle['0'].StmrdsjvDet
                         .forEach(element => {
                            var descripcion:string = element.SDesctrans['0'];
                            console.log("b");
                            var sign:string= element.SIndDebCre['0'];
                            console.log("c");
                            var amount:string= element.SMonto['0'];
                            var fechatransaccion:string= element.SFechaEfect['0'];
                            console.log("d");
                            var color:boolean=true;
                            console.log("e");
                            if(sign=="0"){
                              amount = "-"+amount;
                              color=false;
                            }
                            console.log("f");
                            var itemLista = [descripcion,amount,color];
                            console.log("g");
                           // listvalores.push(itemLista);
                            console.log("h");
                            i = i +1;
                            //console.log("Aca",self2.listvalores);
                            self2.listvalores.push(itemLista);
                        });
                        console.log("Aca",self.listvalores);
                         /*console.log("result: ", search_array);
                         console.log("resulta: ", search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table);
                         try{
                           //Acá proceso la ráfaga que me trae las opciones del menú dinámico:
                           search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table
                           .forEach(element => {
                             //Dentro de este foreach me paro en cada elemento que trae
                             //los elementos del menú, si check es igual a las opciones del menú app.html
                               var check:string = element.MD_Nombre['0'];
                               if(check=="Posición Consolidada"){
                                 //De ser true, guardo la variable validarPC en true en userSession
                                  self.userSession.validarPC=true;
                               } else if(check=="Transferencias"){
                                  self.userSession.validarTR=true;
                               } else if(check=="Tarjetas de Crédito"){
                                  self.userSession.validarTDC=true;
                               } else if(check=="Autorización de Transacciones / Lotes"){
                                  self.userSession.validarAPR=true;
                               }
                         });
                         }catch(Error){}*/
  
  
                         //Si en este punto no han ocurrido errores, procedemos a actualizar
                         //las variables del menú haciendo un llamado Events (Ver documentación Menú Dinámico)
                         //self.events.publish('session:created', true);
  
                         //Navegamos
                         //self.navCtrl.setRoot(WelcomePage);
                    }catch(Error){ 
                      //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                      //self.presentToast();
                     }
                   });
        });
        
      } catch (error) {
        
      }
  
    }
  
    reloadAccountDataMonths(itemselected:any[], code:number){ 
      //Estandar: [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible];
      this.SBloqueado=itemselected[1];
      this.SContable=itemselected[2];
      this.SDiferido=itemselected[3];
      this.SDisponible=itemselected[4];
      console.log(itemselected[0]);
      this.listvalores=[];
      try {
        //Ahora se procede a traer el menú dinámico:
       var headers = new HttpHeaders();
       headers.append('Content-Type', 'text/xml');
       var httpOptions = {
           headers: new HttpHeaders({
             'Content-Type':  'text/xml'
         })
       };
  
       //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
       //Traeremos el id, de la ráfaga anterior (La respuesta, del login) 
   
       var myDated:string = new Date().toISOString();
       var one:number=1;
       var myDateh:string = new Date().toISOString();
       var month:number = new Date().getMonth();
       console.log(month)
       var year:number = new Date().getFullYear();
       console.log(year)
       var fechad:string="";
       var fechah:string="";
       var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
       <soap:Body>
         <Afiliado20Movimientos xmlns="http://tempuri.org/">
           <AF_CodCliente>`+this.AF_CodCliente+`</AF_CodCliente>
           <AF_Rif>`+this.AF_Rif+`</AF_Rif>
           <SNroCuenta>`+itemselected[0]+`</SNroCuenta>
           <fechad>010101</fechad>
           <fechah>010101</fechah>
           <cantMov>20</cantMov>
         </Afiliado20Movimientos>
       </soap:Body>
     </soap:Envelope>`
       console.log('mando esto: '+ this.userSession.AF_Codcliente +' '+this.userSession.AF_Rif +' '+ postData )
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsIbsMovil.asmx?op=Afiliado20Movimientos",postData,httpOptions )
       .subscribe(data => {
         console.log('Data: '+data['_body']); 
        }, error => {
               //Hacemos el parse tal cual como antes:
               console.log('Error: '+JSON.stringify(error));
               var str = JSON.stringify(error);
               console.log("stingified: ", str);
               var search_array = JSON.parse(str);
               console.log("result: ", search_array.error.text);
               var parser = new DOMParser();
               var doc = parser.parseFromString(search_array.error.text, "application/xml");
               console.log(doc);
               var el = doc.createElement("p");
               el.appendChild(doc.getElementsByTagName("soap:Envelope").item(0));
               var tmp = doc.createElement("div");
               tmp.appendChild(el);
               console.log(tmp.innerHTML);
               var parseString = xml2js.parseString;
               var xml = tmp.innerHTML;
               var texto:string = "";
               var self = this;
               parseString(xml, self, function (err, result) {
                   try{
                         console.dir(result);
                         var str = JSON.stringify(result);
                         console.log("stringified: ", result);
                         var search_array = JSON.parse(str);
  
                         var i:number =0;
                         console.log("a");
                         var self2=self
                         search_array.p['soap:Envelope']['0']['soap:Body']['0'].Afiliado20MovimientosResponse['0'].Afiliado20MovimientosResult['0'].stmjvCuentas['0'].smtDetalle['0'].StmrdsjvDet
                         .forEach(element => {
                            var descripcion:string = element.SDesctrans['0'];
                            console.log("b");
                            var sign:string= element.SIndDebCre['0'];
                            console.log("c");
                            var amount:string= element.SMonto['0'];
                            var fechatransaccion:string= element.SFechaEfect['0'];
                            console.log("d");
                            var color:boolean=true;
                            console.log("e");
                            if(sign=="0"){
                              amount = "-"+amount;
                              color=false;
                            }
                            console.log("f");
                            var itemLista = [descripcion,amount,color];
                            console.log("g");
                           // listvalores.push(itemLista);
                            console.log("h");
                            i = i +1;
                            //console.log("Aca",self2.listvalores);
                            self2.listvalores.push(itemLista);
                        });
                        console.log("Aca",self.listvalores);
                         /*console.log("result: ", search_array);
                         console.log("resulta: ", search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table);
                         try{
                           //Acá proceso la ráfaga que me trae las opciones del menú dinámico:
                           search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table
                           .forEach(element => {
                             //Dentro de este foreach me paro en cada elemento que trae
                             //los elementos del menú, si check es igual a las opciones del menú app.html
                               var check:string = element.MD_Nombre['0'];
                               if(check=="Posición Consolidada"){
                                 //De ser true, guardo la variable validarPC en true en userSession
                                  self.userSession.validarPC=true;
                               } else if(check=="Transferencias"){
                                  self.userSession.validarTR=true;
                               } else if(check=="Tarjetas de Crédito"){
                                  self.userSession.validarTDC=true;
                               } else if(check=="Autorización de Transacciones / Lotes"){
                                  self.userSession.validarAPR=true;
                               }
                         });
                         }catch(Error){}*/
  
  
                         //Si en este punto no han ocurrido errores, procedemos a actualizar
                         //las variables del menú haciendo un llamado Events (Ver documentación Menú Dinámico)
                         //self.events.publish('session:created', true);
  
                         //Navegamos
                         //self.navCtrl.setRoot(WelcomePage);
                    }catch(Error){ 
                      //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                      //self.presentToast();
                     }
                   });
        });
        
      } catch (error) {
        
      }
  
    }
  
    refreshList(item:any[]){
      console.log(item[0]+" "+item[1]+" "+item[2]+" "+item[3]+" ")
    }
  
    middlewareMethodDates(item:any[]){
      this.checkFirstTime=false;
      this.sortingListDates = item;
      console.log(item)
      this.updateAccountMovements();
    }
    middlewareMethodAccounts(item:any[]){
      this.checkFirstTime=false;
      this.cuentaselected = item;
      console.log(item)
      this.updateAccountMovements();
    }
  
    updateAccountMovements(){
      var itemselected=this.cuentaselected;
      var dateselected=this.sortingListDates;
      this.SBloqueado=itemselected[1];
      this.SDiferido=itemselected[3];
      this.SDisponible=itemselected[2];
      console.log(itemselected[0]);
      this.listvalores=[];
  
          //Ahora se procede a traer el menú dinámico:
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'text/xml');
        var httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'text/xml'
          })
        };
  
        //Se hace la solicitud HTTP Para traer el menú con las opciones según el usuario que acaba de iniciar sesión
        //Traeremos el id, de la ráfaga anterior (La respuesta, del login) 
    
        
        if (this.sortingListDates[1]==0){
          console.log("Items"+this.cuentaselected+" "+dateselected);
          console.log("Cuenta:"+itemselected[0]);
          this.reloadAccountData();
        }else {
            try{
              var mesPass:string=""
              if(dateselected[2]<10){
                mesPass = "0"+dateselected[2].toString();
              }else{
                mesPass=dateselected[2].toString();
              }
              console.log("Mes previo", dateselected +" "+mesPass)
              
              var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <AfiliadoMovimientos xmlns="http://tempuri.org/">
                  <AF_CodCliente>`+this.AF_CodCliente+`</AF_CodCliente>
                  <AF_Rif>`+this.AF_Rif+`</AF_Rif>
                  <SNroCuenta>`+this.cuentaselected[0]+`</SNroCuenta>
                  <fechad>01`+mesPass+""+dateselected[3].toString().substr(-2)+`</fechad>
                  <fechah>`+dateselected[1]+""+mesPass+""+dateselected[3].toString().substr(-2)+`</fechah>
                  <cantMov>0</cantMov>    
                  </AfiliadoMovimientos>
                  </soap:Body>
                </soap:Envelope>`
              console.log('mando esto: '+ this.userSession.AF_Codcliente +' '+this.userSession.AF_Rif +' '+ postData )
            //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
                this.httpClient.post("http://"+this.userSession.serverIPWS+"/WsIbsMovil.asmx?op=AfiliadoMovimientos",postData,httpOptions )
              .subscribe(data => {
                console.log('Data: '+data['_body']); 
                }, error => {
                     //Hacemos el parse tal cual como antes:
                     console.log('Error: '+JSON.stringify(error));
                     var str = JSON.stringify(error);
                     console.log("stingified: ", str);
                     var search_array = JSON.parse(str);
                     console.log("result: ", search_array.error.text);
                     var parser = new DOMParser();
                     var doc = parser.parseFromString(search_array.error.text, "application/xml");
                     console.log(doc);
                     var el = doc.createElement("p");
                     el.appendChild(doc.getElementsByTagName("soap:Envelope").item(0));
                     var tmp = doc.createElement("div");
                     tmp.appendChild(el);
                     console.log(tmp.innerHTML);
                     var parseString = xml2js.parseString;
                     var xml = tmp.innerHTML;
                     var texto:string = "";
                     var self = this;
                     parseString(xml, self, function (err, result) {
                         try{
                               console.dir(result);
                               var str = JSON.stringify(result);
                               console.log("stringified: ", result);
                               var search_array = JSON.parse(str);
        
                               var i:number =0;
                               console.log("a");
                               var self2=self
                               search_array.p['soap:Envelope']['0']['soap:Body']['0'].AfiliadoMovimientosResponse['0'].AfiliadoMovimientosResult['0'].stmjvCuentas['0'].smtDetalle['0'].StmrdsjvDet
                               .forEach(element => {
                                  var descripcion:string = element.SDesctrans['0'];
                                  console.log("b");
                                  var sign:string= element.SIndDebCre['0'];
                                  console.log("c");
                                  var amount:string= element.SMonto['0'];
                                  var fechatransaccion:string= element.SFechaEfect['0'];
                                  console.log("d");
                                  var color:boolean=true;
                                  console.log("e");
                                  if(sign=="0"){
                                    amount = "-"+amount;
                                    color=false;
                                  }
                                  console.log("f");
                                  var itemLista = [descripcion,amount,color];
                                  console.log("g");
                                 // listvalores.push(itemLista);
                                  console.log("h");
                                  i = i +1;
                                  //console.log("Aca",self2.listvalores);
                                  self2.listvalores.push(itemLista);
                              });
                              console.log("Aca",self.listvalores);
                               /*console.log("result: ", search_array);
                               console.log("resulta: ", search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table);
                               try{
                                 //Acá proceso la ráfaga que me trae las opciones del menú dinámico:
                                 search_array['p']['soap:Envelope']['0']['soap:Body']['0'].MenuDinamicoJuridicoResponse['0'].MenuDinamicoJuridicoResult['0']['diffgr:diffgram']['0'].NewDataSet['0'].Table
                                 .forEach(element => {
                                   //Dentro de este foreach me paro en cada elemento que trae
                                   //los elementos del menú, si check es igual a las opciones del menú app.html
                                     var check:string = element.MD_Nombre['0'];
                                     if(check=="Posición Consolidada"){
                                       //De ser true, guardo la variable validarPC en true en userSession
                                        self.userSession.validarPC=true;
                                     } else if(check=="Transferencias"){
                                        self.userSession.validarTR=true;
                                     } else if(check=="Tarjetas de Crédito"){
                                        self.userSession.validarTDC=true;
                                     } else if(check=="Autorización de Transacciones / Lotes"){
                                        self.userSession.validarAPR=true;
                                     }
                               });
                               }catch(Error){}*/
        
        
                               //Si en este punto no han ocurrido errores, procedemos a actualizar
                               //las variables del menú haciendo un llamado Events (Ver documentación Menú Dinámico)
                               //self.events.publish('session:created', true);
        
                               //Navegamos
                               //self.navCtrl.setRoot(WelcomePage);
                          }catch(Error){ 
                            //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                            //self.presentToast();
                           }
                         });
              });
              
            } catch (error) {
              
            }
        }
  
        
  
    }
  }
  