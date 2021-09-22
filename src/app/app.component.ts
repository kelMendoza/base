import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base';
}



//#region TYPESCRIPT 
interface Producto {   
  idP: number; 
  codP : string;
  nomP  : string;
  costP: number,
  cambioPrecio:(valor: number) => void  //FUNCION TIPO FLECHA
}

// ALMACEN
class Almacen{
    constructor (
      private codA : string,
      private nombAlmacen : string,
      private prodAlmacen   : Producto[] 
    ){}


    //-----------FUNCIONES--------------//
    //INGRESAR PRODUCTO
    public ingresarProducto(P : Producto){   
      this.prodAlmacen.push(P);
    }

    //MOSTRAR PRODUCTO
    public mostrarProducto(){    
      console.log("\n---Nombre Almacen:" + this.nombAlmacen + "\n---Codigo de Almacen: " + this.codA); 
      this.prodAlmacen.forEach(function(elemento) {  //RECORRE UN ARREGLO
        console.table(elemento); //estructura del foreach
      })
    }
  
    //BUSCAR PRODUCTO EN ALMACEN
    public buscarProducto(codP : Producto){  
      let buscarProducto = false;
      let position = 1;
      let indiceProducto = 0;
      while(!buscarProducto && indiceProducto < this.prodAlmacen.length) {//busca dentro de un aaray
          if(this.prodAlmacen[indiceProducto] == codP) {//convalida
              buscarProducto = true;
              position = indiceProducto;
          } else {
              indiceProducto += 1;
          }
      }
      return position;
    }
    public buscarP(producto: Producto){     //Buscar producto
      let resultado = this.prodAlmacen.find((procd)=>procd.idP = producto.idP);
      if(resultado == null){
        return null;
      }
      console.log("----- BUSCAR PRODUCTO: ")
      return resultado;
      }
  
    public quitarProducto(codP : Producto){
      let posicion = this.buscarProducto(codP);
      this.prodAlmacen.splice(posicion,1);//eliminar
    }
  
    public moverProducto(codP : Producto, codA : Almacen){
      let posicion = this.buscarProducto(codP);
      if(posicion == -1){
        console.log("Producto no encontrado en Almacen");
      }else{
        codA.ingresarProducto(this.prodAlmacen[posicion])
        this.quitarProducto(codP)
        console.log("TODO OK");
      }
    }
  }



//-----------------------ALMACENES---------------------------//
//ALMACEN 01
 const almacen01 : Almacen = new Almacen("almacen01","Almacen 01",[]);
//ALMACEN 02
 const almacen02 : Almacen = new Almacen("almacen02","Almacen 02",[]);
//ALMACEN 03
 const almacen03 : Almacen = new Almacen("almacen03","Almacen 03",[]);


//PRODUCTOS
//PRODUCTO 01
const producto01 :  Producto = {
  idP: 1, 
  codP : "Producto 01",
  nomP : "Papa x kilo",
  costP: 2.2,
  cambioPrecio(valor:number) {
    this.costP = valor;
  }
}
//PRODUCTO 02
const producto02 : Producto = {
  idP: 2, 
  codP : "Producto 02",
  nomP : "Tomate x kilo",
  costP: 1.9,
  cambioPrecio(valor:number) {
    this.costP = valor;
  }
}
//PRODUCTO 03
const producto03 : Producto = {
  idP: 3, 
  codP: "Producto 03",
  nomP: "Lechuga x kilo",
  costP: 2,
  cambioPrecio(valor:number) {
    this.costP = valor;
  }
}
//PRODUCTO 04
const producto04 : Producto = {
  idP: 4, 
  codP : "Producto 04",
  nomP : "Cebolla x kilo",
  costP: 2.5,
  cambioPrecio(valor:number) {
    this.costP = valor;
  }
}
//PRODUCTO 05
const producto05 : Producto = {
  idP: 5, 
  codP : "Producto 05",
  nomP : "Zanahoria x kilo",
  costP: 2.5,
  cambioPrecio(valor:number) {
    this.costP = valor;
  }
}



//------------------CONSULTAS------------------------//
//INGRESAR PRODCUTOS A ALMANECES
almacen01.ingresarProducto(producto01);
almacen01.ingresarProducto(producto02);
almacen02.ingresarProducto(producto03);
almacen03.ingresarProducto(producto04);

//MOSTRAR ALMACENES
almacen01.mostrarProducto();  
almacen02.mostrarProducto(); 
almacen03.mostrarProducto(); 

//CAMBIAR PRECIO
producto04.cambioPrecio(3)  
producto03.cambioPrecio(3.5)  
producto05.cambioPrecio(5.9)

//MOVER PRODUCTOS ENTRE ALMACENES
almacen01.moverProducto(producto02,almacen02);  //DE ALMACEN 01 A 02
almacen02.moverProducto(producto04,almacen01);  //DE ALMACEN 03 A 01

//MOSTRAR ALMACEN MOVIDO
almacen01.mostrarProducto(); 
almacen02.mostrarProducto(); 
almacen03.mostrarProducto();

//BUSQUEDA DE PRODUCTOS EN ALMACENES
console.table(almacen01.buscarP(producto01))  //PRODUCTO 01 EN ALMACEN 01
console.table(almacen03.buscarP(producto04))  //PRODUCTO 04 EN ALMACEN 03
