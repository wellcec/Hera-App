/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Box, makeStyles, Typography, IconButton } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'

import './fireworks.scss'
import './globals.scss'

import Fireworks from './Fireworks'
import ArrowDown from './ArrowDown'

import wrong1 from '../../assets/images/wrong1.jpg'
import wrong2 from '../../assets/images/wrong2.jpeg'
import wrong3 from '../../assets/images/wrong3.jpeg'
import wrong4 from '../../assets/images/wrong4.png'
import wrong5 from '../../assets/images/wrong5.jpeg'
import correct1 from '../../assets/images/correct1.jpg'

const useStyles = makeStyles(() => ({
  roller: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#141422b0',
    zIndex: 9,
  },
  colorDefault: {
    color: '#fff',
  },
  backgroundColorDefault: {
    background: '#fff',
    '&:hover': {
      background: 'rgb(194 192 205 / 67%)',
    },
  },
  boxMain: {
    backdropFilter: 'blur(2px) saturate(180%)',
    '-webkit-backdrop-filter': 'blur(2px) saturate(180%)',
    backgroundColor: 'rgba(17, 25, 40, 0.75)',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.125)',
    transition: 'all 2s',
  },
  congratsText: {
    fontSize: 22,
  },
  finishText: {
    fontSize: 40,
  },
}))

const Congrats = () => {
  const classes = useStyles()
  const height = window.innerHeight

  const [appearBox, setAppearBox] = useState(false)
  const [appearFinishBox, setAppearFinishBox] = useState(false)
  const [title, setTitle] = useState(true)
  const [second, setSecondStep] = useState(false)
  const [third, setThirdStep] = useState(false)
  const [fourth, setFourthStep] = useState(false)
  const [fiveCorrect, setFiveCorrectStep] = useState(false)
  const [fiveWrong, setFiveWrongStep] = useState(false)
  const [sixCorrect, setSixCorrectStep] = useState(false)
  const [sixWrong, setSixWrongStep] = useState(false)
  const [sevenCorrect, setSevenCorrectStep] = useState(false)
  const [sevenWrong, setSevenWrongStep] = useState(false)
  const [eightCorrect, setEightCorrectStep] = useState(false)
  const [eightWrong, setEightWrongStep] = useState(false)
  const [nineCorrect, setNineCorrectStep] = useState(false)
  const [nineWrong, setNineWrongStep] = useState(false)

  const [countCorrect, setCountCorrect] = useState(0)
  const [countWrong, setCountWrong] = useState(0)

  const delay = (callback, time) => {
    return new Promise(function (resolve, _) {
      setTimeout(function () {
        callback()
        resolve(true)
      }, time)
    })
  }

  useEffect(() => {
    const initial = () => delay(() => setAppearBox(true), 2000)

    const secondStep = () => delay(() => {
      setSecondStep(true)
    }, 3000)

    const thirdStep = () => delay(() => {
      setThirdStep(true)
      setSecondStep(false)
    }, 3000)

    const queue = async () => {
      const _initial = await initial()

      if (_initial) {
        const _secondStep = await secondStep()

        if (_secondStep) {
          thirdStep()
        }
      }
    }

    queue()
  }, [])

  return (
    <>
      <Fireworks />

      {appearFinishBox && (
        <Box height={1} display="flex" justifyContent="center" alignItems="center" className="fadeIn">
          <Box
            m={2}
            px={3}
            py={6}
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            className={classes.boxMain}
          >
            <Box>
              <Typography className={clsx(classes.colorDefault, classes.finishText)}>
                Parabéns mano 🎉✨🎁
              </Typography>
            </Box>

            <Box mt={3}>
              <Typography className={clsx(classes.colorDefault, classes.finishText)}>
                Tu é incrível!
              </Typography>
            </Box>

            <Box mt={3} textAlign="center">
              {countCorrect < countWrong && (
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Você foi mais no botão vermelho kkkkkk volta lá que tem mais coisa boa pra você
                </Typography>
              )}

              {countWrong < countCorrect && (
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Você foi mais no botão verde kkkkkk volta lá que tem mais umas zoeirinhas pra você
                </Typography>
              )}
            </Box>

            <Box mt={2}>
              <IconButton size='medium' onClick={() => window.location.reload()} className={classes.backgroundColorDefault}>
                <ArrowBack color='primary' />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}

      {appearBox && (
        <Box display="flex" justifyContent="center" alignItems="center" className={`fadeIn ${height < 720? '' : 'height100'}`}>
          <Box
            m={2}
            px={3}
            py={6}
            maxWidth={620}
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            className={classes.boxMain}
          >
            {title && (
              <Box>
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Eai meu consagrado Jadyson!
                </Typography>
              </Box>
            )}

            {second && (
              <Box mt={5} className="fadeIn">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Então...
                </Typography>
              </Box>
            )}

            {third && (
              <Box mt={4} className="fadeIn">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Achou que eu tinha esquecido né
                </Typography>

                <Box mt={12} className="fadeIn" display="flex" justifyContent="center">
                  <ArrowDown onClick={() => {
                    setFourthStep(true)
                    setThirdStep(false)
                  }} />
                </Box>
              </Box>
            )}

            {fourth && (
              <Box mt={4} className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Esqueci mesmo rsrs mas vai clicando aí que quero te mostrar umas coisas.
                </Typography>

                <Box mt={1}>
                  <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                    Decide um caminho bom ou ruim.
                  </Typography>
                </Box>

                <Box mt={12} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setTitle(false)
                      setFiveCorrectStep(true)
                      setFourthStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setTitle(false)
                      setFiveWrongStep(true)
                      setFourthStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {fiveCorrect && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Um cara que aceita minhas congratulações 2 anos atrasado sem me xingar 😍
                </Typography>

                <Box mt={2}>
                  <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                    Clica aí que tem mais kkkk
                  </Typography>
                </Box>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setSixCorrectStep(true)
                      setFiveCorrectStep(false)
                      setFiveWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setSixWrongStep(true)
                      setFiveCorrectStep(false)
                      setFiveWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {fiveWrong && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Apenas um cara bêbado (ou é naturalmente assim)
                </Typography>

                <Box my={2} height={300}>
                  <img src={wrong1} alt="wrong1" />
                </Box>

                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Mas tenta de novo, vai que tem coisa boa
                </Typography>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setSixCorrectStep(true)
                      setFiveCorrectStep(false)
                      setFiveWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setSixWrongStep(true)
                      setFiveCorrectStep(false)
                      setFiveWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {sixCorrect && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Um cara que sempre trata as pessoas da melhor maneira possível, inclusive eu ❤
                </Typography>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setSevenCorrectStep(true)
                      setSixCorrectStep(false)
                      setSixWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setSevenWrongStep(true)
                      setSixCorrectStep(false)
                      setSixWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {sixWrong && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Já teve esse dente de nerdola de 8 anos que joga Free Fire
                </Typography>

                <Box my={2} height={300}>
                  <img src={wrong2} alt="wrong2" />
                </Box>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setSevenCorrectStep(true)
                      setSixCorrectStep(false)
                      setSixWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setSevenWrongStep(true)
                      setSixCorrectStep(false)
                      setSixWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {sevenCorrect && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Ama os animais (É amigo de Gabriele e Izabela) 🐎
                </Typography>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setEightCorrectStep(true)
                      setSevenCorrectStep(false)
                      setSevenWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setEightWrongStep(true)
                      setSevenCorrectStep(false)
                      setSevenWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {sevenWrong && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Mas depois do aparelho ficou sensual 😎
                </Typography>

                <Box my={2} height={300}>
                  <img src={wrong3} alt="wrong3" />
                </Box>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setEightCorrectStep(true)
                      setSevenCorrectStep(false)
                      setSevenWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setEightWrongStep(true)
                      setSevenCorrectStep(false)
                      setSevenWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {eightCorrect && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Se importa com seus amigos mesmo passando um longo tempo sem se falar, e isso diz
                  muito sobre o seu caráter. 💖
                </Typography>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setNineCorrectStep(true)
                      setEightCorrectStep(false)
                      setEightWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setNineWrongStep(true)
                      setEightCorrectStep(false)
                      setEightWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {eightWrong && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Procurei Jadyson no insta e isso que encontrei, pela foto é o verdadeiro.
                </Typography>

                <Box my={2} height={185}>
                  <img src={wrong4} alt="wrong4" style={{ width: '100%' }} />
                </Box>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setNineCorrectStep(true)
                      setEightCorrectStep(false)
                      setEightWrongStep(false)
                    }} />
                  </Box>

                  <Box mx={2}>
                    <ArrowDown color="red" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setNineWrongStep(true)
                      setEightCorrectStep(false)
                      setEightWrongStep(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {nineCorrect && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Me deu pulseiras de presente que guardo até hoje e sempre vou guardar ✌
                </Typography>

                <Box my={2} height={185}>
                  <img src={correct1} alt="correct1" />
                </Box>

                <Box mt={2}>
                  <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                    Enfim, chega de momentos cringe por hoje. Agora
                    imagine uma animação 3D te dando um aperto de mão e um abraço porque
                    o desenvolvedor em questão não tem tal capacidade.
                  </Typography>
                </Box>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountCorrect((current) => current + 1)
                      setAppearFinishBox(true)
                      setAppearBox(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}

            {nineWrong && (
              <Box className="fadeIn" textAlign="center">
                <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                  Não consegui identificar o que quis dizer com esse gesto 😂
                </Typography>

                <Box my={2} height={185}>
                  <img src={wrong5} alt="wrong5" />
                </Box>

                <Box mt={2}>
                  <Typography className={clsx(classes.colorDefault, classes.congratsText)}>
                    Enfim, chega de momentos cringe por hoje. Agora
                    imagine uma animação 3D te dando um aperto de mão e um abraço porque
                    o desenvolvedor em questão não tem tal capacidade.
                  </Typography>
                </Box>

                <Box mt={7} className="fadeIn" display="flex" justifyContent="center">
                  <Box mx={2}>
                    <ArrowDown color="green" onClick={() => {
                      setCountWrong((current) => current + 1)
                      setAppearFinishBox(true)
                      setAppearBox(false)
                    }} />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Congrats
