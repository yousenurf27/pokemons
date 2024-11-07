/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { IGetPokemons, IPokemonsResult } from '../../types/pokemon.type';

interface IGetPokemonsQueries {
  page?: number;
}

const useGetPokemons = (queries: IGetPokemonsQueries) => {
  const [data, setData] = useState<IGetPokemons>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const offset: number | undefined = queries.page && (queries.page - 1) * 20;
  const limit: number | undefined = queries.page && 20;

  const getPokemons = async () => {
    try {
      const { data: dataPokemons } = await axiosInstance.get<IGetPokemons>(
        `/pokemon${offset ? '?offset=' + offset : '?offset=0'}${
          limit ? '&limit=' + limit : '&limit=20'
        }`
      );

      const newDataPokemonsResult = await Promise.all(
        dataPokemons.results.map(async (d: IPokemonsResult) => {
          const { data } = await axiosInstance.get(`/pokemon/${d.name}`);

          return {
            ...d,
            types: data.types.map((d: any) => d.type.name),
            image: data.sprites.other.home.front_default,
          };
        })
      );
      dataPokemons.results = newDataPokemonsResult;

      setData(dataPokemons);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return { data, isLoading, refetch: getPokemons };
};

export default useGetPokemons;
