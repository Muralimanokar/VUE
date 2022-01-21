export default {
    namespaced: true,
    state: {
        counter: 10
    },
    getters : {
        getcounter(state){
            //return "some value return";
            return state.counter;
        }
    },
    mutations : {
        INCREASE_COUNT(state, newValue) {
            state.counter = state.counter + newValue;
        },
        DECREASE_COUNT(state, newValue) {
            state.counter = state.counter - newValue;
        }
    },
    actions : {
        init({ state, dispatch }) {
            dispatch('increamentCounter',100);
         },
        increamentCounter({ commit}, newvalue) {
            commit('INCREASE_COUNT', newvalue)
        },
        descreaseCounter({ commit }, newvalue) {
            commit('DECREASE_COUNT', newvalue)
        },
    }
}
