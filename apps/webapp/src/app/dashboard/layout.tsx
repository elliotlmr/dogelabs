'use client';

import { useAuth } from '@/utils/AuthProvider';
import styles from './layout.module.scss';
import Profile from './components/Profile';
import Friendlist from './components/Friendlist';
import Info from '@/assets/vectors/info.svg';
import Kpis from './components/Kpis';
import Button from '@/components/Button';
import Logout from '@/assets/vectors/logout.svg';
import Admin from '@/assets/vectors/admin.svg';
import { useRouter } from 'next/navigation';
import { useFriends } from '@/utils/FriendsProvider';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { resetProvider } = useFriends();

  const handleLogout = async () => {
    await logout().then(() => {
      resetProvider();
      router.push('/login');
    });
  };

  const handleAdmin = () => {
    router.push('/admin');
  };

  return (
    <div>
      <aside className={styles.navigation}>
        <div className={styles.header}>
          <img src='/doge.png' alt='Doge !' />
          <p className={styles.title}>DOGESCORD</p>
        </div>
        <Friendlist />
        {user && <Profile user={user} />}
        {user?.role === 'admin' && (
          <Button
            color='outlined-grey'
            onClick={handleAdmin}
            fullWidth
            custom={{ margin: '0 0 8px' }}
          >
            <p>Backoffice</p>
            <Admin />
          </Button>
        )}
        <Button color='outlined-grey' onClick={handleLogout} fullWidth>
          <p>Logout</p>
          <Logout />
        </Button>
      </aside>
      <main className={styles.wrapper}>
        <div className={styles.container}>{children}</div>
      </main>
      <aside className={styles.kpis}>
        <div className={styles.header}>
          <Info />
          <p className={styles.title}>nformations</p>
        </div>
        <Kpis />
      </aside>
    </div>
  );
};

export default DashboardLayout;
