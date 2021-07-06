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
  {path:'home',component:HomeComponent , data:{pageIndex:1}},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'cart',component:CartComponent , data:{pageIndex:2}},
  {path:'category/:id/:page',component:CategoryComponent , data:{pageIndex:3}},
  {path:'product/:id',component:ProductComponent , data:{pageIndex:4}},
  {path:'products/:page',component:ProductsComponent, data:{pageIndex:5}},
  {path:'products',redirectTo:'products/1',pathMatch:'full'},
  {path:'search/:word/:page',component:SearchComponent , data:{pageIndex:6}},
  {path:'**',component:NotfoundpageComponent, data:{pageIndex:7}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
