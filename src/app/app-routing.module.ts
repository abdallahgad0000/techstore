import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'cart',component:CartComponent},
  {path:'category/:id/:page',component:CategoryComponent},
  {path:'product/:id',component:ProductComponent},
  {path:'products/:page',component:ProductsComponent},
  {path:'products',redirectTo:'products/1',pathMatch:'full'},
  {path:'search/:word/:page',component:SearchComponent},
  {path:'**',component:NotfoundpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
