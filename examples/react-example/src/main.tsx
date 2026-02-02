/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Shimmer, ShimmerProvider } from 'shimmer-from-structure';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './main.css';

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

// =============================================================================
// TEMPLATE DATA (Mock data for shimmer skeletons)
// =============================================================================

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

const transactionsTemplate: Transaction[] = [
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

const activityTemplate: ActivityItem[] = [
  { id: '1', user: 'Loading...', action: 'performed', target: 'an action', time: '0m ago' },
  { id: '2', user: 'Loading...', action: 'performed', target: 'an action', time: '0m ago' },
  { id: '3', user: 'Loading...', action: 'performed', target: 'an action', time: '0m ago' },
];

const teamTemplate: TeamMember[] = [
  { id: '1', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  { id: '2', name: 'Loading...', role: 'Lead Developer', avatar: 'https://via.placeholder.com/40' },
  { id: '3', name: 'Loading...', role: 'Role', avatar: 'https://via.placeholder.com/40' },
  {
    id: '4',
    name: 'Loading...',
    role: 'Backend Developer',
    avatar: 'https://via.placeholder.com/40',
  },
];

const ordersTemplate: Order[] = [
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

const chartTemplate: ChartDataPoint[] = [
  { name: 'Mon', revenue: 3000, orders: 30 },
  { name: 'Tue', revenue: 4500, orders: 45 },
  { name: 'Wed', revenue: 3800, orders: 38 },
  { name: 'Thu', revenue: 5200, orders: 52 },
  { name: 'Fri', revenue: 6100, orders: 61 },
  { name: 'Sat', revenue: 7000, orders: 70 },
  { name: 'Sun', revenue: 5500, orders: 55 },
];

// =============================================================================
// REAL DATA (Simulated API responses)
// =============================================================================

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
  { id: '4', description: 'Support Add-on', amount: '$49.00', date: 'Jan 17', status: 'completed' },
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
  { id: '1', name: 'Mike Chen', role: 'Lead Developer', avatar: 'https://i.pravatar.cc/40?img=11' },
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

// =============================================================================
// COMPONENTS
// =============================================================================

// User Profile Header
const UserProfile = ({ user }: { user: User }) => (
  <div className="user-profile">
    <img src={user.avatar} alt={user.name} className="user-avatar" />
    <div className="user-info">
      <h2>{user.name}</h2>
      <p className="user-email">{user.email}</p>
      <span className={`user-status ${user.status}`}>{user.role}</span>
    </div>
    <div className={`status-indicator ${user.status}`}>
      <span className="status-dot"></span>
      {user.status}
    </div>
  </div>
);

// Stats Cards Grid
const StatsGrid = ({ stats }: { stats: StatCard[] }) => (
  <div className="stats-grid">
    {stats.map((stat, index) => (
      <div key={index} className="stat-card">
        <p className="stat-label">{stat.label}</p>
        <h3 className="stat-value">{stat.value}</h3>
        <span className={`stat-change ${stat.trend}`}>
          {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
        </span>
      </div>
    ))}
  </div>
);

// Transactions List
const TransactionsList = ({ transactions }: { transactions: Transaction[] }) => (
  <div className="transactions-list">
    <h3 className="section-title">Recent Transactions</h3>
    <div className="transactions">
      {transactions.map((tx) => (
        <div key={tx.id} className="transaction-item">
          <div className="tx-info">
            <p className="tx-description">{tx.description}</p>
            <span className="tx-date">{tx.date}</span>
          </div>
          <div className="tx-right">
            <span className="tx-amount">{tx.amount}</span>
            <span className={`tx-status ${tx.status}`}>{tx.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Revenue Chart
const RevenueChart = ({ data }: { data: ChartDataPoint[] }) => (
  <div className="revenue-chart">
    <h3 className="section-title">Weekly Revenue</h3>
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(26, 26, 46, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#14b8a6"
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#06b6d4"
            fillOpacity={1}
            fill="url(#colorOrders)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Activity Feed
const ActivityFeed = ({ activities }: { activities: ActivityItem[] }) => (
  <div className="activity-feed">
    <h3 className="section-title">Recent Activity</h3>
    <div className="activities">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-dot"></div>
          <div className="activity-content">
            <p>
              <strong>{activity.user}</strong> {activity.action}{' '}
              <span className="activity-target">{activity.target}</span>
            </p>
            <span className="activity-time">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Team Members
const TeamMembers = ({ members }: { members: TeamMember[] }) => (
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

// Orders Table
const OrdersTable = ({ orders }: { orders: Order[] }) => (
  <div className="orders-table-container">
    <h3 className="section-title">Recent Orders</h3>
    <table
      className="orders-table"
      style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}
    >
      <thead>
        <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
          <th style={{ padding: '12px 16px', width: '25%' }}>Customer</th>
          <th style={{ padding: '12px 16px', width: '40%' }}>Product</th>
          <th style={{ padding: '12px 16px', width: '20%' }}>Amount</th>
          <th style={{ padding: '12px 16px', width: '15%' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
            <td style={{ padding: '12px 16px', fontWeight: 500 }}>{order.customer}</td>
            <td style={{ padding: '12px 16px', color: '#666' }}>{order.product}</td>
            <td style={{ padding: '12px 16px', fontWeight: 600 }}>{order.amount}</td>
            <td style={{ padding: '12px 16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.85em',
                  background:
                    order.status === 'Delivered'
                      ? '#dcfce7'
                      : order.status === 'Processing'
                        ? '#dbeafe'
                        : '#fee2e2',
                  color:
                    order.status === 'Delivered'
                      ? '#166534'
                      : order.status === 'Processing'
                        ? '#1e40af'
                        : '#991b1b',
                }}
              >
                {order.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
// SUSPENSE EXAMPLE - Lazy-loaded Notifications Component
// =============================================================================

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
}

// Template for shimmer skeleton
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

// The actual Notifications component
const NotificationsPanel = ({ notifications }: { notifications: Notification[] }) => (
  <div className="notifications-panel">
    <h3 className="section-title">🔔 Notifications (Suspense Demo)</h3>
    <div className="notifications-list">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification-item ${notif.type}`}>
          <div className="notification-header">
            <span className="notification-title">{notif.title}</span>
            <span className="notification-time">{notif.time}</span>
          </div>
          <p className="notification-message">{notif.message}</p>
        </div>
      ))}
    </div>
  </div>
);

// Simulate a lazy-loaded component (as if it was code-split)
// In real usage, this would be: const LazyNotifications = lazy(() => import('./Notifications'));
const LazyNotificationsPanel = lazy(
  () =>
    new Promise<{ default: typeof NotificationsPanel }>((resolve) => {
      // Simulate network delay for code-splitting
      setTimeout(() => {
        resolve({ default: NotificationsPanel });
      }, 3000);
    })
);

// Memoized Shimmer fallback for better performance
const NotificationsShimmerFallback = React.memo(() => (
  <Shimmer loading={true} templateProps={{ notifications: notificationsTemplate }}>
    <NotificationsPanel notifications={notificationsTemplate} />
  </Shimmer>
));

// Real notifications data (loaded after component mounts)
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

// =============================================================================
// MAIN APP
// =============================================================================

function App() {
  // Independent loading states for each section
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Data states
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [activity, setActivity] = useState<ActivityItem[] | null>(null);
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null);
  const [loadingChart, setLoadingChart] = useState(true);

  // Context Example State
  const [loadingContextExample, setLoadingContextExample] = useState(true);
  const [contextData, setContextData] = useState<TeamMember[] | null>(null);

  // Simulate independent API calls with different response times
  // TEMPORARILY INCREASED FOR TESTING RESIZE OBSERVER
  useEffect(() => {
    // User loads first (fast)
    setTimeout(() => {
      setUser(realUser);
      setLoadingUser(false);
    }, 8000); // was 800ms

    // Stats load second
    setTimeout(() => {
      setStats(realStats);
      setLoadingStats(false);
    }, 12000); // was 1200ms

    // Chart loads third
    setTimeout(() => {
      setChartData(realChartData);
      setLoadingChart(false);
    }, 14000); // was 1400ms

    // Team loads fourth
    setTimeout(() => {
      setTeam(realTeam);
      setLoadingTeam(false);
    }, 16000); // was 1600ms

    // Activity loads fifth
    setTimeout(() => {
      setActivity(realActivity);
      setLoadingActivity(false);
    }, 20000); // was 2000ms

    // Transactions load last (slowest API)
    setTimeout(() => {
      setTransactions(realTransactions);
      setLoadingTransactions(false);
    }, 25000); // was 2500ms

    // Orders load independently
    setTimeout(() => {
      setOrders(realOrders);
      setLoadingOrders(false);
    }, 18000); // was 1800ms

    // Context Example loads extra slow (to show off the theme)
    setTimeout(() => {
      setContextData(realTeam.slice(0, 2)); // Use subset of team data
      setLoadingContextExample(false);
    }, 40000); // was 4000ms
  }, []);

  // Reset all data
  const handleReload = () => {
    setLoadingUser(true);
    setLoadingStats(true);
    setLoadingChart(true);
    setLoadingTransactions(true);
    setLoadingActivity(true);
    setLoadingTeam(true);
    setLoadingOrders(true);
    setLoadingContextExample(true); // Reset context example
    setUser(null);
    setStats(null);
    setChartData(null);
    setTransactions(null);
    setOrders(null);
    setActivity(null);
    setTeam(null);
    setContextData(null); // Reset context data

    // Re-trigger the effect
    // TEMPORARILY INCREASED FOR TESTING RESIZE OBSERVER
    setTimeout(() => {
      setUser(realUser);
      setLoadingUser(false);
    }, 8000); // was 800ms

    setTimeout(() => {
      setStats(realStats);
      setLoadingStats(false);
    }, 12000); // was 1200ms

    setTimeout(() => {
      setChartData(realChartData);
      setLoadingChart(false);
    }, 14000); // was 1400ms

    setTimeout(() => {
      setTeam(realTeam);
      setLoadingTeam(false);
    }, 16000); // was 1600ms

    setTimeout(() => {
      setActivity(realActivity);
      setLoadingActivity(false);
    }, 20000); // was 2000ms

    setTimeout(() => {
      setTransactions(realTransactions);
      setLoadingTransactions(false);
    }, 25000); // was 2500ms

    setTimeout(() => {
      setOrders(realOrders);
      setLoadingOrders(false);
    }, 18000); // was 1800ms

    setTimeout(() => {
      setContextData(realTeam.slice(0, 2));
      setLoadingContextExample(false);
    }, 40000); // was 4000ms
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>✨ Shimmer From Structure</h1>
          <p>Real-world dashboard demo with independent loading states</p>
        </div>
        <button className="reload-btn" onClick={handleReload}>
          ↻ Reload Demo
        </button>
      </header>

      {/* User Profile Section */}
      <section className="dashboard-section">
        <Shimmer loading={loadingUser} templateProps={{ user: userTemplate }}>
          <UserProfile user={user || userTemplate} />
        </Shimmer>
      </section>

      {/* Stats Section */}
      <section className="dashboard-section">
        <Shimmer loading={loadingStats} templateProps={{ stats: statsTemplate }}>
          <StatsGrid stats={stats || statsTemplate} />
        </Shimmer>
      </section>

      {/* Suspense Example - Lazy-loaded Notifications */}
      <section className="dashboard-section suspense-section">
        <div className="suspense-label">⚡ React Suspense Example</div>
        <Suspense fallback={<NotificationsShimmerFallback />}>
          <LazyNotificationsPanel notifications={realNotifications} />
        </Suspense>
      </section>

      {/* Orders Table Section */}
      <section className="dashboard-section">
        <Shimmer loading={loadingOrders} templateProps={{ orders: ordersTemplate }}>
          <OrdersTable orders={orders || ordersTemplate} />
        </Shimmer>
      </section>

      {/* Revenue Chart Section */}
      <section className="dashboard-section">
        <Shimmer loading={loadingChart} templateProps={{ data: chartTemplate }}>
          <RevenueChart data={chartData || chartTemplate} />
        </Shimmer>
      </section>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Transactions */}
        <section className="dashboard-section">
          <Shimmer
            loading={loadingTransactions}
            templateProps={{ transactions: transactionsTemplate }}
          >
            <TransactionsList transactions={transactions || transactionsTemplate} />
          </Shimmer>
        </section>

        {/* Right Sidebar */}
        <div className="sidebar">
          {/* Activity Feed */}
          <section className="dashboard-section">
            <Shimmer loading={loadingActivity} templateProps={{ activities: activityTemplate }}>
              <ActivityFeed activities={activity || activityTemplate} />
            </Shimmer>
          </section>

          {/* Team Members */}
          <section className="dashboard-section">
            <Shimmer loading={loadingTeam} templateProps={{ members: teamTemplate }}>
              <TeamMembers members={team || teamTemplate} />
            </Shimmer>
          </section>
        </div>
      </div>

      {/* Context API Example */}
      <section className="dashboard-section context-section" style={{ marginTop: '2rem' }}>
        <h3 className="section-title">🎨 Context API Example (Custom Theme)</h3>
        <p style={{ marginBottom: '1rem', color: '#888' }}>
          This section uses <code>ShimmerProvider</code> to apply a global blue theme to all
          children.
        </p>

        <ShimmerProvider
          config={{
            shimmerColor: 'rgba(56, 189, 248, 0.4)',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            duration: 3,
            fallbackBorderRadius: 16,
          }}
        >
          <Shimmer
            loading={loadingContextExample}
            templateProps={{ members: teamTemplate.slice(0, 2) }}
          >
            <div className="members-grid">
              {(contextData || teamTemplate.slice(0, 2)).map((member) => (
                <div key={member.id} className="member-card">
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#333' }} />
                  <p className="member-name">{member.name}</p>
                  <span className="member-role">{member.role}</span>
                </div>
              ))}
            </div>
          </Shimmer>
        </ShimmerProvider>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          Each section loads independently with its own shimmer effect.
          <br />
          <code>templateProps</code> injects mock data to generate the skeleton structure.
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
