import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './ui/layout/layout.component';
import {MenuComponent} from './ui/menu/menu.component';
import {OrdersComponent} from './page/orders/orders.component';
import {PaymentsComponent} from './page/payments/payments.component';
import {ShareComponent} from './page/share/share.component';
import { AutoFocusDirective } from './util/auto-focus/auto-focus.directive';
import {ConvertPipe} from './util/convert.pipe';
import {PureTableComponent} from './ui/table/pure-table/pure-table.component';
import {SellersComponent} from './page/sellers/sellers.component';
import {NodalComponent} from './page/nodal/nodal.component';
import {OrderCreateComponent} from './ui/dialog/order-create/order-create.component';
import {OrderItemsTableComponent} from './ui/table/order-items-table/order-items-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MenuComponent,
    OrdersComponent,
    PaymentsComponent,
    ShareComponent,
    ConvertPipe,
    PureTableComponent,
    SellersComponent,
    NodalComponent,
    OrderCreateComponent,
    OrderItemsTableComponent,
    AutoFocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}