export interface IPokemonsResult {
  name: string;
  url: string;
  types?: string[];
  image?: string;
}

export interface IGetPokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonsResult[];
}

export interface IPokemonStats {
  base_stat: number;
  name: string;
}

export interface IPokemonAbility {
  name: string;
  url: string;
  is_hidden: boolean;
  desc: string;
}

export interface IPokemon {
  name?: string;
  types?: string[];
  image?: string;
  height?: number;
  weight?: number;
  abilities?: IPokemonAbility[];
  stats?: IPokemonStats[];
}
