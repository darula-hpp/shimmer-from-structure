import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideShimmerConfig } from '@shimmer-from-structure/angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideShimmerConfig({
      shimmerColor: 'rgba(255, 255, 255, 0.4)',
      backgroundColor: '#e0e0e0',
      duration: 1.5,
      fallbackBorderRadius: 6,
    }),
  ],
}).catch((err) => console.error(err));
