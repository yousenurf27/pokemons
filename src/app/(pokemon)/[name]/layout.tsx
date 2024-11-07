import { FC, ReactNode, Suspense } from 'react';
import Navbar from './components/Navbar';

interface PokemonLayoutProps {
  children: ReactNode;
}

const PokemonLayout: FC<PokemonLayoutProps> = ({ children }) => {
  return (
    <main className='relative h-svh'>
      <Navbar />
      <Suspense>{children}</Suspense>
    </main>
  );
};

export default PokemonLayout;
