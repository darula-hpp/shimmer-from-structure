'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { Shimmer } from '@shimmer-from-structure/react';

interface DownloadData {
  downloads: number;
  day: string;
}

interface PackageStats {
  package: string;
  total: number;
  downloads: DownloadData[];
}

const PACKAGES = [
  '@shimmer-from-structure/react',
  '@shimmer-from-structure/vue',
  '@shimmer-from-structure/svelte',
  '@shimmer-from-structure/angular',
  '@shimmer-from-structure/solid',
  '@shimmer-from-structure/core',
  'shimmer-from-structure',
];

// Template data for shimmer skeleton
const statsTemplate: PackageStats[] = PACKAGES.map((pkg) => ({
  package: pkg,
  total: 900000,
  downloads: [],
}));

async function fetchPackageDownloads(packageName: string): Promise<PackageStats> {
  const startDate = '2026-01-19';
  const endDate = dayjs().format('YYYY-MM-DD');
  const url = `https://api.npmjs.org/downloads/range/${startDate}:${endDate}/${packageName}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    const total =
      data.downloads?.reduce((sum: number, day: DownloadData) => sum + day.downloads, 0) || 0;

    return {
      package: packageName,
      total,
      downloads: data.downloads || [],
    };
  } catch (error) {
    console.warn(`Failed to fetch downloads for ${packageName}:`, error);
    // Return fallback data on error
    return {
      package: packageName,
      total: 0,
      downloads: [],
    };
  }
}

// Separate component that receives stats as props
const StatsContent = ({ stats }: { stats: PackageStats[] }) => {
  const totalDownloads = stats.reduce((sum, pkg) => sum + pkg.total, 0);

  // Prepare chart data - bar chart with total downloads per package
  const chartData = stats.map((pkg) => ({
    name: pkg.package
      .replace('@shimmer-from-structure/', '')
      .replace('shimmer-from-structure', 'main'),
    downloads: pkg.total,
  }));

  // Prepare pie chart data - exclude core package
  const pieData = stats
    .filter((pkg) => !pkg.package.includes('/core'))
    .map((pkg) => ({
      name: pkg.package
        .replace('@shimmer-from-structure/', '')
        .replace('shimmer-from-structure', 'main'),
      value: pkg.total,
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3
          className="text-2xl font-bold mb-2 w-fit mx-auto text-gray-900 dark:text-white"
          data-shimmer-ignore
        >
          NPM Downloads
        </h3>
        <p className="text-4xl font-bold text-gray-900 dark:text-white w-fit mx-auto">
          {totalDownloads.toLocaleString()}
        </p>
        <p
          className="text-sm text-gray-600 dark:text-gray-400 mt-1 w-fit mx-auto"
          data-shimmer-ignore
        >
          Total downloads since January 2026
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((pkg) => (
          <div
            key={pkg.package}
            className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
          >
            <div
              className="text-xs text-gray-600 dark:text-gray-400 mb-1 w-fit mx-auto"
              data-shimmer-ignore
            >
              {pkg.package
                .replace('@shimmer-from-structure/', '')
                .replace('shimmer-from-structure', 'main')}
            </div>
            <div className="text-xl font-bold w-fit mx-auto">{pkg.total.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
          <h4
            className="text-center font-semibold mb-4 w-fit mx-auto text-gray-900 dark:text-white"
            data-shimmer-ignore
          >
            Total Downloads by Package
          </h4>
          <div className="w-full h-[calc(100%-2rem)] min-h-[320px]" data-shimmer-no-children>
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) =>
                    typeof value === 'number' ? value.toLocaleString() : value
                  }
                />
                <Bar dataKey="downloads" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
          <h4
            className="text-center font-semibold mb-4 w-fit mx-auto text-gray-900 dark:text-white"
            data-shimmer-ignore
          >
            Framework Distribution (excluding core)
          </h4>
          <div className="w-full h-[calc(100%-2rem)] min-h-[320px]" data-shimmer-no-children>
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) =>
                    typeof value === 'number' ? value.toLocaleString() : value
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export function NpmDownloadStats({ showShimmerDemo }: { showShimmerDemo?: boolean }) {
  const [stats, setStats] = useState<PackageStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const results = await Promise.all(PACKAGES.map((pkg) => fetchPackageDownloads(pkg)));
        setStats(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load download stats');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (error) {
    return <div className="w-full p-8 text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <Shimmer loading={loading || showShimmerDemo || false} templateProps={{ stats: statsTemplate }}>
      <StatsContent stats={stats.length > 0 ? stats : statsTemplate} />
    </Shimmer>
  );
}
