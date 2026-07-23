import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { NotificationBanner } from '../context/NotificationContext';

const MainLayout = () => {
  return (
    <>
      <Header />

      <NotificationBanner />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
