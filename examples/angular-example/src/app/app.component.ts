import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShimmerComponent } from '@shimmer-from-structure/angular';

// =============================================================================
// TYPES
// =============================================================================

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

interface ChartDataPoint {
  name: string;
  revenue: number;
  orders: number;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  isLive: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ShimmerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // Loading states
  loadingUser = signal(true);
  loadingStats = signal(true);
  loadingTransactions = signal(true);
  loadingActivity = signal(true);
  loadingTeam = signal(true);
  loadingOrders = signal(true);
  loadingChart = signal(true);
  loadingNotifications = signal(true);
  loadingContextExample = signal(true);
  loadingAttributesDemo = signal(true);

  // Data signals
  user = signal<User | null>(null);
  stats = signal<StatCard[] | null>(null);
  transactions = signal<Transaction[] | null>(null);
  orders = signal<Order[] | null>(null);
  activity = signal<ActivityItem[] | null>(null);
  team = signal<TeamMember[] | null>(null);
  chartData = signal<ChartDataPoint[] | null>(null);
  notifications = signal<Notification[] | null>(null);
  contextData = signal<TeamMember[] | null>(null);
  attributesDemoData = signal<MetricCard[] | null>(null);

  // Template data
  metricCardsTemplate: MetricCard[] = [
    { id: '1', title: 'API Requests', value: '0.0k/s', change: '+0.0%', trend: 'up', isLive: true },
    { id: '2', title: 'Error Rate', value: '0.00%', change: '-0.00%', trend: 'up', isLive: true },
    { id: '3', title: 'Uptime', value: '00.00%', change: '+0.00%', trend: 'up', isLive: false },
  ];

  realMetricCards: MetricCard[] = [
    {
      id: '1',
      title: 'API Requests',
      value: '12.4k/s',
      change: '+3.2%',
      trend: 'up',
      isLive: true,
    },
    { id: '2', title: 'Error Rate', value: '0.08%', change: '-0.01%', trend: 'up', isLive: true },
    { id: '3', title: 'Uptime', value: '99.98%', change: '+0.01%', trend: 'up', isLive: false },
  ];

  userTemplate: User = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Software Engineer',
    avatar: 'https://via.placeholder.com/64',
    status: 'offline',
  };

  statsTemplate: StatCard[] = [
    { label: 'Total Revenue', value: '$00,000', change: '+0.0%', trend: 'up' },
    { label: 'Active Users', value: '0,000', change: '+0.0%', trend: 'up' },
    { label: 'Conversion', value: '0.0%', change: '-0.0%', trend: 'down' },
    { label: 'Avg. Order', value: '$000', change: '+0.0%', trend: 'up' },
  ];

  transactionsTemplate: Transaction[] = [
    {
      id: '1',
      description: 'Loading transaction...',
      amount: '$0.00',
      date: 'Jan 00',
      status: 'pending',
    },
    {
      id: '2',
      description: 'Loading transaction...',
      amount: '$0.00',
      date: 'Jan 00',
      status: 'pending',
    },
    {
      id: '3',
      description: 'Loading transaction...',
      amount: '$0.00',
      date: 'Jan 00',
      status: 'pending',
    },
    {
      id: '4',
      description: 'Loading transaction...',
      amount: '$0.00',
      date: 'Jan 00',
      status: 'pending',
    },
  ];

  activityTemplate: ActivityItem[] = [
    { id: '1', user: 'Loading...', action: 'performed', target: 'an action', time: '0m ago' },
    { id: '2', user: 'Loading...', action: 'performed', target: 'an action', time: '0m ago' },
    { id: '3', user: 'Loading...', action: 'performed', target: 'an action', time: '0m ago' },
  ];

  teamTemplate: TeamMember[] = [
    { id: '1', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
    {
      id: '2',
      name: 'Loading...',
      role: 'Lead Developer',
      avatar: 'https://via.placeholder.com/40',
    },
    { id: '3', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
    {
      id: '4',
      name: 'Loading...',
      role: 'Backend Developer',
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  ordersTemplate: Order[] = [
    {
      id: '1',
      customer: 'Loading Name...',
      product: 'Loading Product...',
      amount: '$000.00',
      status: 'Processing',
    },
    {
      id: '2',
      customer: 'Loading Name...',
      product: 'Loading Product...',
      amount: '$000.00',
      status: 'Processing',
    },
    {
      id: '3',
      customer: 'Loading Name...',
      product: 'Loading Product...',
      amount: '$000.00',
      status: 'Processing',
    },
    {
      id: '4',
      customer: 'Loading Name...',
      product: 'Loading Product...',
      amount: '$000.00',
      status: 'Processing',
    },
    {
      id: '5',
      customer: 'Loading Name...',
      product: 'Loading Product...',
      amount: '$000.00',
      status: 'Processing',
    },
  ];

  chartTemplate: ChartDataPoint[] = [
    { name: 'Mon', revenue: 3000, orders: 30 },
    { name: 'Tue', revenue: 4500, orders: 45 },
    { name: 'Wed', revenue: 3800, orders: 38 },
    { name: 'Thu', revenue: 5200, orders: 52 },
    { name: 'Fri', revenue: 6100, orders: 61 },
    { name: 'Sat', revenue: 7000, orders: 70 },
    { name: 'Sun', revenue: 5500, orders: 55 },
  ];

  notificationsTemplate: Notification[] = [
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

  // Real data
  realUser: User = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/64?img=5',
    status: 'online',
  };

  realStats: StatCard[] = [
    { label: 'Total Revenue', value: '$48,352', change: '+12.5%', trend: 'up' },
    { label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up' },
    { label: 'Conversion', value: '3.24%', change: '-0.4%', trend: 'down' },
    { label: 'Avg. Order', value: '$284', change: '+5.7%', trend: 'up' },
  ];

  realTransactions: Transaction[] = [
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

  realActivity: ActivityItem[] = [
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

  realTeam: TeamMember[] = [
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

  realOrders: Order[] = [
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
      product: 'Pro Plan (Monthly)',
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

  realChartData: ChartDataPoint[] = [
    { name: 'Mon', revenue: 4200, orders: 42 },
    { name: 'Tue', revenue: 5800, orders: 58 },
    { name: 'Wed', revenue: 4900, orders: 49 },
    { name: 'Thu', revenue: 7200, orders: 72 },
    { name: 'Fri', revenue: 8400, orders: 84 },
    { name: 'Sat', revenue: 9100, orders: 91 },
    { name: 'Sun', revenue: 6800, orders: 68 },
  ];

  realNotifications: Notification[] = [
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

  private timeouts: number[] = [];

  ngOnInit() {
    console.log('AppComponent ngOnInit called');
    console.log('Initial loading states:', {
      user: this.loadingUser(),
      stats: this.loadingStats(),
      transactions: this.loadingTransactions(),
    });
    this.loadData();
  }

  ngOnDestroy() {
    this.timeouts.forEach(clearTimeout);
  }

  loadData() {
    console.log('loadData() called - setting up timeouts');

    // User loads first (fast)
    this.timeouts.push(
      window.setTimeout(() => {
        console.log('User timeout fired - setting loading to false');
        this.user.set(this.realUser);
        this.loadingUser.set(false);
        console.log('loadingUser is now:', this.loadingUser());
      }, 4800)
    );

    // Stats load second
    this.timeouts.push(
      window.setTimeout(() => {
        this.stats.set(this.realStats);
        this.loadingStats.set(false);
      }, 8200)
    );

    // Chart loads third
    this.timeouts.push(
      window.setTimeout(() => {
        this.chartData.set(this.realChartData);
        this.loadingChart.set(false);
      }, 5400)
    );

    // Team loads fourth
    this.timeouts.push(
      window.setTimeout(() => {
        this.team.set(this.realTeam);
        this.loadingTeam.set(false);
      }, 4600)
    );

    // Activity loads fifth
    this.timeouts.push(
      window.setTimeout(() => {
        this.activity.set(this.realActivity);
        this.loadingActivity.set(false);
      }, 8000)
    );

    // Transactions load last
    this.timeouts.push(
      window.setTimeout(() => {
        this.transactions.set(this.realTransactions);
        this.loadingTransactions.set(false);
      }, 9500)
    );

    // Orders load independently
    this.timeouts.push(
      window.setTimeout(() => {
        this.orders.set(this.realOrders);
        this.loadingOrders.set(false);
      }, 7800)
    );

    // Notifications (delayed like lazy loading)
    this.timeouts.push(
      window.setTimeout(() => {
        this.notifications.set(this.realNotifications);
        this.loadingNotifications.set(false);
      }, 8000)
    );

    // Context Example loads extra slow
    this.timeouts.push(
      window.setTimeout(() => {
        this.contextData.set(this.realTeam.slice(0, 2));
        this.loadingContextExample.set(false);
      }, 9000)
    );

    // Attribute controls demo
    this.timeouts.push(
      window.setTimeout(() => {
        this.attributesDemoData.set(this.realMetricCards);
        this.loadingAttributesDemo.set(false);
      }, 6000)
    );
  }

  handleReload() {
    // Reset all states
    this.loadingUser.set(true);
    this.loadingStats.set(true);
    this.loadingChart.set(true);
    this.loadingTransactions.set(true);
    this.loadingActivity.set(true);
    this.loadingTeam.set(true);
    this.loadingOrders.set(true);
    this.loadingNotifications.set(true);
    this.loadingContextExample.set(true);
    this.loadingAttributesDemo.set(true);

    this.user.set(null);
    this.stats.set(null);
    this.chartData.set(null);
    this.transactions.set(null);
    this.orders.set(null);
    this.activity.set(null);
    this.team.set(null);
    this.notifications.set(null);
    this.contextData.set(null);
    this.attributesDemoData.set(null);

    // Clear existing timeouts
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    // Reload data
    this.loadData();
  }

  getChartHeight(data: ChartDataPoint[], maxHeight: number): number {
    const maxRevenue = Math.max(...data.map((d) => d.revenue));
    return maxHeight * (maxRevenue / 10000);
  }
}
