import React, { useState, useEffect } from 'react'
import { Steps, Layout, Divider  } from 'antd';
import { UserOutlined, PlayCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import Lottie from 'react-lottie'
import animationData from '../../assets/loadingLottie.json'

import { useSelector, useDispatch } from 'react-redux';
import { globalSelector, setRules, setTabActive } from './store/slice';

import SetPlayerView from './setPlayersView'
import GameView from './gameView'

const { Header, Content } = Layout;
const { Step } = Steps;

const contentSteps = {
    "0": <SetPlayerView/>,
    "1": <GameView/>
}

const Inicio = () => {
    const dispatch = useDispatch();
    const { tabActive, loading, finalRulesForGame } = useSelector(globalSelector);
    const [loadingRules, setLoadingRules] = useState(true)

    const onChangeStep = (value) => {
        dispatch(setTabActive(value))
    }

    useEffect(() => {
        axios.get('https://api.npoint.io/297a9bc9d4e958b70234')
            .then(function (response) {
                const { data } = response
                dispatch(setRules(data.rules))
                setTimeout(() => {
                    setLoadingRules(false)
                }, 3000)
            })
            .catch(function (error) {
                setTimeout(() => {
                    setLoadingRules(false)
                }, 5000)
            })
    }, [])

    return (
        <Layout className='rounded-lg bg-transparent min-h-full'>
            <Header className='rounded-lg bg-indigo-900 flex'>
                <h1 className='text-white text-center text-3xl my-auto mx-auto'>SMASH REGLAS RANDOM</h1>
            </Header>
            {
                (loadingRules)
                    ?
                    <Content className='rounded-lg p-5 bg-gray-700'>
                        <Lottie options={{
                            loop: true,
                            autoplay: true,
                            animationData: animationData,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }} width={"100vh"} height={"60vh"} />
                    </Content>
                    :
                    <Content className='rounded-lg p-2 bg-white h-full flex flex-col'>
                        <Steps className='rounded-lg w-1/4 mx-auto' current={tabActive} onChange={onChangeStep}>
                            <Step disabled={loading} title="Reglas" icon={<UserOutlined />} />
                            <Step disabled={loading || finalRulesForGame.length === 0} title="Jugar" icon={<PlayCircleOutlined />} />
                        </Steps>
                        <Divider className='mb-0' />
                        <Content className='h-full'>
                            {
                                contentSteps[tabActive]
                            }
                        </Content>
                    </Content>
            }
        </Layout>
    )
}

export default Inicio