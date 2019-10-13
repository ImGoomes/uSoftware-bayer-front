import React from 'react'
import styled from 'styled-components'
import {
    CardContent,
    Card,
    CardTitle,
    CardFooter,
    CardActions
} from '../components/card/Card'
import axios from 'axios'
import { relative } from 'path'

const buildUrl = endpoint => `${process.env.REACT_APP_API_ADDRESS}${endpoint}`
const obj = JSON.parse(localStorage.getItem('uJobData'))

const CandidateVacancies = ({ display }) => {
    const obj = JSON.parse(localStorage.getItem('uJobData'))

    const [vacancies, setVacancies] = React.useState(undefined)
    const [candidates, setCandidates] = React.useState(undefined)
    const [selectedVacancy, setSelectedVacancy] = React.useState(undefined)
    const [visible, setVisible] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    const getVacancies = async () => {
        setLoading(() => true)
        const response = await axios.get(
            buildUrl(`/vacancy?recruiter_id=${obj.recruiter_id}`),
            {
                headers: {
                    token: obj.token
                }
            }
        )

        setLoading(() => false)
        const alreadyRegistered = []
        const alreadyRegisteredId = []

        response.data.forEach(element => {
            if(!alreadyRegisteredId.includes(element.vacancy_id)){
                let item = {...element}
                delete item.requirement_name

                alreadyRegistered.push({...item, requirement_name: [element.requirement_name]})
                alreadyRegisteredId.push(element.vacancy_id)
            }else{
                // alreadyRegistered.forEach(registeredElement=>{
                //     if(registeredElement.vacancy_id === element.vacancy_id)
                //         registeredElement.requirement_name.push()
                // })

                const teste = alreadyRegistered.find(x => x.vacancy_id === element.vacancy_id)
                teste.requirement_name.push(element.requirement_name)
            }
        })

        return alreadyRegistered
        // return response.data.filter(data=>{
        //     if(!alreadyRegistered.includes(data.vacancy_id)){
        //         alreadyRegistered.push(data.vacancy_id)
        //         return true
        //     }else {

        //         return false
        //     }
        // })

        // return response.data
    }

    const getCandidates = async vacancyId => {
        setLoading(() => true)
        const response = await axios.get(buildUrl(`/user/${vacancyId}`), {
            headers: {
                token: obj.token,
                param: 'vacancy_id'
            }
        })

        setLoading(() => false)

        return response.data

        // const alreadyRegistered = []
        
        // return response.data.users.filter(data=>{
        //     if(!alreadyRegistered.includes(data.user_id)){
        //         alreadyRegistered.push(data.user_id)
        //         return true
        //     }else return false
        // })
    }

    React.useEffect(() => {
        getVacancies().then(r => setVacancies(r))
    }, [])

    return (
        <Container>
            {!visible && vacancies && (
                <>
                    <Title>Vagas</Title>
                    {!loading ? (
                        <Flex>
                            {vacancies.map(vacancy => (
                                <Card
                                    key={`vacancy-${vacancy.vacancy_id}`}
                                    onClick={() => {
                                        setVisible(visible => !visible)
                                        getCandidates(vacancy.vacancy_id).then(
                                            r => setCandidates(r)
                                        )
                                        setSelectedVacancy(vacancy)
                                    }}
                                >
                                    <CardTitle>{vacancy.job}</CardTitle>
                                    <CardContent>
                                        {vacancy.description}
                                    </CardContent>
                                    <CardFooter>{vacancy.name}</CardFooter>
                                </Card>
                            ))}
                        </Flex>
                    ) : (
                        <h2>Carregando...</h2>
                    )}
                </>
            )}
            {visible && candidates && (
                <>
                    <LinkButton
                        onClick={() => {
                            // alert(JSON.stringify(selectedVacancy))
                            setSelectedVacancy(undefined)
                            setVisible(false)
                        }}
                    >
                        Voltar &larr;
                    </LinkButton>
                    <Title>Vaga Selecionada</Title>
                    <Flex>
                        <Card static>
                            <CardTitle>{selectedVacancy.job}</CardTitle>
                            <CardContent>
                                {selectedVacancy.description}
                            </CardContent>
                            <CardFooter>{selectedVacancy.name}</CardFooter>
                        </Card>
                    </Flex>
                    <Title>Candidatos</Title>
                    {!loading ? (
                        <Flex>
                            {candidates.users.map(element => {
                                let absoluteValue = 0//selectedVacancy.requirement_name.length
                                let relativeValue = 0
                                // console.log(JSON.stringify(element))
                                element.filecontent.split(' ').forEach(word => {
                                    const wordToCompare = word.toLowerCase()
                                    
                                    selectedVacancy.requirement_name.forEach(tag => {
                                        if(wordToCompare === tag.toLowerCase()){
                                            if(absoluteValue < selectedVacancy.requirement_name.length)
                                                absoluteValue++
                                        }
                                    })

                                    relativeValue = (absoluteValue*100)/selectedVacancy.requirement_name.length
                                })

                                const candidate = {... element, value: relativeValue}
                                return <CandidateCard candidate={candidate} />
                            })}
                        </Flex>
                    ) : (
                        <h2>Carregando...</h2>
                    )}
                </>
            )}
        </Container>
    )
}

const CandidateCard = ({ candidate }) => {
    const [hired, setHired] = React.useState(candidate.isHired)

    return (
        <Card background={hired ? '#5bbd5f' : '#3c3c4a'}>
            <CardTitle>
                {candidate.name} {candidate.lastName}
            </CardTitle>
            <CardContent>
                <div>{candidate.email}</div>
                <div>{candidate.mobilePhone}</div>
                {/* <div>{candidate.password}</div> */}
                {/* <div>teste</div> */}
            </CardContent>
            {!hired &&
            <CardActions>
                <ActionButton
                    backgroundColor='#5bbd5f'
                    onClick={() => {
                        setHired(true)

                        axios.put(
                            buildUrl('/userVacancyHire'),
                            {
                                user_vacancy_id: candidate.user_vacancy_id
                            },
                            {
                                headers: {
                                    token: obj.token
                                }
                            }
                        )
                    }}
                >
                    Contratar
                </ActionButton>
            </CardActions>
            }
            <CardFooter>
                <h2 align="left">{+candidate.value.toFixed(1) + '%'}</h2>
            </CardFooter>
        </Card>
    )
}
export default CandidateVacancies

const Flex = styled.div`
    flex-wrap: wrap;
    display: flex;
`

const Container = styled.div`
    margin: 80px;
`
const Title = styled.h3`
    display: inline-block;
    margin-left: 20px;
`
const LinkButton = styled.div`
    cursor: pointer;
    width: 150px;
    height: 80px;
    font-size: 24px;
    margin-left: 20px;
    display: block;
`

const ActionButton = styled.div`
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    cursor: pointer;
    width: 90px;
    height: 30px;
    font-size: 24px;
    display: inline-block;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : '#fff'};
    color: white;
    border-radius: 20px;
    font-size: 15px;
`
