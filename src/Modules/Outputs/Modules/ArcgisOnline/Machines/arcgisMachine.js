import * as R from 'ramda'
import { Machine, assign } from 'xstate'

import * as api from '../Api'
import { openWindow } from 'Modules/Core'

const services = {
  fetchIframeUrl: async () => {
    const res = await api.getArcgisUrl()
    return res.data
  },
  listenStorage: () => callback => {
    function check(e) {
      if (e.key === 'arcgis-connect' && e.newValue === 'true') {
        callback('CONTINUE')
      }
    }

    window.addEventListener('storage', check, false)
    return () => {
      window.removeEventListener('storage', check, false)
    }
  },
  fetchArcgisAccount: async () => {
    const res = await api.getArcgisAccount()
    return res.data
  },
  disconnect: async () => {
    return api.disconnect()
  }
}

const actions = {
  setIframeUrl: assign((ctx, ev) => {
    const url = R.path(['data', 'authorizationUrl'], ev)
    return R.assoc('url', url, ctx)
  }),
  setData: assign((ctx, ev) => {
    return R.assoc('data', ev.data, ctx)
  }),
  setConnection: assign((ctx, ev) => {
    const isConnected = R.path(['data', 'isConnected'], ev)
    return R.pipe(
      R.assoc('status', isConnected ? 'online' : 'offline'),
      R.assoc('data', ev.data)
    )(ctx)
  }),
  openUrl: ctx => {
    openWindow(ctx.url)
  }
}

const machine = Machine({
  id: 'arcgis',
  initial: 'checking',
  context: {
    status: 'offline',
    url: null,
    data: null
  },
  states: {
    checking: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchArcgisAccount',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'setConnection',
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      },
      onDone: {
        target: 'idle'
      }
    },
    idle: {
      on: {
        CONNECT: {
          target: 'loadingIframeUrl'
        },
        DISCONNECT: {
          target: 'disconnecting'
        }
      }
    },
    loadingIframeUrl: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchIframeUrl',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: ['setIframeUrl', 'openUrl'],
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      },
      onDone: {
        target: 'waitingAuth'
      }
    },
    waitingAuth: {
      invoke: {
        src: 'listenStorage'
      },
      on: {
        CONTINUE: {
          target: 'connecting'
        },
        CONNECT: {
          target: 'loadingIframeUrl'
        }
      }
    },
    connecting: {
      on: {
        DISCONNECT: {
          target: 'disconnecting'
        }
      },
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'fetchArcgisAccount',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      },
      onDone: {
        target: 'checking'
      }
    },
    disconnecting: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'disconnect',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          type: 'final'
        },
        failure: {
          type: 'final'
        }
      },
      onDone: {
        target: 'checking'
      }
    }
  }
})

export const arcgisMachine = machine.withConfig({
  actions,
  services
})
