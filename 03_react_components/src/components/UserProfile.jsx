const UserProfile = ({name, age, onAgeChange}) => {
    return (
        <div>
            <h2>Profile</h2>
            <p>name: {name}</p>
            <p>age: {age}</p>
            <button onClick={ onAgeChange }>增加 Age</button>
        </div>
    )
}

export default UserProfile;