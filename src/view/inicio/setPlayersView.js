import React, { useState } from 'react'
import { Card, Col, Row } from 'antd';
import { Form, Input, InputNumber, Button } from 'antd';
import { Alert } from 'antd';

import { Checkbox } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { globalSelector, setPlayers, setRulesDefaultSelected, setLoading, setFinalRulesForGame } from './store/slice';

const SetPlayersView = () => {
    const dispatch = useDispatch();
    const { players, rules, rulesDefaultSelected, loading } = useSelector(globalSelector);
    const [showAlert, setShowAlert] = useState(false)

    const onFinish = (values) => {
        dispatch(setLoading(true))
        const { players: playersForm, defaultRules, localRules } = values
        dispatch(setPlayers(playersForm))
        if (defaultRules.length !== rules.length) {
            dispatch(setRulesDefaultSelected(defaultRules))
        } else {
            dispatch(setRulesDefaultSelected([]))
        }
        const newArrayRules = localRules.split(";")
        if (newArrayRules.length > 0) {
            dispatch(setFinalRulesForGame([...defaultRules, ...newArrayRules]))
            window.localStorage.setItem('rules', JSON.stringify(newArrayRules))
        } else {
            dispatch(setFinalRulesForGame(defaultRules))
            window.localStorage.removeItem('rules')
        }
        setTimeout(() => {
            dispatch(setLoading(false))
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 1200)
        }, 1000)
    };

    const getLocalRules = () => {
        const localRules = window.localStorage.getItem('rules')
        if (localRules) {
            const arrayForMap = JSON.parse(localRules)
            return arrayForMap.reduce((acc, val) => {
                return (acc === "") ? acc.concat(val) : acc.concat("; ").concat(val)
            }, "")
        } else {
            return ""
        }
    }


    return (
        <div className='w-full h-full'>
            <Card title="Configuración del juego" bordered={false}>
                <Form

                    name="configureRules"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ players: (players !== 0) ? players : 4, defaultRules: (rulesDefaultSelected.length > 0) ? rulesDefaultSelected : rules, localRules: getLocalRules() }}
                    onFinish={onFinish}
                >
                    <Form.Item

                        label="Jugadores"
                        name="players"
                        rules={[{ required: true, message: 'La cantidad de jugadores es obligatoria!' }]}
                    >
                        <InputNumber min={2} max={8} disabled={loading} />
                    </Form.Item>

                    <Form.Item
                        label="Reglas por default"
                        name="defaultRules"
                        rules={[{ required: true, message: 'Sin reglas no se puede jugar 0.o' }]}
                    >
                        <Checkbox.Group className='w-full' style={{ overflow: 'auto', maxHeight: "150px" }}>
                            <Row>
                                {
                                    rules.map((value, index) => {
                                        return (
                                            <Col span={12} key={index}>
                                                <Checkbox disabled={loading} value={value}>{value}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                        label="Reglas locales"
                        name="localRules"
                    >
                        <Input.TextArea rows={5} maxLength={1000} disabled={loading} />
                    </Form.Item>

                    {
                        (showAlert)
                        &&
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {
                                (showAlert)
                                &&
                                <Alert message="Datos guardados" type="success" showIcon />
                            }
                        </Form.Item>
                    }

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

                        <Button type="primary" htmlType="submit" disabled={loading}>
                            Guardar cambios
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}

export default SetPlayersView