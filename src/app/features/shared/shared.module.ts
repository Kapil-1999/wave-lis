import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from './common-services/safe-html.pipe';
import { LoaderComponent } from './component/loader/loader.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { SearchFilterPipe } from './common-services/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DeleteConfirmationComponent } from './component/delete-confirmation/delete-confirmation.component';
import { VerticalSidebarComponent } from './layout/vertical-sidebar/vertical-sidebar.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    SafeHtmlPipe,
    LoaderComponent,
    SearchFilterPipe,
    DeleteConfirmationComponent,
    VerticalSidebarComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    ToastrModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    SelectDropDownModule,
    BsDatepickerModule.forRoot()
  ],
  exports : [
    SafeHtmlPipe,
    LoaderComponent,
    ModalModule,
    SearchFilterPipe,
    NgxPaginationModule,
    ToastrModule,
    ReactiveFormsModule,
    FormsModule,
    SelectDropDownModule,
    DeleteConfirmationComponent,
    BsDatepickerModule
  ]
})
export class SharedModule { }
