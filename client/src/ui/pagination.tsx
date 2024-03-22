import Image from "next/image";
import React from "react";
import ReactPaginate from "react-paginate";
import icon from "@/assets/images/icon/icon_50.svg";
import icon_2 from "@/assets/images/icon/icon_69.svg";

// prop type
type IProps = {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
  currPage: number;
};
// const temp = (event: { selected: number }) => {
//   console.log(event.selected);
// };

const Pagination = ({ handlePageClick, pageCount, currPage }: IProps) => {
  return (
    <>
      <div className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none">
        <ReactPaginate
          initialPage={currPage - 1}
          className="pagination-one d-flex align-items-center justify-content-start justify-content-sm-start style-none"
          breakLabel="..."
          activeClassName="active"
          nextLabel={
            <span className="d-flex align-items-center">
              Next <Image src={icon} alt="icon" className="ms-2" />
            </span>
          }
          onPageChange={handlePageClick}
          // onPageChange={temp}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel={
            <span className="d-flex align-items-center me-4">
              <Image src={icon_2} className="me-2" alt="icon" /> Prev
            </span>
          }
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Pagination;
{
  /* <ReactPaginate
  className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none"
  breakLabel="..."
  activeClassName="active"
  nextLabel={
    <span className="d-flex align-items-center">
      Last <Image src={icon} alt="icon" className="ms-2" />
    </span>
  }
  onPageChange={handlePageClick}
  pageRangeDisplayed={6}
  pageCount={pageCount}
  previousLabel={
    <span className="d-flex align-items-center">
      <Image src={icon_2} className="me-2" alt="icon" /> Prev
    </span>
  }
  renderOnZeroPageCount={null}
/>; */
}
