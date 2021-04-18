export default {
  SET_TOGGLE_SIDEBAR (state) {
    state.isSidebarOpen = !state.isSidebarOpen
  },
  SET_TOGGLE_USERS (state) {
    state.isUsersOpen = !state.isUsersOpen
  },
  SET_TOGGLE_INVENTORY (state) {
    state.isInventoryOpen = !state.isInventoryOpen
  }
}
