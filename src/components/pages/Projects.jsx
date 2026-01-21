import { useLocation, useNavigate } from "react-router-dom"

import { useState, useEffect } from "react"

import Message from "../layouts/Message"
import Container from '../layouts/Container'
import Loading from '../layouts/Loading'
import LinkButton from '../layouts/LinkButton'

import ProjectCard from "../projects/ProjectCard"

import styles from './Projects.module.css'

function Projects() {

    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const [projects, setProjects] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message)
            // Limpa o state para não mostrar novamente
            navigate(location.pathname, { replace: true, state: {} })
        }
    }, [location, navigate])

    useEffect(() => {

        setTimeout(
            () => {
                fetch('http://localhost:5000/projects', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        setProjects(data)
                        setRemoveLoading(true)
                    })
                    .catch(err => console.log(err))
            }, 2000)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(data => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type='success' msg={message} />}
            {projectMessage && <Message type='success' msg={projectMessage} />}
            <Container customClass='start'>
                {projects.length > 0 && projects.map((project) => {
                    return (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category && project.category.name ? project.category.name : ""}
                            handleRemove={removeProject} />
                    )
                })}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados.</p>
                )}
            </Container>
        </div>
    )
}

export default Projects