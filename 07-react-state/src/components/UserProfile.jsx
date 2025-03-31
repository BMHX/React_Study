import { useContext } from "react"
import UserContext from "./UseContext"

const UserProfile = () => {
    const { user } = useContext(UserContext)
    return (
        <div>
            <h3>个人资料</h3>
            <p>姓名：{user.name}</p>
            <p>年龄：{user.age}</p>
        </div>
    )
}
export default UserProfile;