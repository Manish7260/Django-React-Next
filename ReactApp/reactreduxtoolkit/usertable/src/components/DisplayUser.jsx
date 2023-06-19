import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slices/UserSlice";


const DisplayUser = () => {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.users)
    
    const deleteUser = (id) =>{
        dispatch(removeUser(id))
    }

    console.log(data)
    
    return (
        data.map((user, id) => {
            return <li key={id}>
                {user}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-delete" onClick={() => deleteUser(id)}>
                    Delete
                </button>
            </li>
        })
    );
}

export default DisplayUser;