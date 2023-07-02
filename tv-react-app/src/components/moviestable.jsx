import Tbody from "./common/tbody";
import Thead from "./common/thead";


const MoviesTable = props => {
    const { allMovies, onSort, onLike, onDelete } = props;
    return (
        <table className="table">
            <Thead onSort={onSort} />
            <Tbody user={props.user} allMovies={allMovies} onLike={onLike} onDelete={onDelete} />
        </table>
    );
}



export default MoviesTable;