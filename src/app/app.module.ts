import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgxScrollbarIndicatorModule } from 'projects/ngx-scrollbar-indicator/src/public_api';
import { BasicComponent } from './basic/basic.component';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { CoreComponent } from './bootstrap/core/core.component';
import { MoreComponent } from './bootstrap/more/more.component';
import { UseAngularCdkComponent } from './use-angular-cdk/use-angular-cdk.component';

const routes: Routes = [
  { path: 'basic', component: BasicComponent },
  { path: 'use-angular-cdk', component: UseAngularCdkComponent },
  {
    path: 'bootstrap', component: BootstrapComponent, children: [
      { path: 'core', component: CoreComponent },
      { path: 'more', component: MoreComponent },
      { path: '**', redirectTo: 'core', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'bootstrap', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    BootstrapComponent,
    CoreComponent,
    MoreComponent,
    UseAngularCdkComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    NgxScrollbarIndicatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
