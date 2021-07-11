import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { Card } from 'antd'
import Inicio from '../view/inicio'

import { Provider } from 'react-redux'
import store from '../view/inicio/store'

import styles from './styles.module.scss'

const Routes = () => {
    return (
        <Provider store={store}>
            <div className={styles.fondoAll + " bg-gray-200 w-full h-screen p-10"}>
                <Card bodyStyle={{ padding: 0, borderRadius: "0.5rem", height: "100%" }} className='rounded-lg bg-transparent border-0 h-full'>
                    <Switch>
                        <Route path="/inicio">
                            <Inicio />
                        </Route>
                        <Redirect to="/inicio" />
                    </Switch>
                </Card>

            </div>
        </Provider>
    )
}

export default Routes