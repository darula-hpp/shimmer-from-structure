<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Shimmer, provideShimmerConfig } from '@shimmer-from-structure/vue';

// Set global config
provideShimmerConfig({
  shimmerColor: 'rgba(255, 255, 255, 0.15)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  duration: 2,
  fallbackBorderRadius: 8,
});

const loading = ref(true);
const loadingTeam = ref(true);
const loadingOrders = ref(true);
const loadingAttributesDemo = ref(true);

const toggleLoading = () => {
  loading.value = !loading.value;
  loadingTeam.value = loading.value;
  loadingOrders.value = loading.value;
  if (loading.value) {
    loadingAttributesDemo.value = true;
    setTimeout(() => {
      loadingAttributesDemo.value = false;
    }, 6000);
  } else {
    loadingAttributesDemo.value = false;
  }
};

// Mock data
const user = {
  name: 'Alex Morgan',
  role: 'Senior Developer',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  status: 'online',
  email: 'alex.morgan@example.com',
};

const userTemplate = {
  name: 'Loading Name...',
  role: 'Loading Role...',
  avatar: '',
  status: 'offline',
  email: 'loading.email@example.com',
};

const stats = [
  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
  { label: 'Active Users', value: '2,338', change: '-4.5%', trend: 'down' },
  { label: 'New Signups', value: '+563', change: '+12.5%', trend: 'up' },
  { label: 'Avg. Session', value: '4m 32s', change: '+2.4%', trend: 'up' },
];

const team = [
  { name: 'Sarah Wilson', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?u=1' },
  { name: 'James Rod', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Emily Chen', role: 'Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Michael Fox', role: 'Backend Dev', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const teamTemplate = Array(4).fill({
  name: 'Loading...',
  role: 'Role...',
  avatar: '',
});

const orders = [
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

const ordersTemplate = Array(5).fill({
  id: '1',
  customer: 'Loading Name...',
  product: 'Loading Product...',
  amount: '$000.00',
  status: 'Processing',
});

function getStatusColor(status: string) {
  if (status === 'Delivered') return { bg: '#dcfce7', text: '#166534' };
  if (status === 'Processing') return { bg: '#dbeafe', text: '#1e40af' };
  return { bg: '#fee2e2', text: '#991b1b' };
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  isLive: boolean;
}

const metricCardsTemplate: MetricCard[] = [
  { id: '1', title: 'API Requests', value: '0.0k/s', change: '+0.0%', trend: 'up', isLive: true },
  { id: '2', title: 'Error Rate', value: '0.00%', change: '-0.00%', trend: 'up', isLive: true },
  { id: '3', title: 'Uptime', value: '00.00%', change: '+0.00%', trend: 'up', isLive: false },
];

const realMetricCards: MetricCard[] = [
  { id: '1', title: 'API Requests', value: '12.4k/s', change: '+3.2%', trend: 'up', isLive: true },
  { id: '2', title: 'Error Rate', value: '0.08%', change: '-0.01%', trend: 'up', isLive: true },
  { id: '3', title: 'Uptime', value: '99.98%', change: '+0.01%', trend: 'up', isLive: false },
];

const attributesDemoData = ref<MetricCard[] | null>(null);

onMounted(() => {
  setTimeout(() => {
    attributesDemoData.value = realMetricCards;
    loadingAttributesDemo.value = false;
  }, 6000);
});
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-content">
        <h1>Dashboard Output</h1>
        <p>Vue 3 Adapter Usage Example</p>
      </div>
      <button class="reload-btn" @click="toggleLoading">
        {{ loading ? 'Stop Loading' : 'Reload Data' }}
      </button>
    </header>

    <div class="content-grid">
      <main>
        <!-- Stats Section -->
        <section class="dashboard-section">
          <h3 class="section-title">Overview</h3>
          <Shimmer :loading="loading" :template-props="{ stats }">
            <div class="stats-grid">
              <div v-for="(stat, index) in stats" :key="index" class="stat-card">
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-change" :class="stat.trend">{{ stat.change }} from last month</div>
              </div>
            </div>
          </Shimmer>
        </section>

        <!-- Orders Table Section -->
        <section class="dashboard-section">
          <h3 class="section-title">Recent Orders</h3>
          <Shimmer :loading="loadingOrders" :template-props="{ orders: ordersTemplate }">
            <div class="orders-table-container">
              <table
                class="orders-table"
                style="width: 100%; border-collapse: collapse; table-layout: fixed"
              >
                <thead>
                  <tr style="border-bottom: 1px solid #eee; text-align: left">
                    <th style="padding: 12px 16px; width: 25%">Customer</th>
                    <th style="padding: 12px 16px; width: 40%">Product</th>
                    <th style="padding: 12px 16px; width: 20%">Amount</th>
                    <th style="padding: 12px 16px; width: 15%">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="order in orders"
                    :key="order.id"
                    style="border-bottom: 1px solid #f9f9f9"
                  >
                    <td style="padding: 12px 16px; font-weight: 500">{{ order.customer }}</td>
                    <td style="padding: 12px 16px; color: #666">{{ order.product }}</td>
                    <td style="padding: 12px 16px; font-weight: 600">{{ order.amount }}</td>
                    <td style="padding: 12px 16px">
                      <span
                        :style="{
                          display: 'inline-block',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.85em',
                          background: getStatusColor(order.status).bg,
                          color: getStatusColor(order.status).text,
                        }"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Shimmer>
        </section>

        <!-- Activity Feed (Simulated) -->
        <section class="dashboard-section">
          <h3 class="section-title">Recent Activity</h3>
          <Shimmer :loading="loading">
            <div class="activities">
              <div v-for="i in 3" :key="i" class="activity-item">
                <div class="activity-dot"></div>
                <div class="activity-content">
                  <p>
                    <strong>New purchase</strong> verified by
                    <span class="activity-target">Order #{{ 1000 + i }}</span>
                  </p>
                  <span class="activity-time">{{ i * 15 }} minutes ago</span>
                </div>
              </div>
            </div>
          </Shimmer>
        </section>
      </main>

      <aside class="sidebar">
        <!-- User Profile -->
        <section class="dashboard-section">
          <h3 class="section-title">User Profile</h3>
          <Shimmer :loading="loading" :template-props="{ user: userTemplate }">
            <div class="user-profile">
              <img :src="user.avatar || '/placeholder.png'" class="user-avatar" />
              <div class="user-info">
                <h2>{{ user.name }}</h2>
                <div class="user-email">{{ user.email }}</div>
                <div class="user-status">{{ user.status }}</div>
              </div>
            </div>
          </Shimmer>
        </section>

        <!-- Team Members -->
        <section class="dashboard-section">
          <h3 class="section-title">Team Members</h3>
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
        </section>
      </aside>
    </div>

    <!-- HTML Attribute Controls Demo -->
    <section class="dashboard-section" style="margin-top: 2rem">
      <h3 class="section-title">🎛️ HTML Attribute Controls</h3>
      <p class="attributes-demo-description">
        Use <code>data-shimmer-ignore</code> to exclude an element and its children entirely. Use
        <code>data-shimmer-no-children</code> to capture an element as a single shimmer block.
      </p>
      <Shimmer :loading="loadingAttributesDemo" :template-props="{ cards: metricCardsTemplate }">
        <div class="attributes-demo-grid">
          <div
            v-for="(card, i) in attributesDemoData || metricCardsTemplate"
            :key="card.id"
            class="attr-card"
          >
            <div class="attr-card-header">
              <span class="attr-card-title">{{ card.title }}</span>
              <!-- data-shimmer-ignore: badge is excluded from shimmer entirely -->
              <span v-if="card.isLive" class="live-badge" data-shimmer-ignore="">● LIVE</span>
            </div>

            <!-- data-shimmer-no-children (card 2 only): whole block is one shimmer rect -->
            <div
              class="attr-card-metric"
              v-bind="i === 1 ? { 'data-shimmer-no-children': '' } : {}"
            >
              <span class="attr-metric-value">{{ card.value }}</span>
              <span class="attr-metric-change" :class="card.trend">
                {{ card.trend === 'up' ? '↑' : '↓' }} {{ card.change }}
              </span>
            </div>

            <p class="attr-card-note">
              <template v-if="i === 0">"LIVE" badge skipped via data-shimmer-ignore</template>
              <template v-else-if="i === 1"
                >Metric block is one shimmer via data-shimmer-no-children</template
              >
              <template v-else>Normal shimmer (no attributes)</template>
            </p>
          </div>
        </div>
      </Shimmer>
    </section>
  </div>
</template>
