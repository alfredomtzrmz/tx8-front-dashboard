export const state = () => ({
  isSidebarOpen: false
})

export const mutations = {
  SET_TOGGLE_SIDEBAR (state) {
    state.isSidebarOpen = !state.isSidebarOpen
  }
}
export const getters = {
  getIsSidebarOpen: state => state.isSidebarOpen
}

export const actions = {
  setSidebarOpen ({ commit }) {
    commit('SET_TOGGLE_SIDEBAR')
  }
}
