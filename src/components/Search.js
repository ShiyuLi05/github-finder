import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset
} = useForm();

  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const getData = async (data) => {
    try {
      const URL = await axios.get(`https://api.github.com/users/${data.userName}`);
      navigate(`/user/${data.userName}`);
      setMessage('');
    } catch (error) {
      setMessage('Your search do not match any users.');
    }
  }

  return (
    <div className='search'>
      <div className='center'>
        <h1>GitHub Finder</h1>
        <form onSubmit={handleSubmit((data) => {
          getData(data);    
          reset();
        })}>
        <input
            type='text' 
            placeholder='User Name'
            {...register("userName", {required: 'This is required'})}
        />
        <input
            type='submit'
            className='searchBtn'
            value='SEARCH'
            disabled={!isValid}
        />
      </form>
      <p>{message}</p>
      </div>
    </div>
  )
}

export default Search