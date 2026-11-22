import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GroupTabs } from 'betshare-group-tabs';
import scenes from './betshare-scenes.json';

const names = ['Alex', 'Jordan', 'Sam'];
const group = {
  id: 'film-room',
  name: 'Sunday Film Room',
  created_by: 'Alex',
  invite_code: 'FILMROOM',
  created_at: '2026-04-12T12:00:00Z',
};
const members = names.map((name) => ({
  group_id: group.id,
  user_id: name,
  email: `${name.toLowerCase()}@example.com`,
  role: name === 'Alex' ? 'owner' : 'member',
  joined_at: group.created_at,
}));
const leaderboard = [
  { name: 'Alex', wins: 6, losses: 3, staked: 320, profit: 102.4 },
  { name: 'Jordan', wins: 4, losses: 2, staked: 160, profit: 80 },
  { name: 'Sam', wins: 3, losses: 4, staked: 210, profit: -28.35 },
].map(({ name, wins, losses, staked, profit }) => ({
  user_id: name,
  display_name: name,
  total_bets: wins + losses,
  settled_bets: wins + losses,
  wins,
  losses,
  pushes: 0,
  total_staked: staked,
  profit,
  roi: 100 * profit / staked,
  winRate: 100 * wins / (wins + losses),
  qualified: true,
}));
const feed = [
  {
    id: 'pick-1',
    user_id: 'Jordan',
    email: 'jordan',
    event_desc: 'Dallas vs. Phoenix',
    pick: 'Dallas moneyline',
    bet_type: 'moneyline',
    odds: 120,
    stake: 25,
    result: 'win',
    payout: 55,
    game_date: '2026-04-19',
    created_at: '2026-04-19T21:00:00Z',
    reactions: [{ emoji: '🔥', user_ids: ['Alex', 'Sam'] }, { emoji: '👏', user_ids: ['Sam'] }],
  },
  {
    id: 'pick-2',
    user_id: 'Alex',
    email: 'alex',
    event_desc: 'Boston vs. New York',
    pick: 'Under 214.5',
    bet_type: 'total',
    odds: -110,
    stake: 20,
    result: 'pending',
    payout: null,
    game_date: '2026-04-19',
    created_at: '2026-04-19T20:00:00Z',
    reactions: [{ emoji: '👀', user_ids: ['Jordan'] }],
  },
];

function Demo() {
  const id = new URLSearchParams(location.search).get('scene') ?? 'profit';
  const scene = scenes[id];

  useEffect(() => {
    if (id === 'roi') {
      document.querySelector('thead th:last-child button')?.click();
    }
  }, [id]);

  return (
    <>
      <header className="demo-header">
        <img alt="BetShare" src="/logo.png" width="150" />
        <span>GROUPS DEMO · SAMPLE DATA</span>
      </header>
      <main className="demo-main">
        <h1>{group.name}</h1>
        <p className="demo-members">{members.length} members</p>
        <GroupTabs
          activeTab={scene.tab}
          groupId={group.id}
          group={group}
          members={members}
          feed={feed}
          leaderboard={leaderboard}
          weeklyWinCounts={{ Jordan: 1 }}
          weeklyWinners={[]}
          currentUserId="Alex"
          isOwner
        />
      </main>
      <footer>{scene.title}</footer>
    </>
  );
}

createRoot(document.querySelector('#root')).render(<Demo />);
