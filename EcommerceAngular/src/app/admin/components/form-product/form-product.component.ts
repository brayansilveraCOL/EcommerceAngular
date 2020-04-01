import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import {Router } from '@angular/router'; 
import {ProductsService} from './../../../core/services/products/products.service';
import {MyValidators} from '../../../utils/validators';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder, //inyeccion de dependencias
    private ProductsService:ProductsService,
    private router: Router,
  ) {
    this.buildForm();
   }

  ngOnInit() {
  }

  saveProduct(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      this.ProductsService.createProduct(product)
      .subscribe(productsubscribe =>{
        console.log(productsubscribe);
        this.router.navigate(['./products']);
      });
    }
    console.log(this.form.value);
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: '',
      description:['', [Validators.required]],
    });
  }
  get priceField(){
    return this.form.get('price');
  }

}
