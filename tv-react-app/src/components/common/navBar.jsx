import { Link } from "react-router-dom";

const NavBar = (props) => {
    const { user } = props
    // console.log('user', user)
    return (<>
        <div className="nav nav-tabs ">
            <Link className="nav-link" to="/"> Movies </Link>

            {!user && (<><Link className="nav-link" to="/login"> Login </Link>
                <Link className="nav-link" to="/register"> Register </Link> </>)}
            {user && (<><Link className="nav-link" to="/profile"> {user.name} </Link>
                <Link className="nav-link" to="/logout"> logout </Link> </>)}
        </div>
    </>);
}

export default NavBar;