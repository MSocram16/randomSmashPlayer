import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        tabActive: 0,
        players: 0,
        rules: [],
        rulesDefaultSelected: [],
        arrayIndexUsed: [],
        finalRulesForGame: [],
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setTabActive: (state, action) => {
            state.tabActive = action.payload
        },
        setPlayers: (state, action) => {
            state.players = action.payload
        },
        setRules: (state, action) => {
            state.rules = action.payload
        },
        setRulesDefaultSelected: (state, action) => {
            state.rulesDefaultSelected = action.payload
        },
        setIndexUsed: (state, action) => {
            state.arrayIndexUsed = [...state.arrayIndexUsed, action.payload]
        },
        setFinalRulesForGame: (state, action) => {
            state.finalRulesForGame = action.payload
        }
    }
})

export const { setPlayers, setRules, setIndexUsed, setFinalRulesForGame, setTabActive, setRulesDefaultSelected, setLoading } = globalSlice.actions

export const globalSelector = (state) => state.global;

export default globalSlice.reducer
