import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../../services/api'
import { Container, Brand, Menu, Search, Content, NewNote } from './style'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { Input } from '../../components/input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

export function Home() {
    const [notes, setNotes] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    function handleSelectedTag(tagName) {
        const alreadySelected = selectedTags.includes(tagName)

        if (tagName === "all") {
            return setSelectedTags([])
        }
        
        if (alreadySelected) {
            const filteredTags = selectedTags.filter(tag => tag !== tagName)
            setSelectedTags(filteredTags)
        } else {
            setSelectedTags(prev => [...prev, tagName])
        }
    }

    function handleDetails(id) {
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data)
        }
        
        fetchTags()
    }, [])

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${selectedTags}`)
            setNotes(response.data)
        }

        fetchNotes()

    }, [selectedTags, search])

    return (
        <Container> 
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>

        <Header />

        <Menu>
            <li><ButtonText 
            isActive={selectedTags.length === 0}
            title="Todos" 
            onClick={() => handleSelectedTag("all")}
            />
            </li>
            {
                tags && tags.map(tag => (
                    <li key={tag.id}>
                        <ButtonText 
                        onClick={() => handleSelectedTag(tag.name)} 
                        title={tag.name} 
                        isActive={selectedTags.includes(tag.name)}
                        />
                    </li>
                ))
            }
        </Menu>

        <Search>
            <Input 
            placeholder="Pesquisas pelo título" 
            icon={FiSearch}
            onChange={e => setSearch(e.target.value)}
            />
        </Search>

        <Content>
            <Section title="Minhas Notas">
                {
                    notes?.map( note => (
                        <Note
                        key={String(note.id)}
                        data={note}
                        onClick={() => handleDetails(note.id)}
                        />
                    ))
                }
            </Section>
        </Content>
 
        <NewNote to="/new">
            <FiPlus />
            Criar Nota
        </NewNote>

    </Container>
    )
}