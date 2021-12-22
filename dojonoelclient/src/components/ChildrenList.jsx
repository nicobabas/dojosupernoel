/* eslint-disable array-callback-return */
import axios from 'axios';
import Child from './Child';
import { useEffect, useState } from 'react';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8005/list/', {
    }).then(({ data }) => {
      if (data) {
        setChildren(data);
        console.log(data)
      }
    }).catch(() => {
      console.log('no children');
    });
  }, [])
  
  
  return(
    <div className="ChildrenList">
    
      {children.map((child) => (
        <Child key={child.id} id={child.id} firstname={child.firstname} presents={child.presents} />
      ))}
    </div>
  )
}

export default ChildrenList;
