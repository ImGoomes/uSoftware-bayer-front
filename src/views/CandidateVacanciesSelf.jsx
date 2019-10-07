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
import jQuery from 'jquery'

const buildUrl = endpoint => `${process.env.REACT_APP_API_ADDRESS}${endpoint}`
const obj = JSON.parse(localStorage.getItem('uJobData'))

const CandidateVacanciesSelf = ({ display }) => {
    const [vacancies, setVacancies] = React.useState(undefined)
    const [candidates, setCandidates] = React.useState(undefined)
    const [selectedVacancy, setSelectedVacancy] = React.useState(undefined)
    const [visible, setVisible] = React.useState(false)

    const [loading, setLoading] = React.useState(false)

    const getVacancies = async () => {
        setLoading(() => true)
        const response = await axios.get(
            buildUrl(`/allVacancies`),
            {
                headers: {
                    token: obj.token
                }
            }
        )

        setLoading(() => false)
        return response.data
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
                                        // getCandidates(vacancy.vacancy_id).then(
                                        //     r => setCandidates(r)
                                        // )
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
            {visible && (
                <>
                    <LinkButton
                        onClick={() => {
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
                            <CardActions>
                <ActionButton
                  backgroundColor='#5bbd5f'
                  onClick={() => {

                    axios.post(
                      buildUrl('/userVacancy'),
                      {
                          isActive: true,
                          approvalRate: 0,
                          vacancy_id: selectedVacancy.vacancy_id,
                          user_id: obj.user_id,
                          isHired: 0
                      },
                      {
                        headers: {
                          token: obj.token
                    }
                      }
                    )

                    jQuery.alert({
                        title: 'Vaga',
                        content: 'Você está concorrendo a está vaga!'
                    })

                  }}
                >
                  Candidatar
                </ActionButton>
              </CardActions>
                        </Card>
                    </Flex>
                    {/* <Title>Candidatos</Title>
                    {!loading ? (
                        <Flex>
                            {candidates.users.map(candidate => (
                                <CandidateCard candidate={candidate} />
                            ))}
                        </Flex>
                    ) : (
                        <h2>Carregando...</h2>
                    )} */}
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
                <div>{candidate.password}</div>
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
        </Card>
    )
}
export default CandidateVacanciesSelf

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
