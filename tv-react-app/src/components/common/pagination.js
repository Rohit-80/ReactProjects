import { range } from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { totalMovies, pageSize, currentPage, onPage } = props;

  const Page = Math.ceil(totalMovies / pageSize);

  const Pages = range(1, Page + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {Pages.map(p => (<li className={p === currentPage ? 'page-item active' : 'page-item'}>

          <a onClick={() => { onPage(p) }} className="page-link" >{p}</a>
        </li>))}


      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalMovies: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired

}

export default Pagination;