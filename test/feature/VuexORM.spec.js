import Vuex from 'vuex'
import VuexORM from 'app'

describe('Feature – Vuex ORM', () => {
  class User extends VuexORM.Model {
    static entity = 'users'
  }

  class Post extends VuexORM.Model {
    static entity = 'posts'
  }

  const users = {}
  const posts = {}

  it('can install Vuex ORM to the Vuex', () => {
    const database = new VuexORM.Database()

    database.register(User, users)
    database.register(Post, posts)

    const store = new Vuex.Store({
      plugins: [VuexORM.install(database)]
    })

    expect(store.state.entities.$name).toBe('entities')
    expect(store.state.entities.users.$name).toBe('users')
    expect(store.state.entities.posts.$name).toBe('posts')
  })

  it('can install Vuex ORM to the Vuex under a custom namespace', () => {
    const database = new VuexORM.Database()

    database.register(User, users)
    database.register(Post, posts)

    const options = { namespace: 'my_entities' }

    const store = new Vuex.Store({
      plugins: [VuexORM.install(database, options)]
    })

    expect(store.state.my_entities.$name).toBe('my_entities')
    expect(store.state.my_entities.users.$name).toBe('users')
    expect(store.state.my_entities.posts.$name).toBe('posts')
  })
})
