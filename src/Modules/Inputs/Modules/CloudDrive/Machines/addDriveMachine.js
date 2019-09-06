import * as R from 'ramda'
import { Machine, assign } from 'xstate'
import { message } from 'antd'

import * as api from '../Api'
import { openWindow, handlers } from 'Modules/Core'

const services = {
  getRequestUrl: async () => {
    const res = await api.getRequestUrl()
    return res.data
  },
  listenStorage: () => callback => {
    function check(e) {
      if (e.key === 'cloud-drive-auth' && e.newValue === 'true') {
        callback('CONTINUE')
      }
    }

    window.addEventListener('storage', check, false)
    return () => {
      window.removeEventListener('storage', check, false)
    }
  },
  getFiles: async () => {
    const res = await api.getFiles()
    return res.data
  },
  getSheets: async ctx => {
    const res = await api.getSheets(ctx.selectedFile.id)
    return res.data
  },
  addNewDocument: async (_, ev) => {
    const data = R.evolve({ sheetIds: JSON.stringify }, ev.data)
    return api.addNewDocument(data)
  }
}

const actions = {
  openPopup: (_, ev) => {
    openWindow(R.path(['data', 'authorizationUrl'], ev))
  },
  setFiles: assign((ctx, ev) => {
    const files = R.path(['data', 'results'], ev)
    return R.assoc('files', files, ctx)
  }),
  setSelectedFile: assign((ctx, ev) => {
    return R.assoc('selectedFile', ev.data, ctx)
  }),
  setSheets: assign((ctx, ev) => {
    const sheets = R.path(['data', 'results'], ev)
    return R.assoc('sheets', sheets, ctx)
  })
}

const guards = {
  isAuthenticated: () => {
    return JSON.parse(localStorage.getItem('cloud-drive-auth'))
  }
}

const machine = Machine({
  id: 'addDrive',
  initial: 'idle',
  context: {
    files: null,
    selectedFile: null,
    sheets: null
  },
  on: {
    OPEN_MODAL: [
      { target: 'gettingFiles', cond: 'isAuthenticated' },
      { target: 'authenticating' }
    ]
  },
  states: {
    idle: {},
    authenticating: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'getRequestUrl',
            onDone: 'success',
            onError: 'failure'
          }
        },
        success: {
          onEntry: 'openPopup',
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
          target: 'gettingFiles'
        }
      }
    },
    gettingFiles: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            src: 'getFiles',
            onDone: 'success',
            onError: '#addDrive.authenticating'
          }
        },
        success: {
          onEntry: 'setFiles',
          type: 'final'
        }
      },
      onDone: {
        target: 'adding'
      }
    },
    adding: {
      initial: 'listingFiles',
      on: {
        CLOSE_MODAL: {
          target: 'idle'
        }
      },
      states: {
        listingFiles: {
          on: {
            SELECT_FILE: {
              actions: 'setSelectedFile',
              target: 'fetchingSheets'
            }
          }
        },
        fetchingSheets: {
          initial: 'loading',
          states: {
            loading: {
              invoke: {
                src: 'getSheets',
                onDone: 'success',
                onError: 'failure'
              }
            },
            success: {
              onEntry: 'setSheets',
              type: 'final'
            },
            failure: {
              type: 'final'
            }
          },
          onDone: {
            target: 'selectingOptions'
          }
        },
        selectingOptions: {
          on: {
            BACK: 'listingFiles',
            SUBMIT: 'submitting'
          }
        },
        submitting: {
          initial: 'loading',
          states: {
            loading: {
              invoke: {
                src: 'addNewDocument',
                onDone: 'success',
                onError: {
                  actions: handlers.formSubmitHandler,
                  target: '#addDrive.adding.selectingOptions'
                }
              }
            },
            success: {
              type: 'final',
              onEntry: () => {
                message.success('Document added successfully!')
              }
            }
          },
          onDone: {
            target: 'added'
          }
        },
        added: {
          onEntry: 'notifySuccess',
          type: 'final'
        }
      },
      onDone: {
        target: 'idle'
      }
    }
  }
})

export const addDriveMachine = machine.withConfig({
  actions,
  services,
  guards
})
