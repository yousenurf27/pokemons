import { FC, ReactNode, Suspense } from 'react';
import Header from '../../components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className='pt-[52px] px-4'>
      <Header />
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default MainLayout;
