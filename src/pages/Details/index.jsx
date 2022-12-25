import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { api } from '../../services/api.js'
import { Container, Links, Content } from './style.js'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header/index.jsx'
import { Section } from '../../components/Section/index.jsx'
import { Tag } from '../../components/Tag/index.jsx'
import { ButtonText } from '../../components/ButtonText/index.jsx'

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm('Realmente quer excluir esta nota?')

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])

  return (
    <Container>
      <Header />


      {
        data &&
        <main>
        <Content>

          <ButtonText 
          onClick={handleRemove}
          title="Excluir nota"
           />

          <h1>{data.title}</h1>
          <p>{data.description}</p>
          { 
            data.links &&
          <Section title="Links úteis">
            <Links>
             {
              data.links.map(link => (
                <li key={String(link.id)}>
                  <a target="_blank" href={link.url}>{link.url}</a>
                  </li>
              ))
            }
            </Links>
          </Section>
          }

          {  
           data.tags &&
          <Section title="Marcadores">
            {
              data.tags.map(tag => (
                <Tag 
                key={String(tag.id)}
                title={tag.name} />
              ))
            }
          </Section>
          }

          <Button 
          onClick={handleBack}
          title="Voltar"
          />
        </Content>
      </main>
      }

    </Container>
  )  
}