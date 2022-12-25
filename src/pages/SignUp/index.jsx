import { Container, Form, Background } from "./style";
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api"

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignUp() {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'gm')

        if (!name || !email || !password) {
            return alert('Preencha todos os campos.')
        }

        if (!email.match(regex)) {
            return alert('E-mail inválido.')
        }

        api.post("/users", {name, email, password})
        .then(() => {
            alert("Usuário cadastrado com sucesso!")
            navigate("/")
        })
        .catch(error => {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Não foi possível cadastrar o usuário.")
            }
        })
    }
    
    return (
        <Container>
            <Background />
            <Form>
                <h1>RocketNotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis.</p>

                <h2>Crie sua conta</h2>

                <Input onChange={e => setName(e.target.value)} placeholder="Nome" type="text" icon={FiUser}/>
                <Input onChange={e => setEmail(e.target.value)} placeholder="E-mail" type="text" icon={FiMail}/>
                <Input onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" icon={FiLock}/>

                <Button title="Cadastrar" onClick={handleSignUp}/>

                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container>
    )
}