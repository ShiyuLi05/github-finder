import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function User() {
  const [avatar, setAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [reposCount, setReposCount] = useState('');
  const [userFollowers, setUserFollowers] = useState('');
  const [userFollowing, setUserFollowing] = useState('');
  const [userGitHubURL, setUserGitHubURL] = useState('');

  const [reposArray, setReposArray] = useState([]);

  const {username} = useParams();

  let userEndpoint = `https://api.github.com/users/${username}`;
  let reposEndpoint = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {

    const getData = async () => {
      try {
        const userData = await axios.get(userEndpoint);
        const reposData = await axios.get(reposEndpoint);

        setAvatar(userData.data.avatar_url);
        setUserName(userData.data.name);
        setReposCount(userData.data.public_repos);
        setUserFollowers(userData.data.followers);
        setUserFollowing(userData.data.following);
        setUserGitHubURL(userData.data.html_url);
        setReposArray(reposData.data)
      } catch (error) {
        console.log(error);
      }
    }

    if (username) getData();
  }, [username]);

  return (
    <main>
      <div className='container'>
        <div className='grid'>
        <div className='user'>
          <img src={avatar} alt='the users pfp' />
          <h2>{userName}</h2>
          <div className='user-data'>
            <div>
              <p className='number'>{reposCount}</p>
              <p>REPOSITORIES</p>
            </div>
            <div>
              <p className='number'>{userFollowers}</p>
              <p>FOLLOWERS</p>
            </div>
            <div>
              <p className='number'>{userFollowing}</p>
              <p>FOLLOWLING</p>
            </div>
          </div>
          <button className='btn'>
            <Link
              to={userGitHubURL}
            >
            GO TO GITHUB
            </Link>
          </button>
        </div>
        </div>

        <div className='grid2'>
        <h2>My repostitories</h2>
        <section className='repos'>
          {reposArray.map(repo => (
            <div key={repo.id} className='repo'>
              <div>
                <span><Link
                to={repo.html_url}
                >
                {repo.name}
                </Link></span>
                <span className='time'>Updated at {(repo.updated_at) = moment().format("MMM DD, YYYY")}</span>
                
              </div><p>{repo.description}</p>
            </div>
          ))}
        </section>
        </div>
      </div>
    </main>
  )
}

export default User;
