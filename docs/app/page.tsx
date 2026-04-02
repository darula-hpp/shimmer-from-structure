import { getLatestRelease } from '../lib/changelog';
import { HomeContent } from './components/HomeContent';

// Revalidate every hour
export const revalidate = 3600;

export default async function Home() {
  const latestRelease = await getLatestRelease();

  return <HomeContent latestRelease={latestRelease} />;
}
