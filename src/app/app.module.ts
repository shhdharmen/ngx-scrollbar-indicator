import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { NgxScrollbarIndicatorModule } from "projects/ngx-scrollbar-indicator/src/public_api";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { CoreComponent } from "./bootstrap/core/core.component";
import { MoreComponent } from "./bootstrap/more/more.component";
import { BasicComponent } from "./basic/basic.component";

const routes: Routes = [
  { path: "basic", component: BasicComponent },
  {
    path: "bootstrap",
    component: BootstrapComponent,
    children: [
      { path: "core", component: CoreComponent },
      { path: "more", component: MoreComponent },
      { path: "**", redirectTo: "core", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "basic", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
    CoreComponent,
    MoreComponent,
    BasicComponent
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
export class AppModule {}
