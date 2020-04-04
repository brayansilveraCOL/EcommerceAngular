import { Component, OnInit } from '@angular/core';
import {ProductsService} from '@core/services/products/products.service'; // Shor import se configura en ysconfig
import { Product } from '@core/models/product.model';
// tslint:disable-next-line: max-line-length
/// Se mete en la carpeta porque este es la parte de codigo que hace fecth informacion y se lo envia al componente que se encarga de la renderizacion
@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss']
})
// tslint:disable-next-line: component-class-suffix
export class ProductsContainer implements OnInit {

  products: Product[] = [
    // {
    //   id: '1',
    //   image: 'assets/images/camiseta.png',
    //   title: 'Camiseta',
    //   price: 80000,
    //   description: 'bla bla bla bla bla'
    // },
    // {
    //   id: '2',
    //   image: 'assets/images/hoodie.png',
    //   title: 'Hoodie',
    //   price: 80000,
    //   description: 'bla bla bla bla bla'
    // },
    // {
    //   id: '3',
    //   image: 'assets/images/mug.png',
    //   title: 'Mug',
    //   price: 80000,
    //   description: 'bla bla bla bla bla'
    // },
    // {
    //   id: '4',
    //   image: 'assets/images/pin.png',
    //   title: 'Pin',
    //   price: 80000,
    //   description: 'bla bla bla bla bla'
    // },
    // {
    //   id: '5',
    //   image: 'assets/images/stickers1.png',
    //   title: 'Stickers',
    //   price: 80000,
    //   description: 'bla bla bla bla bla'
    // },
    // {
    //   id: '6',
    //   image: 'assets/images/stickers2.png',
    //   title: 'Stickers',
    //   price: 80000,
    //   description: 'bla bla bla bla bla'
    // },
  ];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts()
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }
  fetchProducts(){
    this.productsService.getAllProducts() // esto trae un observable y se tiene que iutilizar el .suscribe
    .subscribe(products =>{
      console.log(products);
      this.products = products;
    });
  }
}
