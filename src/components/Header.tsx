'use client';

import { useEffect, useState } from 'react';

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const scrollThreshold = 40;
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        if (currentScrollTop > scrollThreshold) {
          setHideHeader(true);
        }
      } else {
        setHideHeader(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-20 w-full overflow-x-hidden bg-inherit p-0 transition-transform duration-500 ${
        hideHeader ? '-translate-y-full' : 'translate-y-0'
      } shadow-sm`}
    >
      <div className='max-w-md mx-auto text-center py-3'>
        <span className='text-xl font-bold'>Pokemons</span>
      </div>
    </nav>
  );
};

export default Header;
