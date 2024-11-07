/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { IPokemon, IPokemonAbility } from '../../types/pokemon.type';
import { axiosInstance } from '../../lib/axios';

interface IGetPokemon {
  name: string;
}

const useGetPokemon = (queries: IGetPokemon) => {
  const [data, setData] = useState<IPokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPokemon = async () => {
    try {
      const { data: dataPokemon } = await axiosInstance.get(
        `/pokemon/${queries.name}`
      );

      const pokemon: IPokemon = {
        name: dataPokemon.name,
        height: dataPokemon.height,
        weight: dataPokemon.weight,
        image: dataPokemon.sprites.other.home.front_default,
        types: dataPokemon.types.map((dt: any) => dt.type.name),
        abilities: dataPokemon.abilities.map((dt: any) => {
          return {
            name: dt.ability.name,
            url: dt.ability.url,
            is_hidden: dt.is_hidden,
          };
        }),
        stats: dataPokemon.stats.map((dt: any) => {
          return {
            base_stat: dt.base_stat,
            name: dt.stat.name,
          };
        }),
      };

      const newDataAbilities = await Promise.all(
        pokemon.abilities!.map(async (d: IPokemonAbility) => {
          const { data } = await axiosInstance.get(`/ability/${d.name}`);

          return {
            ...d,
            desc: data.effect_entries.filter((d: any) => {
              if (d.language.name == 'en') {
                return d.effect;
              }
            })[0].effect,
          };
        })
      );
      pokemon.abilities = newDataAbilities;

      setData(pokemon);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return { data, isLoading };
};

export default useGetPokemon;
