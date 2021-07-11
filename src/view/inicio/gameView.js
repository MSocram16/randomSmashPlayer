import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { globalSelector, setFinalRulesForGame } from './store/slice';
import { Carousel, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const GameView = () => {

    const dispatch = useDispatch();
    const { finalRulesForGame, loading } = useSelector(globalSelector);
    const [isGenerate, setIsGenerate] = useState(false)
    const [intervalID, setIntervalID] = useState()
    const [closeInterval] = useState(false)
    const [firstMount, setFirstMount] = useState(true)
    const [indexRemove, setIndexRemove] = useState(null)

    const refCarrousel = useRef();

    useEffect(() => {
        if (refCarrousel?.current?.goTo) { refCarrousel.current.goTo(Math.floor(Math.random() * finalRulesForGame.length - 1), false) }
    }, [])

    useEffect(() => {
        if (!isGenerate && !firstMount) {
            clearInterval(intervalID)
            const windowFind = document.getElementsByClassName("slick-slide slick-active slick-current")
            if (windowFind[0]?.attributes) {
                const index = windowFind[0]?.attributes["data-index"]["nodeValue"]
                setIndexRemove(index)
            }
        }
        return () => {
            clearInterval(intervalID)
        }
    }, [closeInterval, isGenerate])

    const onClickButton = () => {
        setIsGenerate(true)
        if (indexRemove) {
            let newArray = [...finalRulesForGame]
            newArray = newArray.filter((val, ind) => ind !== parseInt(indexRemove))
            dispatch(setFinalRulesForGame(newArray))
        }
        if (refCarrousel?.current?.goTo) {
            refCarrousel.current.next()
            refCarrousel.current.next()
            refCarrousel.current.next()
            refCarrousel.current.next()
            refCarrousel.current.next()
        }
        setTimeout(() => {
            const newInterval = setInterval(() => {
                if (refCarrousel?.current?.goTo) {
                    const random = Math.floor(Math.random() * finalRulesForGame.length - 1)
                    refCarrousel.current.goTo(random, false)
                }
            }, 30)
            setIntervalID(newInterval)
            setTimeout(() => {
                setFirstMount(false)
                clearInterval(newInterval)
                setIsGenerate(false)
            }, 5000)
        },300)
    }

    return (
        <div className="w-2/3 mx-auto flex flex-col">
            <Carousel dots={false} effect="fade" ref={refCarrousel}>
                {
                    finalRulesForGame.map((value, index) => {
                        return (
                            <div key={index} className='w-full bg-purple-50 h-full pt-20 pb-32' >
                                <h3 data-index={index} className="text-center text-4xl font-semibold capitalize mx-3">{value}</h3>
                            </div>
                        )
                    })
                }
            </Carousel>
            <Button disabled={loading || isGenerate} type="primary" icon={<PlayCircleOutlined />} size={"large"} onClick={() => onClickButton()}>Generar regla</Button>
        </div>
    )
}

export default GameView