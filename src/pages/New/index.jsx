import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from "../../services/api";
import { Container, Form } from "./style";
import { Header } from "../../components/Header"
import { Input } from "../../components/Input";
import { Textarea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

export function New() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState('')

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('')

    const navigate = useNavigate()

    function handleAddLink() {
        setLinks(prev => [...prev, newLink])
        setNewLink('')
    }

    function handleRemoveLink(deleted) {
        const response = confirm('Deseja remover este link?')

        if (!response) return

        setLinks(prev => prev.filter(link => link !== deleted))
    }

    function handleAddTag() {
        setTags(prev => [...prev, newTag])
        setNewTag('')
    }

    function handleRemoveTag(deleted) {
        const response = confirm('Deseja remover esta tag?')

        if (!response) return

        setTags(prev => prev.filter(tag => tag !== deleted))
    }

    function handleBack() {
        navigate(-1)
      }

    async function handleNewNote() {
        if (!title) {
            return alert('Digite o título da nota.')
        }

        if (!description) {
            return alert("Sua nota precisa ter uma descrição.")
        }

        if (links.length === 0) {
            return alert('Você precisa adicioanr ao menos um link.')
        }

        if (tags.length === 0) {
            return alert('Você precisa adicioanr ao menos uma tag.')
        }

        if(newLink) {
            return alert('Você não terminou de adicionar o link. Clique para adicionar ou deixe o campo vazio :)')
        }

        if(newTag) {
            return alert('Você não terminou de adicionar a tag. Clique para adicionar ou deixe o campo vazio :)')
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })

        alert('Nota criada com sucesso.')
        navigate(-1)
    }

    return (
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText 
                        onClick={handleBack}
                        title="Voltar"
                        />
                    </header>

                    <Input 
                    placeholder="Título"
                    onChange={e => setTitle(e.target.value)}
                     />
                    
                    
                    <Textarea 
                    placeholder="Observações"
                    onChange={e => setDescription(e.target.value)}
                     />

                    
                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }

                        <NoteItem 
                        placeholder="Novo link" 
                        isNew
                        value={newLink}
                        onChange={e => setNewLink(e.target.value.toLowerCase())}
                        onClick={e => {
                            const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'gm')
                            
                            if (e.target.parentElement.previousElementSibling.defaultValue === undefined) {
                                if (!e.target.previousElementSibling.defaultValue.match(regex)) {
                                    return alert('Seu link precisa inicar com http:// ou https://')
                                }

                                return handleAddLink()
                            }
                            
                            if (!e.target.parentElement.previousElementSibling.defaultValue.match(regex)) {
                                return alert('Seu link precisa inicar com http:// ou https://')
                                } handleAddLink()
                            }
                        }
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'gm')
                                if (!e.target.value.match(regex)) {
                                    return alert('Seu link precisa inicar com http:// ou https://')
                                    } handleAddLink()
                            }
                        }}
                        />

                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                    key={index}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                            placeholder="Nova tag" 
                            isNew
                            value={newTag}
                            onChange={e => setNewTag(() => {
                                const capitalized = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
                                return capitalized
                            })}
                            onClick={handleAddTag}
                            onKeyPress={e => e.key === 'Enter' ? handleAddTag() : null}
                            />
                        </div>
                    </Section>

                    <Button 
                    onClick={handleNewNote} 
                    title="Salvar" 
                    />

                </Form>
            </main>
        </Container>
    )
}