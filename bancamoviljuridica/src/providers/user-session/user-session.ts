import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
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
  public tdc:any[] = [];
  public prestamos:any[] = [];
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


  

//public serverIPApp:string = "10.60.102.178/IBBFCEMovil/app";      //57306 
//public serverIPWS:string = "10.60.102.178/IBBFCEMovils/ws";        //2898
//public serverIPApp:string = "10.60.63.58:8445/IBBFCEMovil/app";
//public serverIPApp:string = "10.60.63.58:8467";  
//public serverIPWS:string = "10.60.63.58:8477";  
//public serverIPApp:string = "localhost:57306";
//public serverIPWS:string = "localhost:2898";
public serverIPApp:string = "prueba2.bfc.com.ve:8455/IBBFCE";
public serverIPWS:string = "prueba2.bfc.com.ve:8455/WSFCIBJuridicoIBS";  
//public serverIPApp:string = "10.60.63.58:8455/IBBFCE";
//public serverIPWS:string = "10.60.63.58:8455/WSFCIBJuridicoIBS";    
//public serverIPApp:string = "201.248.81.244:8455/IBBFCE";s
//public serverIPWS:string = "201.248.81.244:8455/WSFCIBJuridicoIBS";  
//public serverIPApp:string = "201.248.81.244:8445/IBBFCE";
//public serverIPWS:string = "201.248.81.244:8445/WSFCIBJuridicoIBS";  
//public serverIPApp:string = "10.60.102.100/IBBFCE";
//public serverIPWS:string = "10.60.102.100/WSFCIBJuridicoIBS";  
//public serverIPApp:string = "10.60.102.91/IBBFCE";
//public serverIPWS:string = "10.60.102.91/WSFCIBJuridicoIBS";  

  constructor(public httpClient: HttpClient) {
    this.httpClient = httpClient;
    console.log('Hello UserSessionProvider Provider');
  }

  public reloadAccountData(){    
    console.log("Esto esta en usersession.cuentos",this.cuentas);
    var listvalores:any[]=[];
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
     var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
     <soap:Body>
       <CuentasAsociadasGet xmlns="http://tempuri.org/">
         <AF_CodCliente>`+this.AF_Codcliente+`</AF_CodCliente>
         <AF_Rif>`+this.AF_Rif+`</AF_Rif>
         <AF_Id>`+this.AF_Id+`</AF_Id>
       </CuentasAsociadasGet>
     </soap:Body>
   </soap:Envelope>`

   console.log("No sirve"+this.AF_Codcliente+"-"+this.AF_Id);
   console.log(postData);
   //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
      this.httpClient.post("http://"+this.serverIPApp+"/WsMovil.asmx?op=CuentasAsociadasGet",postData,httpOptions )
     .subscribe(data => {
      // console.log('Data: '+data['_body']); 
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
            // var texto:string = "";
             var self = this;
             parseString(xml, self, function (err, result) {
                 try{
                       console.dir(result);
                       var str = JSON.stringify(result);
                       console.log("stringified: ", result);
                       var search_array = JSON.parse(str);
                       console.log("CUENTAS DEBUG: ", search_array);
                       var contcuentas:number = 0;
                       var conttdc:number = 0;
                       var contprestamos:number = 0;
                       self.cuentas=[];
                       self.tdc=[];
                       self.prestamos=[];
                      search_array.p['soap:Envelope']['0']['soap:Body']['0'].CuentasAsociadasGetResponse['0'].CuentasAsociadasGetResult['0'].SumdsjvDet
                      .forEach(element => {
                        //Dentro de este foreach me paro en cada elemento que trae 
                          var SBloqueado:string = element.SBloqueado['0']
                          var SContable:string = element.SContable['0']
                          var SDiferido:string = element.SDiferido['0']
                          var SDisponible:string = element.SDisponible['0']
                          var SNroCuenta:string = element.SNroCuenta['0']
                          var NroCuentaMasked2:string = SNroCuenta.substr(-4);
                          var NroCuentaMasked1:string = SNroCuenta.substr(0,4);
                          var NroCuentaMasked:string = NroCuentaMasked1+"************"+NroCuentaMasked2;
                          var tipoCuenta:string = element.STipocuenta['0'];
                          var SCodMoneda:string = element.SCodMoneda['0']; 
                          console.log("SCodMoneda: ", SCodMoneda);
                          if(tipoCuenta=="TDC" && SCodMoneda=="VES"){
                            //if(SCodMoneda=="VES"){
                              console.log("Tipo TDC",conttdc);
                              var itemPosicion = conttdc;
                              conttdc = conttdc + 1;
                              var SFechaPagoAntes:string = element.SFechaPagoAntes['0']
                              var day:string = SFechaPagoAntes.substr(0,2);
                              var month:string = SFechaPagoAntes.substr(2,2);
                              var year:string = SFechaPagoAntes.substr(-4);
                              var fechapago:string= day+"-"+month+"-"+year;
                              var SPagoMinimo:string = element.SPagoMinimo['0']
                              var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked,fechapago,SPagoMinimo];  
                            //}
                            }else if(SCodMoneda=="VES" && (tipoCuenta=="NOW" || tipoCuenta=="DDA")) {
                           //   if(SCodMoneda=="VES"){
                            console.log("Tipo cuentas",contcuentas);
                            var itemPosicion = contcuentas;
                            contcuentas = contcuentas + 1;
                            var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked];
                            //  }  
                          }  else if(SCodMoneda=="VES" && tipoCuenta=="LNS") {
                            //   if(SCodMoneda=="VES"){
                             console.log("Tipo prestamo",contprestamos);
                             var itemPosicion = contprestamos;
                             contprestamos = contprestamos + 1;
                             var itemLista = [SNroCuenta,SBloqueado,SContable,SDiferido,SDisponible,itemPosicion,NroCuentaMasked];
                             //  }  
                           }                   
                          //procesar cuentas para enmascararlas
                          if(tipoCuenta=="TDC" && SCodMoneda=="VES"){
                            self.tdc.push(itemLista);
                          }else if (SCodMoneda=="VES" && (tipoCuenta=="NOW" || tipoCuenta=="DDA")){
                            self.cuentas.push(itemLista);
                          } else if (SCodMoneda=="VES" && tipoCuenta=="LNS"){
                            self.prestamos.push(itemLista);
                          } 
                          console.dir("K");
                        });
                       self.cuentas = self.cuentas;
                       self.tdc = self.tdc;
                   }catch(Error){
                    console.log("Error try 1")
                    //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                    //self.presentToast();
                   }
                 });
      });
    } catch (error) {
      console.log("Error try 2")
    }
  }

  basicHttpConnectionMethod(){
      var listvalores:any[]=[];
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
       var postData = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
       <soap:Body>
         <CuentasAsociadasGet xmlns="http://tempuri.org/">
           <AF_CodCliente>`+this.AF_Codcliente+`</AF_CodCliente>
           <AF_Rif>`+this.AF_Rif+`</AF_Rif>
           <AF_Id>`+this.AF_Id+`</AF_Id>
         </CuentasAsociadasGet>
       </soap:Body>
     </soap:Envelope>`
  
     console.log(postData);
     //Acá hacemos la llamada al servicio que nos trae el menú dinámico según el ID del user
        this.httpClient.post("http://"+this.serverIPApp+"/WsMovil.asmx?op=CuentasAsociadasGet",postData,httpOptions )
       .subscribe(data => {
        // console.log('Data: '+data['_body']); 
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
              // var texto:string = "";
               var self = this;
               parseString(xml, self, function (err, result) {
                   try{
                         console.dir(result);
                         var str = JSON.stringify(result);
                         console.log("stringified: ", result);
                         var search_array = JSON.parse(str);
                         
                     }catch(Error){
                      console.log("Error try 1")
                      //self.rafaga ="Usuario o Contraseña incorrectos, intente nuevamente"
                      //self.presentToast();
                     }
                   });
        });
      } catch (error) {
        console.log("Error try 2")
      }
    }

    public TOC:string= `Para una mejor comprensión, interpretación, integración y ejecución del
    presente Contrato, se establecen las siguientes definiciones:
    i) BFC: este término indica BFC Banco Fondo Común C.A. Banco Universal,
    sociedad mercantil domiciliada en la ciudad de caracas, que puede en
    cumplimiento de su objeto realizar operaciones de intermediación financiera y
    operaciones conexas permitidas por el Decreto con Fuerza de Ley de Reforma
    de la Ley General de Bancos y Otras Instituciones Financieras vigente.
    ii) USUARIO: Este término indica a la persona natural o jurídica que cumple
    con los requisitos legales y contractuales para celebrar con BFC, operaciones
    activas, pasivas o neutras, a través de Internet. Este término, sin limitarse a
    ellos, comprende a los tarjetahabientes, cuentahabientes, prestatarios,
    usuarios, personas autorizadas de conformidad con lo dispuesto en el presente
    documento; y con las condiciones previstas en las planillas de “Ficha del
    Cliente – Persona Natural”, “Solicitud de Afiliación Internet Banking Persona
    Jurídica”, y “Solicitud Tarjeta de Crédito”, las cuales se consideran parte
    integral del presente documento. Queda expresamente establecido que,
    cuando el término incluya a varias personas (naturales o jurídicas) todas se
    obligan solidariamente por las obligaciones que adquieran, incluidas las
    personas naturales cónyuges entre sí comprometiendo sus respectivos
    patrimonios.
    iii) WEB SITE DE BFC: Con este término se identifica al conjunto de páginas
    electrónicas, a las cuales se pueden acceder a través de Internet, en la
    dirección: www.bfc.com.ve
    iv) SERVICIO DE BANCA POR INTERNET (BFC en Línea): servicio ofrecido
    por BFC, en virtud del cual el USUARIO, ingresando al Web Site de BFC,
    puede acceder a una serie de servicios informáticos conectados a redes de
    telecomunicaciones avanzadas, con la finalidad de consultar cualquier tipo de
    información y/o de realizar transacciones sobre los productos y/o servicios
    afiliados.
    1.- CONDICIONES DE USO DEL WEBSITE:
    1.1.- Este Web site tiene por objeto, brindarle al USUARIO información general
    sobre los servicios y productos, así como, la posibilidad de realizar sus
    transacciones financieras las veinticuatro (24) horas del día. Dicho servicio está
    sujeto al cumplimiento por parte del usuario de los términos contenidos en
    estas condiciones de uso, así como las contenidas en las planillas de “Ficha del
    Cliente – Persona Natural”, “Solicitud de Afiliación Internet Banking Persona
    Jurídica” y “Solicitud Tarjeta de Crédito, respectivamente. El USUARIO debe
    leer cuidadosamente esta sección antes de continuar, y de hacerlo se entiende
    que acepta y está de acuerdo con los términos y condiciones establecidas en
    esta sección. BFC podrá modificar los términos y condiciones aquí contenidos,
    unilateralmente, a su libre elección, en cualquier momento y las mismas
    estarán vigentes, de conformidad con la normativa legal aplicable, una vez
    hayan sido colocadas en el Web site, por lo que el USUARIO se compromete
    a revisar periódicamente esta sección para estar informado de estas
    eventuales modificaciones, en el entendido que BFC considerará que con el
    acceso nuevamente al web site se evidencia la aceptación tácita de las nuevas
    condiciones por parte del USUARIO. El USUARIO reconoce que al entrar al
    WEB SITE DE BFC, lo hace por voluntad propia, asimismo reconoce que, en
    caso que continúe navegando en dicho web site, es responsable por los
    efectos legales que puedan derivar, aceptando tácitamente el contenido de los
    demás avisos mencionados en las secciones correspondientes, reconociendo
    como válido y legal cualquier medio de prueba o tecnología que utilice BFC
    para comprobar la entrada o salida del usuario de este Web site.
    1.2.- El servicio prestado mediante el Web site de BFC tiene carácter gratuito
    para el USUARIO,
    1.3.- El USUARIO se compromete a utilizar racionalmente el Web site,
    observando la ley, el orden público y las buenas costumbres generalmente
    aceptadas. Así mismo, se obliga a abstenerse de utilizarlo con fines o efectos
    ilícitos, lesivos de los derechos e intereses de terceros, o que de cualquier
    forman puedan deteriorar, inutilizar o poner fuera de servicio el lenguaje de 
    programación, códigos fuente, la operación, la funcionalidad o la presentación
    del mismo.
    1.4.- El USUARIO deberá abstenerse de obtener e incluso de intentar obtener
    informaciones, mensajes, gráficos, dibujos, archivos de sonido y/o imagen,
    fotografías, grabaciones, software, y en general, cualquier clase de material
    accesibles a través del Web Site, empleando para ello medios o
    procedimientos distintos de los que según los casos, se hayan puesto a su
    disposición a este efecto o se hayan indicado en el Web site.
    1.5.-El USUARIO se obliga a usar el contenido de la página de forma correcta y
    lícita. En este sentido se compromete a abstenerse de: a) reproducir o copiar,
    distribuir, permitir el acceso del público a través de cualquier modalidad de
    comunicación pública, transformar, modificar o eliminar el contenido del Web
    site, a menos que se cuente con la autorización del titular de los
    correspondientes derechos o ello resulte legalmente permitido; b) suprimir,
    eludir o manipular el “Copyright” o los derechos de autor y demás datos
    identificativos de los derechos de BFC o de los terceros citados como
    propietarios de los mismos y las respectivas firmas digitales, si fuere el caso.
    2.- TÉRMINOS Y LIMITACIONES DE USO:
    2.1.- El USUARIO reconoce y acepta que el contenido del web site de BFC,
    está protegido por un Copyright o Derecho de Autor, a menos que se indique lo
    contrario.
    2.2-. EL USUARIO reconoce y acepta en forma expresa que el uso que haga
    del web Site de BFC así como su recorrido a través de él, son a su propio
    riesgo, valiéndose a tal efecto de la utilización de equipos programados o
    servicios a los que declara haber tenido acceso legalmente, siendo por su
    cuenta y riesgo todo lo concerniente al acceso inicial. Ni el Banco, ni ninguna
    otra parte involucrada en la creación o publicación del Web site podrán ser
    responsables de daños penales, indirectos, consecuentes, incidentales o
    directos que puedan producirse como resultado del uso al mismo.
    3.- COMPATIBILIDAD DE NAVEGADORES:
    3.1.- EL USUARIO reconoce y acepta que será responsable de la selección del
    navegador a los efectos de la exploración y uso del presente sitio web. En tal 
    sentido, BFC queda exonerado de cualquier responsabilidad en caso de
    incompatibilidades o fallas en el desempeño del navegador empleado por el
    USUARIO a tales fines.
    3.2.- BFC no garantiza de forma alguna el servicio ininterrumpido o libre de
    error, que se ofrece a través de este web site, así como tampoco garantiza la
    exactitud y/o confidencialidad o contenido de la información presentada en la
    misma. BFC hace sus mejores esfuerzos para que el servicio informativo
    suministrado sea de óptima calidad, asimismo implementa los mecanismos de
    seguridad acordes con los estándares internacionales y en tal sentido el
    USUARIO acepta utilizar dicho servicio. Tampoco será responsable BFC por
    cualquier daño y perjuicio causados por el retardo o interrupción en la
    transmisión del servicio.
    4.- LINKS (VÍNCULOS):
    4.1.- Los vínculos o links son disponibles única y exclusivamente para la
    comodidad de los usuarios. BFC no está informado del contenido, origen u
    operación de los web site a que se refieren los vínculos, y por tal razón, está
    exenta de responsabilidad por el contenido y procedimientos usados en dichos
    web sites, así como el uso que terceros pueden hacer de los mismos, aún si
    han accedido a éstos a través de este Web site, siendo dicho uso por única y
    exclusiva cuenta y riesgo del USUARIO.
    5.- MECANISMOS DE SEGURIDAD:
    5.1.-El USUARIO declara que conoce y acepta que BFC se reserva el derecho
    de establecer los mecanismos y medidas de seguridad electrónica que
    considere pertinentes, a los efectos de validar la identidad de los usuarios,
    operaciones, transacciones y/o gestiones que sean realizadas a través del
    Servicio de Internet Banking, de conformidad con lo dispuesto en el
    ordenamiento jurídico vigente aplicable.
    6.- TERMINACIÓN:
    6.1.- BFC podrá, a su sola discreción, cancelar el servicio prestado por este
    Web site e impedir el acceso al mismo, en cualquier momento y sin previo
    aviso dado al USUARIO.
    7.- CONDICIONES DE PRIVACIDAD:
    7.1.- ENCRIPTAMIENTO: El Web site de BFC puede usar mecanismos de
    cifrado de datos, consistentes en codificar información delicada mientras se
    encuentra en tránsito.
    7.2.- COOKIES (GALLETAS): Se refiere a los archivos de texto que el
    navegador de Internet crea en el disco duro de la computadora del usuario, con
    información sobre los web sites visitados por este. Su objeto es permitir al
    servidor web recordar algunos datos concernientes al USUARIO, como sus
    preferencias para la visualización de los web sites, productos que más le
    interesan, entre otros aspectos, logrando así un mejor tiempo de respuesta
    para el mismo en los próximos accesos. Dicha información suministrada no
    tiene carácter confidencial tal como direcciones de correo electrónico, nombres
    o números de teléfonos.
    8.- CONDICIONES LEGALES
    8.1.- Para ingresar por primera vez al SERVICIO DE BANCA POR INTERNET
    (BFC en Línea), el USUARIO deberá utilizar el código de confirmación de
    Acceso suministrado en una primera y única oportunidad por BFC, a fin de su
    único uso por parte del USUARIO a objeto de validar la factibilidad de su
    primer ingreso al web site, código este que deberá ser sustituido por la Clave
    Secreta de Acceso que establezca el usuario con inmediata posterioridad a
    dicho ingreso, según le sea requerido por el sistema y de acuerdo con lo
    establecido en las planillas de “Ficha del Cliente – Persona Natural”; de
    “Solicitud de Afiliación Internet Banking Persona Jurídica” y “Solicitud Tarjeta de
    Crédito”, respectivamente. “EL USUARIO”, acepta expresamente que la
    utilización del SERVICIO DE BANCA POR INTERNET (BFC en Línea), por
    primera vez implica aceptación de las condiciones y términos establecidos en
    este contrato, cuyos términos declara conocer y aceptar.
    8.2.- La utilización del código de confirmación de Acceso, las Claves Secretas
    de Acceso y el uso del SERVICIO DE BANCA POR INTERNET (BFC en
    Línea), se considerará a todo evento y en todo momento efectuado por el
    USUARIO, a título personal y, en consecuencia, BFC, reputará para todos los 
    efectos legales que las consultas, transacciones, operaciones y cualesquiera
    otras actuaciones han sido realizadas por el USUARIO, quien en consecuencia
    libera a BFC de cualquier responsabilidad por las actuaciones que realice en
    respuesta de las transacciones realizadas a través del SERVICIO DE BANCA
    POR INTERNET (BFC en Línea), utilizando la Clave Secreta de Acceso.
    Igualmente el USUARIO libera a BFC de cualquier responsabilidad por las
    actuaciones que se realicen en respuesta a transacciones realizadas a través
    de la utilización de Claves Secretas de Acceso delegadas expresamente a los
    USUARIOS Autorizados, definidos por él en la “Solicitud de Afiliación Internet
    Banking Persona Jurídica” o a través del Servicio BFC en línea Personas
    Jurídicas, bajo la absoluta responsabilidad del USUARIO.
    8.3.- El USUARIO autoriza irrevocablemente a BFC a debitar o cargar, en el
    momento en que se haga exigible, en cualquiera de las cuentas de depósito o
    cualquier otro producto, incluyendo Tarjetas de Crédito, que tuviere el
    USUARIO en el Banco, las tarifas, gastos, comisiones, y/o cualquier otro gasto
    que se genere a favor de BFC con ocasión del uso del SERVICIO DE
    INTERNET BANKING (BFC en Línea).
    8.4.- BFC hará sus mejores esfuerzos para suministrar una información óptima,
    a través de sus sistemas y empleados.
    8.5.- BFC no se hace responsable por la información suministrada al
    USUARIO, siendo de su exclusiva responsabilidad su uso y destino.
    8.6.- BFC se reserva el derecho de suspender temporalmente el acceso al web
    site o al SERVICIO DE BANCA POR INTERNET (BFC en Línea), sin
    necesidad de notificación alguna al USUARIO, quedando BFC eximido de toda
    responsabilidad, cuando por razones de interrupción o inactividad de sus
    sistemas de computación, fallas de cualquier naturaleza, caso fortuito o fuerza
    mayor el USUARIO no pudiese acceder a la página web o al SERVICIO DE
    BANCA POR INTERNET (BFC en Línea), no pudiendo reclamar a BFC,
    indemnizaciones o resarcimientos por los daños y perjuicios derivados del
    supuesto aquí mencionado.
    8.7.- BFC no será responsable en ningún caso por: (a) El acceso al SERVICIO
    DE BANCA POR INTERNET (BFC en Línea), por parte de terceras personas
    ajenas al USUARIO; (b) Por cualquier sustitución de la Clave Secreta de
    Acceso realizada en forma impropia o no autorizada por el USUARIO; (c) Por 
    las actuaciones generadas en uso del SERVICIO DE BANCA POR INTERNET
    (BFC en Línea), por parte del USUARIO y/o reputadas por BFC como
    realizadas por el USUARIO a través del SERVICIO DE BANCA POR
    INTERNET (BFC en Línea).
    8.8.- BFC no asume ninguna responsabilidad por el uso indebido que el
    USUARIO haga del SERVICIO DE BANCA POR INTERNET (BFC en Línea)
    y/o su clave secreta de acceso. En consecuencia el USUARIO asume toda la
    responsabilidad de las transacciones realizadas toda vez que BFC presume la
    buena fe en el uso que el USUARIO haga del código de Confirmación de
    Acceso y la Clave Secreta al Servicio de Internet Banking.
    8.9.- Los derechos de autor sobre el diseño de este Web site han sido cedidos
    a BFC, el USUARIO de esta página asume, que todas y cada una de las
    secciones, nombres, textos, frases, diseños, colores, formas gráficas, fotos,
    videos y grabaciones exhibidas están protegidos por derechos de autor, a
    menos que se establezca lo contrario en estos mismos avisos o en el propio
    web site. BFC respeta los derechos de terceros, incluyendo los derechos de
    autor y en tal sentido conmina a los terceros usuarios hacer lo mismo. BFC, se
    reserva el derecho de proteger electrónicamente sus derechos de autor
    contenidos en esta página, sin que el usuario pueda reclamar de forma alguna
    por tal protección. Todo el contenido de esta página principal o en las
    vinculadas de forma interna, incluyendo textos, logotipos, íconos, video, audio y
    programas de computación son propiedad de BFC.
    8.10.- Todos los elementos de ser susceptibles de ser protegidos por la
    propiedad intelectual e industrial que aparecen en este web site pertenecen a
    BFC quedando estrictamente prohibido el uso no autorizado por parte de
    terceros usuarios. BFC se reserva el derecho a intentar las acciones legales
    que considere convenientes para hacer valer sus derechos en Venezuela.
    8.11.- El USUARIO declara que al ingresar a esta página web, mantendrá a
    cualesquiera Directivos de BFC incluyendo Presidente, Vice-presidentes,
    Gerentes y empleados libre de toda responsabilidad, daños y perjuicios
    incluyendo daño moral, lucro cesante o daño emergente, gastos en general,
    incluyendo honorarios de abogados que resulten de la violación por parte del
    usuario de cualquiera de las obligaciones contenidas en las cláusulas de los
    avisos correspondientes, pudiendo cualquiera de los funcionarios mencionados 
    ejercer los derechos legales en contra del usuario para hacer valer esta
    obligación.
    8.12.- Los conflictos que puedan derivarse con ocasión de las operaciones
    realizadas por el USUARIO desde cualquier parte del mundo a través de
    Internet y del web site de BFC, serán resueltos de conformidad con las leyes
    de la República Bolivariana de Venezuela.
    8.13.- Estas condiciones de uso se interpretarán en todas sus partes por las
    leyes de la República Bolivariana de Venezuela. `
}