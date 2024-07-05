import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Login() {

    const navigate = useNavigate();

    const [loginInput,setLogin] = useState ({
        email: '' ,
        password: '',
        error_list: []
    })

    const handleInput = (e) => {
        e.persist()
        setLogin({...loginInput,[e.target.name]: e.target.value})
    }

    const loginSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        try{
            await axios.get('/sanctum/csrf-cookie'); 
            const res = await axios.post(`/api/login`, data);
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_username', res.data.username);
                    swal('Success', res.data.message, "success")
                    navigate('/')
                    
                }else{
                    swal('Warning', res.data.message, "warning")
                }
                
        }catch (error) {
            
        }

        
    }

  return (
    <div>
        <Navbar />
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Connexion</h4>
                        </div>
                        <div className='card-body'>
                            <form onClick={loginSubmit }>
                            <div className='form-group mb-3'>
                                <label>Adress Email</label>
                                <input type="email" name="email" className="form-control" onChange={handleInput} value={loginInput.email} />
                                <span>{loginInput.error_list.email}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Mot de pass</label>
                                <input type="password" name="password" className="form-control"  onChange={handleInput} value={loginInput.password} />
                                <span>{loginInput.error_list.password}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <button type='submit' className='btn btn-primary'>Connexion</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
