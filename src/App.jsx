import { useState, useEffect } from 'react'


import './App.css'
import { useLocation } from 'react-router-dom';
import {callServer} from '../backend/api.js';
import togatherLogo from './resources/Logo/togatherLogo.png';
function App() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
const query = useQuery();

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [status, setStatus] = useState('');
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
const [emailParam, setEmailParam] = useState('');

const [formShow, setFormShow] = useState(true);

useEffect(() => {
    const nameFromQuery = query.get('name') || '';
    const emailFromQuery = query.get('email') || '';
    setName(nameFromQuery);
    setEmail(emailFromQuery);
}, [query]); // Run this effect whenever the query changes



// const emailChanger = (event) => {
//     setEmailParam(event.target.value);
//     setEmail(event.target.value);

// }

const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //     const response = await axios.post('http://localhost:6999/send-message', {
    //         name,
    //         email,
    //         status,
    //     });
    //     const data = response.data;
    //     console.log(response);
    //     if (data.error) {
    //         setError(data.error);
    //         setFormShow(true);
    //     } else {
    //         setFormShow(false);
    //         setSuccess('Thank You for response!');
    //         setName('');
    //         setEmail('');
    //         setStatus('');
    //     }
    // } catch (error) {
    //     setError('Error sending message');
    // }

    const messageData = 
    {
      name,
      email,
      status,
    }
      try {
          const result = await callServer(messageData);
      
          if (result) {

            setFormShow(false);
            setSuccess('Thank You for response!');
            setName('');
            setEmail('');
            setStatus('');

          
        } else {
          setError(data.error);
          setFormShow(true);
        }
      } catch (error) {
        setError('Error sending message');
      }

  
};
  return (
    <>
    <div>
      <div className="container-img">
        <img src={togatherLogo} alt="img" />
      </div>
    </div>
        <div className='invitationForm'>
    {formShow ?
        <form onSubmit={handleSubmit} className='invitation-form'>

           
            <h1>Hey {name} </h1>
            <h2> Please do the RSVP</h2>
            {/* <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label> */}
            <br />
            {/* <label>
                Email:
                <input
                    type="email"
                    value={email || ''}
                    onChange={emailChanger}
                />
            </label> */}
            <br />


            <div className='form-buttons'>
                <button type='submit' id='accept' onClick={() => { setStatus('accepted') }}>Accept Proposal</button>
                <button type='submit' id='reject' onClick={() => { setStatus('rejected') }}>Reject Proposal</button>
                <button type='submit' id='tentative' onClick={() => { setStatus('tentative') }}>Tentative</button>
            </div>
            <br />
            {/* <button type="submit">Send Message</button> */}

        </form>
        : <></>}

    <div className='message-confirmation'>
        {error && <h2 className='error-message' >{error}. Please try again.</h2>}
        {success && <h2 className='success-message'>{success}</h2>}
    </div>
</div>
</>
  )
}

export default App
