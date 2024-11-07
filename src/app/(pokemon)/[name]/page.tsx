'use client';

import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useGetPokemon from '../../../hooks/api/useGetPokemon';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ProgresBarState from './components/ProgresBarState';
import { IPokemonAbility } from '../../../types/pokemon.type';

const PokemonPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data: dtPokemon, isLoading: pokemonIsLoading } = useGetPokemon({
    name,
  });

  if (pokemonIsLoading) {
    return (
      <div className='flex min-h-[calc(100svh-79px)] w-full items-center justify-center'>
        <Loader2 size={50} className='animate-spin' />
      </div>
    );
  }
  console.log(dtPokemon);
  return (
    <div className='h-full flex flex-col'>
      <div
        className={`pt-[56px] px-4 pb-6 
        ${
          dtPokemon?.types?.includes('grass') ||
          dtPokemon?.types?.includes('bug')
            ? 'bg-primary-green'
            : dtPokemon?.types?.includes('fire')
            ? 'bg-primary-red'
            : dtPokemon?.types?.includes('water')
            ? 'bg-primary-blue'
            : dtPokemon?.types?.includes('flying')
            ? 'bg-primary-blue-sky'
            : dtPokemon?.types?.includes('poison')
            ? 'bg-primary-purple'
            : 'bg-primary-normal'
        }
        text-white`}
      >
        <h2 className='mb-2 text-2xl font-bold capitalize'>{name}</h2>
        <div className='flex flex-wrap flex-1 gap-2 *:w-fit *:rounded-full *:py-1 *:px-3 *:bg-white *:bg-opacity-15 *:text-xs *:capitalize'>
          {dtPokemon?.types?.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className='min-h-44 relative'>
          {dtPokemon?.image ? (
            <Image
              alt='Bulbasaur'
              src={dtPokemon.image}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          ) : (
            <Image
              alt='Bulbasaur'
              src={'/gaming.png'}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          )}
        </div>
      </div>
      <div className='flex-1 -mt-10 px-4 pt-10 bg-white rounded-t-3xl'>
        <Tabs defaultValue='about' className='w-full'>
          <TabsList className='p-0 bg-transparent'>
            <TabsTrigger
              className='data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-violet-500 rounded-none font-medium'
              value='about'
            >
              About
            </TabsTrigger>
            <TabsTrigger
              className='data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-violet-500 rounded-none font-medium'
              value='base-states'
            >
              Base States
            </TabsTrigger>
            <TabsTrigger
              className='data-[state=active]:shadow-none data-[state=active]:border-b-2 border-b-violet-500 rounded-none font-medium'
              value='abilities'
            >
              Abilities
            </TabsTrigger>
          </TabsList>
          <TabsContent value='about'>
            <div className='mt-4 grid grid-cols-3 gap-y-2 font-medium'>
              {dtPokemon?.height && (
                <>
                  <span className='text-zinc-500'>Height</span>
                  <span className='col-span-2'>{dtPokemon.height / 10} m</span>
                </>
              )}
              {dtPokemon?.weight && (
                <>
                  <span className='text-zinc-500'>Weight</span>
                  <span className='col-span-2'>
                    {dtPokemon.weight / 10} kgs
                  </span>
                </>
              )}
              {dtPokemon?.abilities && (
                <>
                  <span className='text-zinc-500'>Abilities</span>
                  <span className='col-span-2 capitalize'>
                    {dtPokemon.abilities.map((d: IPokemonAbility, i) =>
                      i < dtPokemon.abilities!.length - 1
                        ? d.name + ', '
                        : d.name
                    )}
                  </span>
                </>
              )}
            </div>
          </TabsContent>
          <TabsContent value='base-states'>
            {dtPokemon?.stats?.map((d, i) => (
              <ProgresBarState key={i} {...d} />
            ))}
          </TabsContent>
          <TabsContent value='abilities'>
            <div className='mt-4 font-medium'>
              {dtPokemon?.abilities?.map((d: IPokemonAbility, i) => (
                <div className='mb-3' key={i}>
                  <p className='mb-2 capitalize'>
                    {d.name} {d.is_hidden && '(Secret)'}
                  </p>
                  <p className='text-zinc-500'>{d.desc}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PokemonPage;
