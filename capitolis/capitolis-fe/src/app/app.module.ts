import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataService} from './services/data-service';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent} from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { ExcelService } from './services/excel.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'leader-board', component: LeaderBoardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeaderBoardComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    MatProgressSpinnerModule
  ],
  providers: [
    DataService, ExcelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
