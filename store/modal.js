const state = () => ({
  modalArray: []
})

const actions = {
  setOpenModal ({ commit }, currentModalId) {
    commit('BEFORE_OPEN', currentModalId)
    commit('OPEN', currentModalId)
  },
  setCloseModal ({ commit }, currentModalId) {
    commit('BEFORE_CLOSE', currentModalId)
    commit('CLOSE', currentModalId)
  }
}

const mutations = {
  BEFORE_OPEN (currentModalId) {
    return currentModalId
  },
  OPEN (state, currentModalId) {
    const index = state.modalArray.findIndex(function (modalId) {
      return currentModalId === modalId
    })

    if (index === -1) {
      state.modalArray.push(currentModalId)
    } else {
      state.modalArray[index] = currentModalId
    }
  },
  BEFORE_CLOSE (currentModalId) {
    return currentModalId
  },
  CLOSE (state, currentModalId) {
    const index = state.modalArray.findIndex(function (modalId) {
      return modalId === currentModalId
    })
    if (index !== -1) {
      state.modalArray.splice(index, 1)
    }
  }
}

const getters = {
  getModals: state => state.modalArray
}

export {
  state,
  getters,
  mutations,
  actions
}

export default {
  state,
  getters,
  actions,
  mutations
}
