export const state = () => ({
  counter: 0,
  errors: [],
  alerts: [],
  lastError: 0,
  lastAlert: 0,
  isActive: false,
  order: 'created_at',
  sort: true,
  search: null,

})

export const getters = {
  getAlerts(state) {
    return state.alerts;
  },
  isActive(state) {
    return state.isActive;
  },
  getErrors(state) {
    return state.errors;
  },
  fixDate: (state) => (date) => {
    if (date == null || date === "null" || date ==="Brak") {
      return date;
    }
    return date[0] + date[1] + date[2] + date[3] + "-" + date[5] + date[6] + "-" + date[8] + date[9] + " " + date[11] + date[12] + ":" + date[14] + date[15];
  },
  equalIgnoreCase: (state) => (a, b) => {
    return a.toLowerCase() === b.toLowerCase();
  },
  containsIgnoreCase: (state) => (a, b) => {
    return a.toLowerCase().includes(b.toLocaleString())
  },
  getOrder(state) {
    return state.order;
  },
  getSort(state) {
    return state.sort;
  },
  getSearch(state) {
    return state.search;
  }
}

export const mutations = {
  clearErrors(state, alert) {
    state.errors = alert;
  },
  setErrors(state, alert) {
    if (state.lastError > Date.now()) {
      return;
    }
    state.errors.push(alert);
    state.lastError = Date.now() + 500;
  },
  setOrder(state,order) {
    state.order = order
  },
  setSort(state,sort) {
    state.sort = sort
  },
  setSearch(state,search) {
    state.search = search;
  },

  clearAlerts(state, alert) {
    state.alerts = alert;
  },
  setAlerts(state, alert) {
    if (state.lastAlert > Date.now()) {
      return;
    }
    state.alerts.push(alert);
    state.lastAlert = Date.now() + 500;
  },

  setActive(state) {
    state.isActive = !state.isActive;
  },
  resetActive(state) {
    state.isActive = false;
  },
}

export const actions = {
  addAlert({state, commit}, payload) {
    commit('setAlerts', payload);
    setTimeout(() => {
      var tmp = [];
      state.alerts.forEach(v => {
        if (v === payload) {
          return
        }
        tmp.push(v);
      });
      commit('clearAlerts', tmp);
    }, 20000)
  },
  removeAlert({state, commit}, payload) {
    var tmp = [];
    state.alerts.forEach(v => {
      if (v === payload) {
        return
      }
      tmp.push(v);
    });
    commit('clearAlerts', tmp);
  },
  removeError({state, commit}, payload) {
    var tmp = [];
    state.errors.forEach(v => {
      if (v === payload) {
        return
      }
      tmp.push(v);
    });
    commit('clearErrors', tmp);
  },
  addError({state, commit}, payload) {
    commit('setErrors', payload);
    setTimeout(() => {
      var tmp = [];
      state.errors.forEach(v => {
        if (v === payload) {
          return
        }
        tmp.push(v);
      });
      commit('clearErrors', tmp);
    }, 20000)
  }
}
