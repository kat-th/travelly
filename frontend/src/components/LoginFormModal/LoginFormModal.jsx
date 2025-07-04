// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoLogin = () => {
        setCredential('demo@user.io');
        setPassword('password');
    };

    return (
        <>
            <div className="modal-content">
                <h1>Log In</h1>
                <form className="modal-input" onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={credential}
                            onChange={e => setCredential(e.target.value)}
                            required
                            placeholder="Username or Email"
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </label>
                    {errors.credential && <p>{errors.credential}</p>}
                    <button className="login-button" type="submit">
                        Log In
                    </button>
                    <div className="demo-login-button" onClick={demoLogin}>
                        Demo Login
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginFormModal;
