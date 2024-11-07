import { IPokemonStats } from '../../../../types/pokemon.type';

const ProgresBarState = (props: IPokemonStats) => {
  return (
    <div className='mt-4 mb-2 grid grid-cols-5 font-medium'>
      <span className='text-zinc-500 capitalize'>
        {props.name.split('-').map((d) => {
          if (d == 'special') return 'sp. ';
          if (d == 'attack') return 'Atk';
          if (d == 'defense') return 'Def';
          return d;
        })}
      </span>
      <span>{props.base_stat}</span>
      <div className='col-span-3 flex items-center'>
        <div className='w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700'>
          <div
            className={`${
              props.base_stat > 50 ? 'bg-emerald-500' : 'bg-red-500'
            } h-1.5 rounded-full`}
            style={{ width: `${props.base_stat}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgresBarState;
