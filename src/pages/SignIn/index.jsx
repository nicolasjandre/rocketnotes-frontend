import { Container, Form, Background } from "./style";
import { FiMail, FiLock } from 'react-icons/fi'
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useState } from "react";


export function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signIn } = useAuth()

    function handleSignIn() {
        signIn({ email, password })
    }

    return (
        <Container>
            <Form>
                <h1>RocketNotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>

                <h2>Faça seu login</h2>

                <Input onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="text" icon={FiMail}/>
                <Input onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" icon={FiLock}/>

                <Button title="Entrar" onClick={handleSignIn}/>

                <Link to="/register">Criar Conta</Link>
            </Form>

            <Background />
        </Container>
    )
}