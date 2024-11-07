import { Skeleton } from './ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[132px] w-full rounded-xl' />
    </div>
  );
};

export default SkeletonCard;
