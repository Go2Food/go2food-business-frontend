import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Cookies from 'universal-cookie';
import axios from 'axios';
import LoadingOverlay from '../items/LoadingOverlay';
import { BackendURL } from '../configs/GlobalVar';


let validateToken = async function () {
  const cookies = new Cookies();
  let token_value = cookies.get("jwt_auth");

  let result = await axios.post(`${BackendURL}/validate_token/`, {
    token: token_value
  })
    .then(function (response) {
      if (response.data["detail"] === "Invalid Token") {
        return false
      }
      else if (response.data["detail"] === "Signature has expired") {
        return false
      }
      else {
        return true
      }
    })
    .catch(function (error) {
      console.log(error, 'error');
      return false
    });

  return result;
}

function RequireAuth({ children }) {
  const [initialCheckValue, setInitialCheckValue] = useState(true);
  const [actualCheckValue, setActualCheckValue] = useState(false);
  const navigate = useNavigate();

  const checkLogin = async () => {
    let login_valid = await validateToken();
    setInitialCheckValue(login_valid);
    setActualCheckValue(login_valid)
  }

  useEffect(() => {
    checkLogin();
  }, [])

  useEffect(() => {
    if (!initialCheckValue) {
      navigate("/login");
    }
  }, [initialCheckValue])


  if (actualCheckValue)
  {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    )
  } 
  else 
  {
    return (
      <LoadingOverlay />
    )
  }

};

export default RequireAuth;