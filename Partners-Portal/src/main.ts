import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule)
  ]
}).catch((err: unknown) => console.error(err));