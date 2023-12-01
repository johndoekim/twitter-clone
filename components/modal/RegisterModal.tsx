import useLoginModal from '@/hooks/useLoginModal';
import { use, useCallback, useState } from 'react';
import { Input } from '../Input';
import { Modal } from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { LoginModal } from './LoginModal';
import { register } from 'module';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export const RegisterModal = () => {
    const loginModal = useLoginModal();
    const RegisterModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoding, setIsLoding] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoding) {
            return;
        }
        RegisterModal.onClose();
        loginModal.onOpen();
    }, [isLoding, loginModal, RegisterModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoding(true);

            await axios.post('/api/register', {
                email,
                password,
                username,
                name,
            });

            toast.success('Account created!');

            signIn('credentials', {
                email,
                password,
            });

            RegisterModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error('something went wrong!');
        } finally {
            setIsLoding(false);
        }
    }, [RegisterModal, email, password, username, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoding}
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoding}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoding}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoding}
            />
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                Already have an account?
                <span
                    onClick={onToggle}
                    className="text-white
                cursor-pointer hover:underline"
                >
                    Sign in
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            disabled={isLoding}
            isOpen={RegisterModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={RegisterModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};
