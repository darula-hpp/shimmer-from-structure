import { createSignal, createEffect, onCleanup, For, type Component } from 'solid-js';
import { Shimmer, ShimmerProvider } from '@shimmer-from-structure/solid';
import './App.css';

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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// =============================================================================
// TEMPLATE DATA (Mock data for shimmer skeletons)
// =============================================================================

const userTemplate: User = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Software Engineer',
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

// =============================================================================
// COMPONENTS
// =============================================================================

const UserProfile: Component<{ user: User }> = (props) => (
  <div class="user-profile">
    <img src={props.user.avatar} alt={props.user.name} class="user-avatar" />
    <div class="user-info">
      <h2>{props.user.name}</h2>
      <p class="user-email">{props.user.email}</p>
      <span class={`user-status ${props.user.status}`}>{props.user.role}</span>
    </div>
    <div class={`status-indicator ${props.user.status}`}>
      <span class="status-dot"></span>
      {props.user.status}
    </div>
  </div>
);

const StatsGrid: Component<{ stats: StatCard[] }> = (props) => (
  <div class="stats-grid">
    <For each={props.stats}>
      {(stat) => (
        <div class="stat-card">
          <p class="stat-label">{stat.label}</p>
          <h3 class="stat-value">{stat.value}</h3>
          <span class={`stat-change ${stat.trend}`}>
            {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
          </span>
        </div>
      )}
    </For>
  </div>
);

const TransactionsList: Component<{ transactions: Transaction[] }> = (props) => (
  <div class="transactions-list">
    <h3 class="section-title">Recent Transactions</h3>
    <div class="transactions">
      <For each={props.transactions}>
        {(tx) => (
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
        )}
      </For>
    </div>
  </div>
);

const TeamMembers: Component<{ members: TeamMember[] }> = (props) => (
  <div class="team-members">
    <h3 class="section-title">Team</h3>
    <div class="members-grid">
      <For each={props.members}>
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
);

// =============================================================================
// MAIN APP
// =============================================================================

const App: Component = () => {
  // Independent loading states for each section
  const [loadingUser, setLoadingUser] = createSignal(true);
  const [loadingStats, setLoadingStats] = createSignal(true);
  const [loadingTransactions, setLoadingTransactions] = createSignal(true);
  const [loadingTeam, setLoadingTeam] = createSignal(true);

  // Data states
  const [user, setUser] = createSignal<User | null>(null);
  const [stats, setStats] = createSignal<StatCard[] | null>(null);
  const [transactions, setTransactions] = createSignal<Transaction[] | null>(null);
  const [team, setTeam] = createSignal<TeamMember[] | null>(null);

  // Context Example State
  const [loadingContextExample, setLoadingContextExample] = createSignal(true);
  const [contextData, setContextData] = createSignal<TeamMember[] | null>(null);

  // Simulate independent API calls with different response times
  createEffect(() => {
    const userTimer = setTimeout(() => {
      setUser(realUser);
      setLoadingUser(false);
    }, 9800);

    const statsTimer = setTimeout(() => {
      setStats(realStats);
      setLoadingStats(false);
    }, 6200);

    const teamTimer = setTimeout(() => {
      setTeam(realTeam);
      setLoadingTeam(false);
    }, 9600);

    const transactionsTimer = setTimeout(() => {
      setTransactions(realTransactions);
      setLoadingTransactions(false);
    }, 2500);

    const contextTimer = setTimeout(() => {
      setContextData(realTeam.slice(0, 2));
      setLoadingContextExample(false);
    }, 4000);

    onCleanup(() => {
      clearTimeout(userTimer);
      clearTimeout(statsTimer);
      clearTimeout(teamTimer);
      clearTimeout(transactionsTimer);
      clearTimeout(contextTimer);
    });
  });

  // Reset all data
  const handleReload = () => {
    setLoadingUser(true);
    setLoadingStats(true);
    setLoadingTransactions(true);
    setLoadingTeam(true);
    setLoadingContextExample(true);
    setUser(null);
    setStats(null);
    setTransactions(null);
    setTeam(null);
    setContextData(null);

    setTimeout(() => {
      setUser(realUser);
      setLoadingUser(false);
    }, 800);
    setTimeout(() => {
      setStats(realStats);
      setLoadingStats(false);
    }, 1200);
    setTimeout(() => {
      setTeam(realTeam);
      setLoadingTeam(false);
    }, 1600);
    setTimeout(() => {
      setTransactions(realTransactions);
      setLoadingTransactions(false);
    }, 2500);
    setTimeout(() => {
      setContextData(realTeam.slice(0, 2));
      setLoadingContextExample(false);
    }, 4000);
  };

  return (
    <div class="dashboard">
      {/* Header */}
      <header class="dashboard-header">
        <div class="header-content">
          <h1>Shimmer From Structure - SolidJS</h1>
          <p>Real-world dashboard demo with independent loading states</p>
        </div>
        <button class="reload-btn" onClick={handleReload}>
          ↻ Reload Demo
        </button>
      </header>

      {/* User Profile Section */}
      <section class="dashboard-section">
        <Shimmer loading={loadingUser()}>
          <UserProfile user={user() || userTemplate} />
        </Shimmer>
      </section>

      {/* Stats Section */}
      <section class="dashboard-section">
        <Shimmer loading={loadingStats()}>
          <StatsGrid stats={stats() || statsTemplate} />
        </Shimmer>
      </section>

      {/* Main Content Grid */}
      <div class="content-grid">
        {/* Transactions */}
        <section class="dashboard-section">
          <Shimmer loading={loadingTransactions()}>
            <TransactionsList transactions={transactions() || transactionsTemplate} />
          </Shimmer>
        </section>

        {/* Sidebar */}
        <div class="sidebar">
          {/* Team Members */}
          <section class="dashboard-section">
            <Shimmer loading={loadingTeam()}>
              <TeamMembers members={team() || teamTemplate} />
            </Shimmer>
          </section>

          {/* Context Example - Custom Theme */}
          <section
            class="dashboard-section"
            style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '16px',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                padding: '2px 12px',
                'font-size': '0.75rem',
                'font-weight': '600',
                color: '#a78bfa',
                'border-radius': '4px',
                'text-transform': 'uppercase',
                'letter-spacing': '0.5px',
              }}
            >
              ⚡ Custom Theme Example
            </div>
            <ShimmerProvider
              config={{
                shimmerColor: 'rgba(139, 92, 246, 0.5)',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                duration: 2,
                fallbackBorderRadius: 8,
              }}
            >
              <Shimmer loading={loadingContextExample()}>
                <TeamMembers members={contextData() || teamTemplate.slice(0, 2)} />
              </Shimmer>
            </ShimmerProvider>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer class="dashboard-footer">
        <p>
          🎯 This demo showcases <code>@shimmer-from-structure/solid</code> adapter
          <br />
          Built with SolidJS primitives: createSignal, createEffect, Show, For, and Context API
        </p>
      </footer>
    </div>
  );
};

export default App;
