import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { BASE_URL } from '../utils/config';
import { Button } from './ui/button';

interface IPaginationTemplate {
  page: number;
  count: number;
}

const PaginationTemplate = (props: IPaginationTemplate) => {
  const maxPage = Math.round(props.count / 20);
  return (
    <Pagination>
      <PaginationContent>
        {props.page > 3 && (
          <a href={BASE_URL} aria-label='Go to first page'>
            <Button variant={'ghost'}>First</Button>
          </a>
        )}
        <PaginationItem>
          <PaginationPrevious
            href={
              props.page > 2 ? BASE_URL + `?page=${props.page - 1}` : BASE_URL
            }
          />
        </PaginationItem>
        <div className='flex gap-2'>
          <span>{!props.page ? '1' : props.page}</span>
          <span>of</span>
          <span>{maxPage}</span>
        </div>
        <PaginationItem>
          <PaginationNext
            href={
              props.page < maxPage
                ? BASE_URL +
                  `?page=${props.page ? props.page + 1 : props.page + 2}`
                : ''
            }
          />
        </PaginationItem>
        {props.page < maxPage && (
          <a href={BASE_URL + `?page=${maxPage}`} aria-label='Go to first page'>
            <Button variant={'ghost'}>Last</Button>
          </a>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTemplate;
