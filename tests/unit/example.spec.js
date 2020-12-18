import { shallowMount, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue';
import { nextTick } from 'vue';
import { createStore } from 'vuex';

const createVuexStore = () => {
  return createStore({
    state() {
      return {
        counter: 0
      }
    },
    mutations: {
      increment(state, payload) {
        console.log(payload);
        state.counter += 10;
      }
    },
    actions: {
      increment(context, payload) {
        context.commit('increment', payload);
      }
    }
  })
}

const store = createVuexStore();

const factory = (component, props) => {
  return shallowMount(component, {
    props, global: {
      plugins: [store],
      mocks: {
        $route: {
          params: {
            id: '1'
          }
        }
      }
    }
  });
}

const factoryData = (component, data) => {
  return shallowMount(component, {
    ...data, global: {
      plugins: [store],
      mocks: {
        $route: {
          params: {
            id: '1'
          }
        }
      }
    }
  });
}

const factoryState = (component) => {
  return shallowMount(component, {
    global: {
      plugins: [store],
      mocks: {
        $route: {
          params: {
            id: '1'
          }
        }
      }
    }
  });
}

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = factory(HelloWorld, { msg });
    expect(wrapper.text()).toMatch(msg)
  })

  it('render data msg ', () => {
    const message = 'new message';
    const wrapper = factoryData(HelloWorld, {
      data() {
        return {
          message: message
        }
      }
    });
    expect(wrapper.text()).toMatch(message)
  })

  it('check count ', async () => {
    const wrapper = factoryData(HelloWorld, {
      data() {
        return {
        }
      }
    });
    wrapper.find('button').trigger('click');
    await nextTick();
    expect(wrapper.text()).toContain(1 + '')
    expect(wrapper.vm.count).toBe(1)
  })

  it('test store counter', async () => {
    const wrapper = factoryState(HelloWorld);
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('store counter: 20')
  })

  it('check route params', async () => {
    const wrapper = factoryState(HelloWorld);
    expect(wrapper.text()).toContain('route param: 1')
  })
})
