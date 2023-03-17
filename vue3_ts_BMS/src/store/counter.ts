import { defineStore } from 'pinia'

const useCounterStore = defineStore('connter', {
  // 需要返回的是一个对象
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounterAction(newCounter: number) {
      this.counter = newCounter
    }
  }
})

export default useCounterStore