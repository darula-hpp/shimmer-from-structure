<script lang="ts">
  import { onMount } from 'svelte';
  import { Shimmer } from '@shimmer-from-structure/svelte';
  import ContextExample from './ContextExample.svelte';

  // Types
  interface User {
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: 'online' | 'away' | 'offline';
  }

  interface StatCard {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }

  interface Transaction {
    id: string;
    description: string;
    amount: string;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }

  interface ActivityItem {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
  }

  interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }

  interface Order {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: 'Delivered' | 'Processing' | 'Cancelled';
  }

  interface ChartDataPoint {
    name: string;
    revenue: number;
    orders: number;
  }

  interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'success' | 'warning';
  }

  // Template Data
  const userTemplate: User = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'software Engineer',
    avatar: 'https://via.placeholder.com/64',
    status: 'offline',
  };

  const statsTemplate: StatCard[] = [
    { label: 'Total Revenue', value: '$00,000', change: '+0.0%', trend: 'up' },
    { label: 'Active Users', value: '0,000', change: '+0.0%', trend: 'up' },
    { label: 'Conversion', value: '0.0%', change: '-0.0%', trend: 'down' },
    { label: 'Avg. Order', value: '$000', change: '+0.0%', trend: 'up' },
  ];

  const transactionsTemplate: Transaction[] = Array(4)
    .fill(null)
    .map((_, i) => ({
      id: `${i}`,
      description: 'Loading transaction...',
      amount: '$0.00',
      date: 'Jan 00',
      status: 'pending' as const,
    }));

  const activityTemplate: ActivityItem[] = Array(3)
    .fill(null)
    .map((_, i) => ({
      id: `${i}`,
      user: 'Loading...',
      action: 'performed',
      target: 'an action',
      time: '0m ago',
    }));

  const teamTemplate: TeamMember[] = Array(4)
    .fill(null)
    .map((_, i) => ({
      id: `${i}`,
      name: 'Loading...',
      role: 'Role',
      avatar: 'https://via.placeholder.com/40',
    }));

  const ordersTemplate: Order[] = Array(5)
    .fill(null)
    .map((_, i) => ({
      id: `${i}`,
      customer: 'Loading Name...',
      product: 'Loading Product...',
      amount: '$000.00',
      status: 'Processing' as const,
    }));

  const chartTemplate: ChartDataPoint[] = [
    { name: 'Mon', revenue: 3000, orders: 30 },
    { name: 'Tue', revenue: 4500, orders: 45 },
    { name: 'Wed', revenue: 3800, orders: 38 },
    { name: 'Thu', revenue: 5200, orders: 52 },
    { name: 'Fri', revenue: 6100, orders: 61 },
    { name: 'Sat', revenue: 7000, orders: 70 },
    { name: 'Sun', revenue: 5500, orders: 55 },
  ];

  const notificationsTemplate: Notification[] = [
    {
      id: '1',
      title: 'Loading...',
      message: 'Notification message loading...',
      time: '0m',
      type: 'info',
    },
    {
      id: '2',
      title: 'Loading...',
      message: 'Notification message loading...',
      time: '0m',
      type: 'info',
    },
    {
      id: '3',
      title: 'Loading...',
      message: 'Notification message loading...',
      time: '0m',
      type: 'info',
    },
  ];

  // Real Data
  const realUser: User = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/64?img=5',
    status: 'online',
  };

  const realStats: StatCard[] = [
    { label: 'Total Revenue', value: '$48,352', change: '+12.5%', trend: 'up' },
    { label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up' },
    { label: 'Conversion', value: '3.24%', change: '-0.4%', trend: 'down' },
    { label: 'Avg. Order', value: '$284', change: '+5.7%', trend: 'up' },
  ];

  const realTransactions: Transaction[] = [
    {
      id: '1',
      description: 'Premium Subscription',
      amount: '$99.00',
      date: 'Jan 20',
      status: 'completed',
    },
    {
      id: '2',
      description: 'API Credits Purchase',
      amount: '$250.00',
      date: 'Jan 19',
      status: 'completed',
    },
    {
      id: '3',
      description: 'Team License Upgrade',
      amount: '$499.00',
      date: 'Jan 18',
      status: 'pending',
    },
    {
      id: '4',
      description: 'Support Add-on',
      amount: '$49.00',
      date: 'Jan 17',
      status: 'completed',
    },
  ];

  const realActivity: ActivityItem[] = [
    {
      id: '1',
      user: 'Mike Chen',
      action: 'deployed',
      target: 'v2.4.1 to production',
      time: '5m ago',
    },
    {
      id: '2',
      user: 'Emily Davis',
      action: 'approved',
      target: 'design review for Dashboard',
      time: '23m ago',
    },
    { id: '3', user: 'Alex Rivera', action: 'commented on', target: 'Issue #847', time: '1h ago' },
  ];

  const realTeam: TeamMember[] = [
    {
      id: '1',
      name: 'Mike Chen',
      role: 'Lead Developer',
      avatar: 'https://i.pravatar.cc/40?img=11',
    },
    { id: '2', name: 'Emily Davis', role: 'UX Designer', avatar: 'https://i.pravatar.cc/40?img=9' },
    {
      id: '3',
      name: 'Alex Rivera',
      role: 'Backend Engineer',
      avatar: 'https://i.pravatar.cc/40?img=12',
    },
    { id: '4', name: 'Jordan Lee', role: 'DevOps', avatar: 'https://i.pravatar.cc/40?img=15' },
  ];

  const realOrders: Order[] = [
    {
      id: '101',
      customer: 'Alice Freeman',
      product: 'Pro Plan (Monthly)',
      amount: '$29.00',
      status: 'Delivered',
    },
    {
      id: '102',
      customer: 'Bob Smith',
      product: 'Enterprise License',
      amount: '$499.00',
      status: 'Processing',
    },
    {
      id: '103',
      customer: 'Charlie Brown',
      product: 'Basic Plan (Yearly)',
      amount: '$99.00',
      status: 'Cancelled',
    },
    {
      id: '104',
      customer: 'David Wilson',
      product: 'Pro Plan (monthly)',
      amount: '$29.00',
      status: 'Delivered',
    },
    {
      id: '105',
      customer: 'Eva Green',
      product: 'Consulting Hour',
      amount: '$150.00',
      status: 'Delivered',
    },
  ];

  const realChartData: ChartDataPoint[] = [
    { name: 'Mon', revenue: 4200, orders: 42 },
    { name: 'Tue', revenue: 5800, orders: 58 },
    { name: 'Wed', revenue: 4900, orders: 49 },
    { name: 'Thu', revenue: 7200, orders: 72 },
    { name: 'Fri', revenue: 8400, orders: 84 },
    { name: 'Sat', revenue: 9100, orders: 91 },
    { name: 'Sun', revenue: 6800, orders: 68 },
  ];

  const realNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Comment',
      message: 'Sarah commented on your pull request #42',
      time: '2m',
      type: 'info',
    },
    {
      id: '2',
      title: 'Build Passed',
      message: 'CI pipeline completed successfully',
      time: '15m',
      type: 'success',
    },
    {
      id: '3',
      title: 'Security Alert',
      message: 'New login detected from Safari on macOS',
      time: '1h',
      type: 'warning',
    },
  ];

  // State
  let loadingUser = true;
  let loadingStats = true;
  let loadingTransactions = true;
  let loadingActivity = true;
  let loadingTeam = true;
  let loadingOrders = true;
  let loadingChart = true;
  let loadingNotifications = true;
  let loadingContextExample = true;

  let user: User | null = null;
  let stats: StatCard[] | null = null;
  let transactions: Transaction[] | null = null;
  let orders: Order[] | null = null;
  let activity: ActivityItem[] | null = null;
  let team: TeamMember[] | null = null;
  let chartData: ChartDataPoint[] | null = null;
  let notifications: Notification[] | null = null;
  let contextData: TeamMember[] | null = null;

  function loadData() {
    loadingUser = true;
    loadingStats = true;
    loadingTransactions = true;
    loadingActivity = true;
    loadingTeam = true;
    loadingOrders = true;
    loadingChart = true;
    loadingNotifications = true;
    loadingContextExample = true;

    user = null;
    stats = null;
    transactions = null;
    orders = null;
    activity = null;
    team = null;
    chartData = null;
    notifications = null;
    contextData = null;

    // Simulate timeouts matching React example
    setTimeout(() => {
      user = realUser;
      loadingUser = false;
    }, 8000);
    setTimeout(() => {
      stats = realStats;
      loadingStats = false;
    }, 12000);
    setTimeout(() => {
      chartData = realChartData;
      loadingChart = false;
    }, 14000);
    setTimeout(() => {
      team = realTeam;
      loadingTeam = false;
    }, 16000);
    setTimeout(() => {
      orders = realOrders;
      loadingOrders = false;
    }, 18000);
    setTimeout(() => {
      activity = realActivity;
      loadingActivity = false;
    }, 20000);
    setTimeout(() => {
      transactions = realTransactions;
      loadingTransactions = false;
    }, 25000);
    // Async component demo - simulate network delay
    setTimeout(() => {
      notifications = realNotifications;
      loadingNotifications = false;
    }, 30000);
    // Context example loads extra slow
    setTimeout(() => {
      contextData = realTeam.slice(0, 2);
      loadingContextExample = false;
    }, 4000);
  }

  onMount(() => {
    loadData();
  });
</script>

<div class="dashboard">
  <header class="dashboard-header">
    <div class="header-content">
      <h1>✨ Shimmer From Structure (Svelte)</h1>
      <p>Real-world dashboard demo with independent loading states</p>
    </div>
    <button class="reload-btn" on:click={loadData}> ↻ Reload Demo </button>
  </header>

  <!-- User Profile Section -->
  <section class="dashboard-section">
    <Shimmer loading={loadingUser}>
      {@const u = user || userTemplate}
      <div class="user-profile">
        <img src={u.avatar} alt={u.name} class="user-avatar" />
        <div class="user-info">
          <h2>{u.name}</h2>
          <p class="user-email">{u.email}</p>
          <span class={`user-status ${u.status}`}>{u.role}</span>
        </div>
        <div class={`status-indicator ${u.status}`}>
          <span class="status-dot"></span>
          {u.status}
        </div>
      </div>
    </Shimmer>
  </section>

  <!-- Stats Section -->
  <section class="dashboard-section">
    <Shimmer loading={loadingStats}>
      <div class="stats-grid">
        {#each stats || statsTemplate as stat}
          <div class="stat-card">
            <p class="stat-label">{stat.label}</p>
            <h3 class="stat-value">{stat.value}</h3>
            <span class={`stat-change ${stat.trend}`}>
              {stat.trend === 'up' ? '↑' : '↓'}
              {stat.change}
            </span>
          </div>
        {/each}
      </div>
    </Shimmer>
  </section>

  <!-- Async Loading Demo (Svelte equivalent of Suspense) -->
  <section class="dashboard-section suspense-section">
    <div class="suspense-label">⚡ Async Component Loading Demo</div>
    <Shimmer
      loading={loadingNotifications}
    >
      <div class="notifications-panel">
        <h3 class="section-title">🔔 Notifications (Async Demo)</h3>
        <div class="notifications-list">
          {#each notifications || notificationsTemplate as notif}
            <div class={`notification-item ${notif.type}`}>
              <div class="notification-header">
                <span class="notification-title">{notif.title}</span>
                <span class="notification-time">{notif.time}</span>
              </div>
              <p class="notification-message">{notif.message}</p>
            </div>
          {/each}
        </div>
      </div>
    </Shimmer>
  </section>

  <!-- Orders Table Section -->
  <section class="dashboard-section">
    <Shimmer loading={loadingOrders}>
      <div class="orders-table-container">
        <h3 class="section-title">Recent Orders</h3>
        <table
          class="orders-table"
          style="width: 100%; border-collapse: collapse; table-layout: fixed;"
        >
          <thead>
            <tr style="border-bottom: 1px solid #eee; text-align: left;">
              <th style="padding: 12px 16px; width: 25%;">Customer</th>
              <th style="padding: 12px 16px; width: 40%;">Product</th>
              <th style="padding: 12px 16px; width: 20%;">Amount</th>
              <th style="padding: 12px 16px; width: 15%;">Status</th>
            </tr>
          </thead>
          <tbody>
            {#each orders || ordersTemplate as order}
              <tr style="border-bottom: 1px solid #f9f9f9;">
                <td style="padding: 12px 16px; font-weight: 500;">{order.customer}</td>
                <td style="padding: 12px 16px; color: #666;">{order.product}</td>
                <td style="padding: 12px 16px; font-weight: 600;">{order.amount}</td>
                <td style="padding: 12px 16px;">
                  <span
                    style="
                      display: inline-block;
                      padding: 4px 8px;
                      border-radius: 12px;
                      font-size: 0.85em;
                      background: {order.status === 'Delivered'
                      ? '#dcfce7'
                      : order.status === 'Processing'
                        ? '#dbeafe'
                        : '#fee2e2'};
                      color: {order.status === 'Delivered'
                      ? '#166534'
                      : order.status === 'Processing'
                        ? '#1e40af'
                        : '#991b1b'};
                    "
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Shimmer>
  </section>

  <!-- Revenue Chart Section -->
  <section class="dashboard-section">
    <Shimmer loading={loadingChart}>
      <div class="revenue-chart">
        <h3 class="section-title">Weekly Revenue</h3>
        <div class="chart-container" style="height: 250px; width: 100%; position: relative;">
          {#if chartData || chartTemplate}
            {@const data = chartData || chartTemplate}
            {@const maxRevenue = Math.max(...data.map((d) => d.revenue))}
            {@const maxOrders = Math.max(...data.map((d) => d.orders))}

            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#14b8a6" stop-opacity="0.3" />
                  <stop offset="95%" stop-color="#14b8a6" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop-color="#06b6d4" stop-opacity="0.3" />
                  <stop offset="95%" stop-color="#06b6d4" stop-opacity="0" />
                </linearGradient>
              </defs>

              <!-- Grid lines -->
              {#each [0, 25, 50, 75, 100] as tick}
                <line
                  x1="0"
                  y1={tick}
                  x2="100"
                  y2={tick}
                  stroke="rgba(255,255,255,0.1)"
                  stroke-width="0.5"
                />
              {/each}

              <!-- Revenue Area -->
              <path
                d={`M0,100 ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${100 - (d.revenue / maxRevenue) * 90}`).join(' ')} L100,100 Z`}
                fill="url(#colorRevenue)"
                stroke="none"
              />
              <path
                d={`M0,${100 - (data[0].revenue / maxRevenue) * 90} ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${100 - (d.revenue / maxRevenue) * 90}`).join(' ')}`}
                fill="none"
                stroke="#14b8a6"
                stroke-width="1"
              />

              <!-- Orders Area (Normalizing to same height for visualization) -->
              <path
                d={`M0,100 ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${100 - (d.orders / maxOrders) * 70}`).join(' ')} L100,100 Z`}
                fill="url(#colorOrders)"
                stroke="none"
              />
              <path
                d={`M0,${100 - (data[0].orders / maxOrders) * 70} ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${100 - (d.orders / maxOrders) * 70}`).join(' ')}`}
                fill="none"
                stroke="#06b6d4"
                stroke-width="1"
              />
            </svg>

            <!-- X Axis Labels -->
            <div
              style="display: flex; justify-content: space-between; margin-top: 5px; color: rgba(255,255,255,0.5); font-size: 12px;"
            >
              {#each data as point}
                <span>{point.name}</span>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </Shimmer>
  </section>

  <!-- Main Content Grid -->
  <div class="content-grid">
    <!-- Transactions -->
    <section class="dashboard-section">
      <Shimmer loading={loadingTransactions}>
        <div class="transactions-list">
          <h3 class="section-title">Recent Transactions</h3>
          <div class="transactions">
            {#each transactions || transactionsTemplate as tx}
              <div class="transaction-item">
                <div class="tx-info">
                  <p class="tx-description">{tx.description}</p>
                  <span class="tx-date">{tx.date}</span>
                </div>
                <div class="tx-right">
                  <span class="tx-amount">{tx.amount}</span>
                  <span class={`tx-status ${tx.status}`}>{tx.status}</span>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </Shimmer>
    </section>

    <!-- Right Sidebar -->
    <div class="sidebar">
      <!-- Activity Feed -->
      <section class="dashboard-section">
        <Shimmer loading={loadingActivity}>
          <div class="activity-feed">
            <h3 class="section-title">Recent Activity</h3>
            <div class="activities">
              {#each activity || activityTemplate as act}
                <div class="activity-item">
                  <div class="activity-dot"></div>
                  <div class="activity-content">
                    <p>
                      <strong>{act.user}</strong>
                      {act.action}{' '}
                      <span class="activity-target">{act.target}</span>
                    </p>
                    <span class="activity-time">{act.time}</span>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </Shimmer>
      </section>

      <!-- Team Members -->
      <section class="dashboard-section">
        <Shimmer loading={loadingTeam}>
          <div class="team-members">
            <h3 class="section-title">Team</h3>
            <div class="members-grid">
              {#each team || teamTemplate as member}
                <div class="member-card">
                  <img src={member.avatar} alt={member.name} class="member-avatar" />
                  <p class="member-name">{member.name}</p>
                  <span class="member-role">{member.role}</span>
                </div>
              {/each}
            </div>
          </div>
        </Shimmer>
      </section>
    </div>
  </div>

  <!-- Context API Example -->
  <section class="dashboard-section context-section" style="margin-top: 2rem;">
    <h3 class="section-title">🎨 Context API Example (Custom Theme)</h3>
    <p style="margin-bottom: 1rem; color: #888;">
      This section uses <code>setShimmerConfig</code> during initialization to apply a global blue theme
      below.
    </p>

    <ContextExample {loadingContextExample} {contextData} {teamTemplate} />
  </section>

  <!-- Footer -->
  <footer class="dashboard-footer">
    <p>
      Each section loads independently with its own shimmer effect.
      <br />
      Mock data is used to generate the skeleton structure.
    </p>
  </footer>
</div>

<style>
  /* Component styles inherit from main.css */
</style>
