import { Link } from "react-router-dom";
import Like from "./like";
import MovieForm from "../movieForm";
const Tbody = (props) => {
    const { allMovies, onLike, onDelete } = props;
    return (<tbody>
        {allMovies.map(item => (<tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.genre.name}</td>
            <td>{item.numberInStock}</td>
            <td>{item.dailyRentalRate}</td>
            <td>
                <Like onClick={() => onLike(item)} like={item.liked} />
            </td>
            <td>
                {props.user && (<><button className="btn btn-primary btn-sm">
                    <Link className="nav-link" to={"/movies/" + item._id}> Update </Link>
                </button>
                    <button onClick={() => onDelete(item._id)} className="btn btn-danger btn-sm">
                        Delete
                    </button></>)}

            </td>

        </tr>))}
    </tbody>
    );
}

export default Tbody;