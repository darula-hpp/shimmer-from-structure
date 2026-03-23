import { DocsLayout } from '../../components/DocsLayout';
import { CodeTabs } from '../../components/CodeTabs';

export default function Examples() {
  return (
    <DocsLayout>
      <article className="prose dark:prose-invert max-w-none">
        <h1>Examples</h1>

        <p>
          Real-world examples extracted from the working example projects in the repository. Each
          example demonstrates the same functionality adapted to the framework's patterns.
        </p>

        <h2>User Profile Component</h2>

        <p>
          A user profile card with avatar, name, email, and status. Uses templateProps to provide
          mock data during loading.
        </p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`// Template data for skeleton
const userTemplate = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Software Engineer',
  avatar: 'https://via.placeholder.com/64',
  status: 'offline',
};

// Component
const UserProfile = ({ user }) => (
  <div className="user-profile">
    <img src={user.avatar} alt={user.name} className="user-avatar" />
    <div className="user-info">
      <h2>{user.name}</h2>
      <p className="user-email">{user.email}</p>
      <span className={\`user-status \${user.status}\`}>{user.role}</span>
    </div>
    <div className={\`status-indicator \${user.status}\`}>
      <span className="status-dot"></span>
      {user.status}
    </div>
  </div>
);

// Usage
<Shimmer loading={loadingUser} templateProps={{ user: userTemplate }}>
  <UserProfile user={user || userTemplate} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<script setup>
const userTemplate = {
  name: 'Loading Name...',
  role: 'Loading Role...',
  avatar: '',
  status: 'offline',
  email: 'loading.email@example.com',
};

const user = {
  name: 'Alex Morgan',
  role: 'Senior Developer',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  status: 'online',
  email: 'alex.morgan@example.com',
};
</script>

<template>
  <Shimmer :loading="loading" :templateProps="{ user: userTemplate }">
    <div class="user-profile">
      <img :src="user.avatar || '/placeholder.png'" class="user-avatar" />
      <div class="user-info">
        <h2>{{ user.name }}</h2>
        <div class="user-email">{{ user.email }}</div>
        <div class="user-status">{{ user.status }}</div>
      </div>
    </div>
  </Shimmer>
</template>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<script>
const userTemplate = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Software Engineer',
  avatar: 'https://via.placeholder.com/64',
  status: 'offline',
};

let user = $state(null);
let loading = $state(true);
</script>

<Shimmer loading={loading} templateProps={{ user: userTemplate }}>
  <div class="user-profile">
    <img src={user?.avatar} alt={user?.name} class="user-avatar" />
    <div class="user-info">
      <h2>{user?.name}</h2>
      <p class="user-email">{user?.email}</p>
      <span class="user-status">{user?.role}</span>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`userTemplate = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Software Engineer',
  avatar: 'https://via.placeholder.com/64',
  status: 'offline',
};

loadingUser = signal(true);
user = signal<User | null>(null);

// Template
<shimmer [loading]="loadingUser()" [templateProps]="{ user: userTemplate }">
  <div class="user-profile">
    <img [src]="user()?.avatar" class="user-avatar" />
    <div class="user-info">
      <h2>{{ user()?.name }}</h2>
      <p class="user-email">{{ user()?.email }}</p>
      <span class="user-status">{{ user()?.role }}</span>
    </div>
  </div>
</shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'SolidJS',
              content: (
                <pre>
                  <code>{`const userTemplate = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Software Engineer',
  avatar: 'https://via.placeholder.com/64',
  status: 'offline',
};

const [loading, setLoading] = createSignal(true);
const [user, setUser] = createSignal(null);

<Shimmer loading={loading()} templateProps={{ user: userTemplate }}>
  <div class="user-profile">
    <img src={user()?.avatar} class="user-avatar" />
    <div class="user-info">
      <h2>{user()?.name}</h2>
      <p class="user-email">{user()?.email}</p>
      <span class="user-status">{user()?.role}</span>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>Stats Cards Grid</h2>

        <p>Display multiple stat cards with values, changes, and trend indicators:</p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`const statsTemplate = [
  { label: 'Total Revenue', value: '$00,000', change: '+0.0%', trend: 'up' },
  { label: 'Active Users', value: '0,000', change: '+0.0%', trend: 'up' },
  { label: 'Conversion', value: '0.0%', change: '-0.0%', trend: 'down' },
  { label: 'Avg. Order', value: '$000', change: '+0.0%', trend: 'up' },
];

const StatsGrid = ({ stats }) => (
  <div className="stats-grid">
    {stats.map((stat, index) => (
      <div key={index} className="stat-card">
        <p className="stat-label">{stat.label}</p>
        <h3 className="stat-value">{stat.value}</h3>
        <span className={\`stat-change \${stat.trend}\`}>
          {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
        </span>
      </div>
    ))}
  </div>
);

<Shimmer loading={loadingStats} templateProps={{ stats: statsTemplate }}>
  <StatsGrid stats={stats || statsTemplate} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<script setup>
const stats = [
  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
  { label: 'Active Users', value: '2,338', change: '-4.5%', trend: 'down' },
  { label: 'New Signups', value: '+563', change: '+12.5%', trend: 'up' },
  { label: 'Avg. Session', value: '4m 32s', change: '+2.4%', trend: 'up' },
];
</script>

<template>
  <Shimmer :loading="loading" :template-props="{ stats }">
    <div class="stats-grid">
      <div v-for="(stat, index) in stats" :key="index" class="stat-card">
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-change" :class="stat.trend">
          {{ stat.change }} from last month
        </div>
      </div>
    </div>
  </Shimmer>
</template>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<script>
const statsTemplate = [
  { label: 'Total Revenue', value: '$00,000', change: '+0.0%', trend: 'up' },
  { label: 'Active Users', value: '0,000', change: '+0.0%', trend: 'up' },
  { label: 'Conversion', value: '0.0%', change: '-0.0%', trend: 'down' },
  { label: 'Avg. Order', value: '$000', change: '+0.0%', trend: 'up' },
];
</script>

<Shimmer loading={loadingStats} templateProps={{ stats: statsTemplate }}>
  <div class="stats-grid">
    {#each stats as stat, index (index)}
      <div class="stat-card">
        <p class="stat-label">{stat.label}</p>
        <h3 class="stat-value">{stat.value}</h3>
        <span class="stat-change {stat.trend}">
          {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
        </span>
      </div>
    {/each}
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`statsTemplate = [
  { label: 'Total Revenue', value: '$00,000', change: '+0.0%', trend: 'up' },
  { label: 'Active Users', value: '0,000', change: '+0.0%', trend: 'up' },
  { label: 'Conversion', value: '0.0%', change: '-0.0%', trend: 'down' },
  { label: 'Avg. Order', value: '$000', change: '+0.0%', trend: 'up' },
];

<shimmer [loading]="loadingStats()" [templateProps]="{ stats: statsTemplate }">
  <div class="stats-grid">
    @for (stat of stats(); track $index) {
      <div class="stat-card">
        <p class="stat-label">{{ stat.label }}</p>
        <h3 class="stat-value">{{ stat.value }}</h3>
        <span [class]="'stat-change ' + stat.trend">
          {{ stat.trend === 'up' ? '↑' : '↓' }} {{ stat.change }}
        </span>
      </div>
    }
  </div>
</shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'SolidJS',
              content: (
                <pre>
                  <code>{`const statsTemplate = [
  { label: 'Total Revenue', value: '$00,000', change: '+0.0%', trend: 'up' },
  { label: 'Active Users', value: '0,000', change: '+0.0%', trend: 'up' },
  { label: 'Conversion', value: '0.0%', change: '-0.0%', trend: 'down' },
  { label: 'Avg. Order', value: '$000', change: '+0.0%', trend: 'up' },
];

<Shimmer loading={loadingStats()} templateProps={{ stats: statsTemplate }}>
  <div class="stats-grid">
    <For each={stats()}>
      {(stat) => (
        <div class="stat-card">
          <p class="stat-label">{stat.label}</p>
          <h3 class="stat-value">{stat.value}</h3>
          <span class={\`stat-change \${stat.trend}\`}>
            {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
          </span>
        </div>
      )}
    </For>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>Orders Table</h2>

        <p>A data table with multiple rows showing customer orders:</p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`const ordersTemplate = [
  {
    id: '1',
    customer: 'Loading Name...',
    product: 'Loading Product...',
    amount: '$000.00',
    status: 'Processing',
  },
  // ... repeat for 5 items
];

const OrdersTable = ({ orders }) => (
  <table className="orders-table">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order.id}>
          <td>{order.customer}</td>
          <td>{order.product}</td>
          <td>{order.amount}</td>
          <td>
            <span className={\`status \${order.status}\`}>
              {order.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

<Shimmer loading={loadingOrders} templateProps={{ orders: ordersTemplate }}>
  <OrdersTable orders={orders || ordersTemplate} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<script setup>
const ordersTemplate = Array(5).fill({
  id: '1',
  customer: 'Loading Name...',
  product: 'Loading Product...',
  amount: '$000.00',
  status: 'Processing',
});
</script>

<template>
  <Shimmer :loading="loadingOrders" :template-props="{ orders: ordersTemplate }">
    <table class="orders-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.customer }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.amount }}</td>
          <td>
            <span :class="'status ' + order.status">
              {{ order.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </Shimmer>
</template>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<script>
const ordersTemplate = Array(5).fill({
  id: '1',
  customer: 'Loading Name...',
  product: 'Loading Product...',
  amount: '$000.00',
  status: 'Processing',
});
</script>

<Shimmer loading={loadingOrders} templateProps={{ orders: ordersTemplate }}>
  <table class="orders-table">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {#each orders as order (order.id)}
        <tr>
          <td>{order.customer}</td>
          <td>{order.product}</td>
          <td>{order.amount}</td>
          <td>
            <span class="status {order.status}">
              {order.status}
            </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`ordersTemplate = Array(5).fill({
  id: '1',
  customer: 'Loading Name...',
  product: 'Loading Product...',
  amount: '$000.00',
  status: 'Processing',
});

<shimmer [loading]="loadingOrders()" [templateProps]="{ orders: ordersTemplate }">
  <table class="orders-table">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      @for (order of orders(); track order.id) {
        <tr>
          <td>{{ order.customer }}</td>
          <td>{{ order.product }}</td>
          <td>{{ order.amount }}</td>
          <td>
            <span [class]="'status ' + order.status">
              {{ order.status }}
            </span>
          </td>
        </tr>
      }
    </tbody>
  </table>
</shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'SolidJS',
              content: (
                <pre>
                  <code>{`const ordersTemplate = Array(5).fill({
  id: '1',
  customer: 'Loading Name...',
  product: 'Loading Product...',
  amount: '$000.00',
  status: 'Processing',
});

<Shimmer loading={loadingOrders()} templateProps={{ orders: ordersTemplate }}>
  <table class="orders-table">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <For each={orders()}>
        {(order) => (
          <tr>
            <td>{order.customer}</td>
            <td>{order.product}</td>
            <td>{order.amount}</td>
            <td>
              <span class={\`status \${order.status}\`}>
                {order.status}
              </span>
            </td>
          </tr>
        )}
      </For>
    </tbody>
  </table>
</Shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>Team Members Grid</h2>

        <p>Display team members with avatars in a grid layout:</p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`const teamTemplate = [
  { id: '1', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '2', name: 'Loading...', role: 'Lead Developer', avatar: 'https://via.placeholder.com/40' },
  { id: '3', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '4', name: 'Loading...', role: 'Backend Developer', avatar: 'https://via.placeholder.com/40' },
];

const TeamMembers = ({ members }) => (
  <div className="team-members">
    <h3 className="section-title">Team</h3>
    <div className="members-grid">
      {members.map((member) => (
        <div key={member.id} className="member-card">
          <img src={member.avatar} alt={member.name} className="member-avatar" />
          <p className="member-name">{member.name}</p>
          <span className="member-role">{member.role}</span>
        </div>
      ))}
    </div>
  </div>
);

<Shimmer loading={loadingTeam} templateProps={{ members: teamTemplate }}>
  <TeamMembers members={team || teamTemplate} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<script setup>
const teamTemplate = Array(4).fill({
  name: 'Loading...',
  role: 'Role...',
  avatar: '',
});

const team = [
  { name: 'Sarah Wilson', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'James Rod', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Emily Chen', role: 'Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Michael Fox', role: 'Backend Dev', avatar: 'https://i.pravatar.cc/150?u=4' },
];
</script>

<template>
  <Shimmer
    :loading="loadingTeam"
    :template-props="{ members: teamTemplate }"
    shimmerColor="rgba(20, 184, 166, 0.4)"
  >
    <div class="members-grid">
      <div v-for="(member, i) in team" :key="i" class="member-card">
        <img :src="member.avatar || '/placeholder-user.png'" class="member-avatar" />
        <div class="member-name">{{ member.name }}</div>
        <div class="member-role">{{ member.role }}</div>
      </div>
    </div>
  </Shimmer>
</template>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<script>
const teamTemplate = Array(4).fill({
  id: '1',
  name: 'Loading...',
  role: 'Role',
  avatar: 'https://via.placeholder.com/40',
});
</script>

<Shimmer loading={loadingTeam} templateProps={{ members: teamTemplate }}>
  <div class="team-members">
    <h3 class="section-title">Team</h3>
    <div class="members-grid">
      {#each team as member (member.id)}
        <div class="member-card">
          <img src={member.avatar} alt={member.name} class="member-avatar" />
          <p class="member-name">{member.name}</p>
          <span class="member-role">{member.role}</span>
        </div>
      {/each}
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`teamTemplate = [
  { id: '1', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '2', name: 'Loading...', role: 'Lead Developer', avatar: 'https://via.placeholder.com/40' },
  { id: '3', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '4', name: 'Loading...', role: 'Backend Developer', avatar: 'https://via.placeholder.com/40' },
];

<shimmer [loading]="loadingTeam()" [templateProps]="{ members: teamTemplate }">
  <div class="team-members">
    <h3 class="section-title">Team</h3>
    <div class="members-grid">
      @for (member of team(); track member.id) {
        <div class="member-card">
          <img [src]="member.avatar" [alt]="member.name" class="member-avatar" />
          <p class="member-name">{{ member.name }}</p>
          <span class="member-role">{{ member.role }}</span>
        </div>
      }
    </div>
  </div>
</shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'SolidJS',
              content: (
                <pre>
                  <code>{`const teamTemplate = [
  { id: '1', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '2', name: 'Loading...', role: 'Lead Developer', avatar: 'https://via.placeholder.com/40' },
  { id: '3', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '4', name: 'Loading...', role: 'Backend Developer', avatar: 'https://via.placeholder.com/40' },
];

<Shimmer loading={loadingTeam()} templateProps={{ members: teamTemplate }}>
  <div class="team-members">
    <h3 class="section-title">Team</h3>
    <div class="members-grid">
      <For each={team()}>
        {(member) => (
          <div class="member-card">
            <img src={member.avatar} alt={member.name} class="member-avatar" />
            <p class="member-name">{member.name}</p>
            <span class="member-role">{member.role}</span>
          </div>
        )}
      </For>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>HTML Attribute Controls</h2>

        <p>
          Use HTML data attributes to control shimmer behavior at the element level. This example
          shows a card with a visible "LIVE" badge during loading and a metric row treated as a
          single shimmer block:
        </p>

        <CodeTabs
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: (
                <pre>
                  <code>{`const MetricsCard = ({ metrics }) => (
  <div className="metrics-card">
    {/* Badge stays visible during loading */}
    <span className="live-badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h3 className="card-title">{metrics.title}</h3>
    <p className="card-description">{metrics.description}</p>
    
    {/* Entire row becomes one shimmer block instead of 3 separate blocks */}
    <div className="metrics-row" data-shimmer-no-children>
      <div className="metric">
        <span className="metric-label">Views</span>
        <span className="metric-value">{metrics.views}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Clicks</span>
        <span className="metric-value">{metrics.clicks}</span>
      </div>
      <div className="metric">
        <span className="metric-label">Rate</span>
        <span className="metric-value">{metrics.rate}%</span>
      </div>
    </div>
  </div>
);

const metricsTemplate = {
  title: 'Campaign Performance',
  description: 'Real-time metrics for your active campaign',
  views: '12,345',
  clicks: '1,234',
  rate: '10.0',
};

<Shimmer loading={loading} templateProps={{ metrics: metricsTemplate }}>
  <MetricsCard metrics={metrics || metricsTemplate} />
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'vue',
              label: 'Vue',
              content: (
                <pre>
                  <code>{`<script setup>
const metricsTemplate = {
  title: 'Campaign Performance',
  description: 'Real-time metrics for your active campaign',
  views: '12,345',
  clicks: '1,234',
  rate: '10.0',
};
</script>

<template>
  <Shimmer :loading="loading" :template-props="{ metrics: metricsTemplate }">
    <div class="metrics-card">
      <!-- Badge stays visible during loading -->
      <span class="live-badge" data-shimmer-ignore>
        LIVE
      </span>
      
      <h3 class="card-title">{{ metrics.title }}</h3>
      <p class="card-description">{{ metrics.description }}</p>
      
      <!-- Entire row becomes one shimmer block -->
      <div class="metrics-row" data-shimmer-no-children>
        <div class="metric">
          <span class="metric-label">Views</span>
          <span class="metric-value">{{ metrics.views }}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Clicks</span>
          <span class="metric-value">{{ metrics.clicks }}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Rate</span>
          <span class="metric-value">{{ metrics.rate }}%</span>
        </div>
      </div>
    </div>
  </Shimmer>
</template>`}</code>
                </pre>
              ),
            },
            {
              id: 'svelte',
              label: 'Svelte',
              content: (
                <pre>
                  <code>{`<script>
const metricsTemplate = {
  title: 'Campaign Performance',
  description: 'Real-time metrics for your active campaign',
  views: '12,345',
  clicks: '1,234',
  rate: '10.0',
};
</script>

<Shimmer loading={loading} templateProps={{ metrics: metricsTemplate }}>
  <div class="metrics-card">
    <!-- Badge stays visible during loading -->
    <span class="live-badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h3 class="card-title">{metrics.title}</h3>
    <p class="card-description">{metrics.description}</p>
    
    <!-- Entire row becomes one shimmer block -->
    <div class="metrics-row" data-shimmer-no-children>
      <div class="metric">
        <span class="metric-label">Views</span>
        <span class="metric-value">{metrics.views}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Clicks</span>
        <span class="metric-value">{metrics.clicks}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Rate</span>
        <span class="metric-value">{metrics.rate}%</span>
      </div>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'angular',
              label: 'Angular',
              content: (
                <pre>
                  <code>{`metricsTemplate = {
  title: 'Campaign Performance',
  description: 'Real-time metrics for your active campaign',
  views: '12,345',
  clicks: '1,234',
  rate: '10.0',
};

<shimmer [loading]="loading()" [templateProps]="{ metrics: metricsTemplate }">
  <div class="metrics-card">
    <!-- Badge stays visible during loading -->
    <span class="live-badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h3 class="card-title">{{ metrics().title }}</h3>
    <p class="card-description">{{ metrics().description }}</p>
    
    <!-- Entire row becomes one shimmer block -->
    <div class="metrics-row" data-shimmer-no-children>
      <div class="metric">
        <span class="metric-label">Views</span>
        <span class="metric-value">{{ metrics().views }}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Clicks</span>
        <span class="metric-value">{{ metrics().clicks }}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Rate</span>
        <span class="metric-value">{{ metrics().rate }}%</span>
      </div>
    </div>
  </div>
</shimmer>`}</code>
                </pre>
              ),
            },
            {
              id: 'solid',
              label: 'SolidJS',
              content: (
                <pre>
                  <code>{`const metricsTemplate = {
  title: 'Campaign Performance',
  description: 'Real-time metrics for your active campaign',
  views: '12,345',
  clicks: '1,234',
  rate: '10.0',
};

<Shimmer loading={loading()} templateProps={{ metrics: metricsTemplate }}>
  <div class="metrics-card">
    {/* Badge stays visible during loading */}
    <span class="live-badge" data-shimmer-ignore>
      LIVE
    </span>
    
    <h3 class="card-title">{metrics().title}</h3>
    <p class="card-description">{metrics().description}</p>
    
    {/* Entire row becomes one shimmer block */}
    <div class="metrics-row" data-shimmer-no-children>
      <div class="metric">
        <span class="metric-label">Views</span>
        <span class="metric-value">{metrics().views}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Clicks</span>
        <span class="metric-value">{metrics().clicks}</span>
      </div>
      <div class="metric">
        <span class="metric-label">Rate</span>
        <span class="metric-value">{metrics().rate}%</span>
      </div>
    </div>
  </div>
</Shimmer>`}</code>
                </pre>
              ),
            },
          ]}
        />

        <h2>Live Examples</h2>

        <p>
          Check out the full working examples in the repository. Each example is a complete
          dashboard application with multiple sections loading independently:
        </p>

        <ul>
          <li>
            <a
              href="https://github.com/darula-hpp/shimmer-from-structure/tree/main/examples/react-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Example
            </a>{' '}
            - Complete dashboard with user profile, stats, charts, tables, and Suspense integration
          </li>
          <li>
            <a
              href="https://github.com/darula-hpp/shimmer-from-structure/tree/main/examples/vue-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vue Example
            </a>{' '}
            - Dashboard using Vue 3 Composition API with reactive refs
          </li>
          <li>
            <a
              href="https://github.com/darula-hpp/shimmer-from-structure/tree/main/examples/svelte-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              Svelte Example
            </a>{' '}
            - Dashboard with Svelte 5 runes ($state, $props)
          </li>
          <li>
            <a
              href="https://github.com/darula-hpp/shimmer-from-structure/tree/main/examples/angular-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              Angular Example
            </a>{' '}
            - Dashboard using Angular 19 signals and standalone components
          </li>
          <li>
            <a
              href="https://github.com/darula-hpp/shimmer-from-structure/tree/main/examples/solid-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              SolidJS Example
            </a>{' '}
            - Dashboard with SolidJS reactive primitives (createSignal, For)
          </li>
        </ul>

        <p>
          All examples demonstrate the same features: independent loading states, template props for
          dynamic data, custom shimmer colors, and global configuration.
        </p>
      </article>
    </DocsLayout>
  );
}
