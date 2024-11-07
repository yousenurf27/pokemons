import Image from 'next/image';
import Link from 'next/link';
import { IPokemonsResult } from '../types/pokemon.type';

const CardPokemon = ({ data }: { data: IPokemonsResult }) => {
  return (
    <Link className='relative' href={`/${data.name}`}>
      <div
        className={`
          px-3 py-5 min-h-[132px] h-full text-white rounded-2xl flex flex-col
          ${
            data.types?.includes('grass') || data.types?.includes('bug')
              ? 'bg-primary-green'
              : data.types?.includes('fire')
              ? 'bg-primary-red'
              : data.types?.includes('water')
              ? 'bg-primary-blue'
              : data.types?.includes('flying')
              ? 'bg-primary-blue-sky'
              : data.types?.includes('poison')
              ? 'bg-primary-purple'
              : 'bg-primary-normal'
          }
        `}
      >
        <h3 className='mb-3 text-base font-semibold capitalize'>
          {data.name.replaceAll('-', ' ')}
        </h3>
        <div className='flex flex-wrap flex-col flex-1 gap-2 *:w-fit *:rounded-full *:py-1 *:px-3 *:bg-white *:bg-opacity-15 *:text-xs *:capitalize'>
          {data.types &&
            data.types.map((type, i) => <span key={i}>{type}</span>)}
        </div>
        <div className='absolute bottom-3 right-3 w-20 h-20 max-[400px]:w-16 max-[400px]:h-16'>
          {data.image ? (
            <Image alt={data.name} src={data.image} quality={40} fill />
          ) : (
            <Image alt={data.name} src={'/gaming.png'} quality={40} fill />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardPokemon;
