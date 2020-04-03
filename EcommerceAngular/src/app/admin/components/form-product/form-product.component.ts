import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import {Router } from '@angular/router'; 
import {ProductsService} from './../../../core/services/products/products.service';
import {MyValidators} from '../../../utils/validators';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  form: FormGroup;
  imageUrl$: Observable<any>;
  constructor(
    private formBuilder: FormBuilder, // inyeccion de dependencias
    private ProductsService:ProductsService,
    private router: Router,
    private angularFireStorage: AngularFireStorage
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
  uploadFile(event)  {
    const file = event.target.files[0];
    const dir = 'images';
    const fileref = this.angularFireStorage.ref(dir);
    const task = this.angularFireStorage.upload(dir, file);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.imageUrl$ = fileref.getDownloadURL();
        this.imageUrl$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();
    console.log(file);
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
