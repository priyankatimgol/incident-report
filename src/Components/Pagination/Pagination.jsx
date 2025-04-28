import { DropDownList } from '@progress/kendo-react-dropdowns';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onChange, totalPage, setLimit, limit, page, perPage }) => {
  const paging = [5, 10, 20];
  return (
    <div className="row mx-0 align-items-center my-2 justify-content-between">
      <div className="row mx-0 align-items-center ">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<BiSkipNext fontSize={20} />}
          containerClassName="pagination m-0 border-0"
          activeClassName="active"
          pageLinkClassName="customPageLink"
          breakLinkClassName="page-link"
          nextLinkClassName=""
          previousLinkClassName=""
          pageClassName="customPage"
          breakClassName="page-item"
          nextClassName="nextPre"
          previousClassName="nextPre"
          onPageChange={onChange}
          pageCount={totalPage}
          previousLabel={<BiSkipPrevious fontSize={20} />}
        />
        <div className="p-0" style={{ width: '70px' }}>
          <DropDownList value={limit} data={paging} onChange={(e) => setLimit(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
