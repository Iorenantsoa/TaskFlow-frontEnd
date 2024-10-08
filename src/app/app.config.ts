import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoginInterceptor } from './interceptors/loginInterceptor';
import { LoginGuard } from './guards/login.guards';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';

import { importProvidersFrom } from '@angular/core';
import { LogoutGuard } from './guards/Logout.guard';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(withInterceptors([LoginInterceptor])),
    LoginGuard, 
    LogoutGuard,
  provideAnimations(),
  provideToastr(),
  importProvidersFrom(ToastrModule.forRoot({
    positionClass:
      'toast-bottom-right',
    closeButton: true,                    
    progressBar: true,                    
    timeOut: 5000 ,  
  }))
  ]
};


