import { BASE_URL } from '../../../../utils/config';
import { MoveLeft } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className='px-4 py-4 bg-transparent absolute top-0 left-0 right-0'>
      <a href={BASE_URL || ''}>
        <MoveLeft className='text-white' />
      </a>
    </nav>
  );
};

export default Navbar;
