import { DocsLayout } from '../../components/DocsLayout';

export default function AngularGuide() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Angular Guide</h1>

        <p>Learn how to use Shimmer From Structure with Angular 19+.</p>

        <h2>Installation</h2>

        <pre>
          <code>npm install @shimmer-from-structure/angular</code>
        </pre>

        <h2>Basic Usage</h2>

        <h3>Static Content</h3>

        <pre>
          <code>{`import { Component, signal } from '@angular/core';
import { ShimmerComponent } from '@shimmer-from-structure/angular';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ShimmerComponent],
  template: \`
    <shimmer [loading]="isLoading()">
      <div class="card">
        <img src="avatar.jpg" class="avatar" />
        <h2>John Doe</h2>
        <p>Software Engineer</p>
      </div>
    </shimmer>
  \`,
})
export class UserCardComponent {
  isLoading = signal(true);
}`}</code>
        </pre>

        <h3>Dynamic Content with templateProps</h3>

        <pre>
          <code>{`import { Component, signal } from '@angular/core';
import { ShimmerComponent } from '@shimmer-from-structure/angular';
import { UserCardComponent } from './user-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShimmerComponent, UserCardComponent],
  template: \`
    <shimmer [loading]="loading()" [templateProps]="{ user: userTemplate }">
      <app-user-card [user]="user() || userTemplate" />
    </shimmer>
  \`,
})
export class AppComponent {
  loading = signal(true);
  user = signal<User | null>(null);

  userTemplate = {
    name: 'Loading...',
    role: 'Loading role...',
    avatar: 'placeholder.jpg',
  };
}`}</code>
        </pre>

        <h2>Global Configuration</h2>

        <p>Use Angular's dependency injection to set global defaults:</p>

        <pre>
          <code>{`// main.ts or bootstrapApplication
import { bootstrapApplication } from '@angular/platform-browser';
import { provideShimmerConfig } from '@shimmer-from-structure/angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideShimmerConfig({
      shimmerColor: 'rgba(56, 189, 248, 0.4)',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      duration: 2.5,
      fallbackBorderRadius: 8,
    }),
  ],
});`}</code>
        </pre>

        <h3>Accessing Config</h3>

        <pre>
          <code>{`import { Component, inject } from '@angular/core';
import { injectShimmerConfig } from '@shimmer-from-structure/angular';

@Component({
  selector: 'app-my-component',
  template: \`<div [style.background]="config.backgroundColor">...</div>\`,
})
export class MyComponent {
  config = injectShimmerConfig();
}`}</code>
        </pre>

        <h2>Examples</h2>

        <h3>Dashboard with Multiple Sections</h3>

        <pre>
          <code>{`@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ShimmerComponent, CommonModule],
  template: \`
    <div class="dashboard">
      <!-- User Profile -->
      <section class="dashboard-section">
        <shimmer [loading]="loadingUser()" [templateProps]="{ user: userTemplate }">
          <app-user-profile [user]="user() || userTemplate" />
        </shimmer>
      </section>

      <!-- Stats Grid -->
      <section class="dashboard-section">
        <shimmer
          [loading]="loadingStats()"
          [templateProps]="{ stats: statsTemplate }"
          shimmerColor="rgba(20, 184, 166, 0.2)"
        >
          <app-stats-grid [stats]="stats() || statsTemplate" />
        </shimmer>
      </section>

      <!-- Transactions List -->
      <section class="dashboard-section">
        <shimmer [loading]="loadingTransactions()" [templateProps]="{ transactions: transactionsTemplate }">
          <app-transactions-list [transactions]="transactions() || transactionsTemplate" />
        </shimmer>
      </section>
    </div>
  \`,
})
export class DashboardComponent implements OnInit {
  // Loading signals
  loadingUser = signal(true);
  loadingStats = signal(true);
  loadingTransactions = signal(true);

  // Data signals
  user = signal<User | null>(null);
  stats = signal<StatCard[] | null>(null);
  transactions = signal<Transaction[] | null>(null);

  // Templates
  userTemplate = { name: 'Loading...', role: 'Loading...', avatar: '' };
  statsTemplate = [/* ... placeholders ... */];
  transactionsTemplate = [/* ... placeholders ... */];

  ngOnInit() {
    // Simulate independent API calls
    setTimeout(() => { 
      this.user.set(realUser); 
      this.loadingUser.set(false); 
    }, 1000);
    
    setTimeout(() => { 
      this.stats.set(realStats); 
      this.loadingStats.set(false); 
    }, 2000);

    setTimeout(() => {
      this.transactions.set(realTransactions);
      this.loadingTransactions.set(false);
    }, 3000);
  }
}`}</code>
        </pre>

        <h2>Next Steps</h2>

        <ul>
          <li>
            <a href="/docs/api">API Reference</a> - Explore all available props
          </li>
          <li>
            <a href="/docs/examples">Examples</a> - See more real-world examples
          </li>
          <li>
            <a href="/docs/best-practices">Best Practices</a> - Learn optimization techniques
          </li>
        </ul>
      </article>
    </DocsLayout>
  );
}
