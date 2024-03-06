import { createPinia } from 'pinia'

export const install = ({ isClient, initialState, app }) => {
    const pinia = createPinia()
    app.use(pinia)
    if (isClient)
        pinia.state.value = (initialState.pinia) || {}

    else
        initialState.pinia = pinia.state.value
}