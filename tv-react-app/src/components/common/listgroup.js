
const ListGroup = ({ listGenres, onItemSelect, sselectGenre }) => {

    let name = ""
    if (!sselectGenre) {
        name = "All genre"
    } else {
        name = sselectGenre.name
    }

    return (
        <ul className="list-group">
            {listGenres.map(item => <li key={item._id}
                onClick={() => { onItemSelect(item) }}
                className={item.name === name ? 'list-group-item active'
                    : 'list-group-item'}>{item.name}</li>)}

        </ul>
    );
}



export default ListGroup;