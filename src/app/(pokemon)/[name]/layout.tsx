import { FC, ReactNode } from 'react';
import Navbar from './components/Navbar';

interface PokemonLayoutProps {
  children: ReactNode;
}

const PokemonLayout: FC<PokemonLayoutProps> = ({ children }) => {
  return (
    <main className='relative h-svh'>
      <Navbar />
      {children}
    </main>
  );
};

export default PokemonLayout;
