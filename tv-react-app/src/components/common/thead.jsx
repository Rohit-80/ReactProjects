

const Thead= (props)=> {
     const {onSort} = props;
    return (
        <thead>
            <tr>
                <th onClick={()=> onSort('title')}>Title</th>
                <th onClick={()=> onSort('genre.name')}>Genre</th>
                <th onClick={()=> onSort('numberInStock')}>stock</th>
                <th onClick={()=> onSort('dailyRentalRate')}>rating</th>
            </tr>
        </thead>
      );
}

export default Thead;
