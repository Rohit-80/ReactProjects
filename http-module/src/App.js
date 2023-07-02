import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import http from './services/httpServices';
import { ToastContainer } from 'react-toastify';


function App() {
  const [Post, setPost] = useState([]);
  
  const url = 'https://jsonplaceholder.typicode.com/posts'
  // Post.map(p=>p.map(e=>console.log(e.title)))
  const getData = async () => {
    const result = await http.get(url);

    setPost(result.data);
    console.log('dataget');

  }
  useEffect(() => {
    getData()
  }, []);
  const handleUpdate = async (post) => {

    post.title = "Update"
    const result = await http.put(url + '/' + post.id, post)
    console.log(result.data)
    const posts = [...Post]
    const ind = posts.indexOf(post)
    posts[ind] = { ...post }


    setPost([...posts])
  }

  const handleDelete = async (post) => {
    const Original = [...Post]
    const posts = [...Post];
    const newpost = posts.filter(item => item != post)
    setPost(newpost)

    try {
      await http.delete('s' + url + "/" + post.id);
      // throw new Error(404)
    } catch (error) {

      if (error.response && error.response.status === 404)
        alert("post is already deleted");

      setPost(Original)
    }



  }

  const handleAdd = async () => {
    const obj = { title: 'a', body: 'b' }
    const { data: posts } = await http.post(url, obj)
    setPost([posts, ...Post])

  }
  return (
    <>

      <div>
        <ToastContainer />
        <button onClick={handleAdd} className='btn btn-primary btn-sm'> Add</button>
        <table className='table'>
          <thead>
            <tr>
              <th> Title</th>
              <th> Update</th>
              <th> Delete</th>
            </tr>

          </thead>
          <tbody>
            {Post.map(item =>
            (<tr key={item.id}>

              <td>{item.title}</td>
              <td>
                <button onClick={() => handleUpdate(item)} className='btn btn-primary btn-sm '> Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(item)} className='btn btn-danger btn-sm'> Delete</button>
              </td>
            </tr>)
            )

            }

          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
