import './Child.css';
import axios from 'axios';
const Child = ({id, firstname, presents}) => {
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8005/list/${id}`, {
    }).then(({ data }) => {
      if (data) {
        console.log(data)
      }
    }).catch(() => {
      console.log('no children');
    });
  };


  return(
    <div className="Child">
      <p>{firstname}</p>
      <ul>voici ma liste {presents.map(present => <li>{present}</li>)}</ul>
      <button onClick={() => handleDelete({id})}>supprime</button>
    </div>
  )
}

export default Child;