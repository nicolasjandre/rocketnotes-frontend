import { Link } from 'react-router-dom';
import { useState } from 'react';

import { api } from '../../services/api';
import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/auth'
import { Container, Profile, Logout } from "./style";
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

export function Header() {
    const { user, signOut } = useAuth()
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl)
    return (
        <Container>
            <Profile to="/profile">
                <img src={avatar} alt="Foto do usuário" />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}!</strong>
                </div>
            </Profile>
            <Link to="/">
                <Logout onClick={signOut}>
                    <RiShutDownLine />
                </Logout>
            </Link>
        </Container>
    )
}