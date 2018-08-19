import Vuex from "vuex";
import Axios from "Axios"

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return Axios.get('https://mynuxtapp-7b534.firebaseio.com/posts.json')
          .then(res => {
            const postArray = []
            for (const key in res.data){
              postArray.push({...res.data[key], id: key})
            }
            vuexContext.commit('setPosts', postArray)
          })
          .catch(e => console.log(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts)
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    }
  });
};

export default createStore
