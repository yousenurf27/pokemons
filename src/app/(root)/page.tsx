'use client';

import { useSearchParams } from 'next/navigation';
import CardPokemon from '../../components/CardPokemon';
import SkeletonCard from '../../components/SkeletonCard';
import useGetPokemons from '../../hooks/api/useGetPokemons';
import PaginationTemplate from '../../components/PaginationTemplate';

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '';

  const { data: dataPokemons, isLoading: pokemonsLoading } = useGetPokemons({
    page: +page,
  });

  return (
    <div className='py-4'>
      <div className='grid grid-cols-2 gap-2'>
        {pokemonsLoading ? (
          <>
            {[...Array(10)].map((x, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : (
          <>
            {dataPokemons?.results ? (
              <>
                <h4 className='col-span-full font-semibold'>
                  Total: {dataPokemons.count} Pokemon
                </h4>
                {dataPokemons.results.map((data, i) => (
                  <CardPokemon data={data} key={i} />
                ))}
                <div className='py-4 col-span-full'>
                  <PaginationTemplate page={+page} count={dataPokemons.count} />
                </div>
              </>
            ) : (
              <div className='col-span-full min-h-svh flex justify-center items-center flex-col'>
                <span className='font-semibold text-xl'>Opss...</span>
                <span className='text-base'>Something wrong :(</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
