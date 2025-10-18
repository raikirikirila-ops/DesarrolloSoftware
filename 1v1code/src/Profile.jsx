import react from 'react';

const Profile = ({ setSection }) => {
    return(
    <>
        <div className="navbar">
            <button className="icon" onClick={() => setSection("home")}>0
                <img src="https://imgs.search.brave.com/s-aZ6fzJ9UnDlpvQuPkQI1XUk3k5BcbO7ERREVFb2l8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvNTg3NC81ODc0/MTE3LnBuZw" alt="" />
            </button>
        </div>
<h1>Perfil</h1>
    </>
    )
}

export default Profile;
