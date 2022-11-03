<template>

<div class="auth-container">
  <div class="auth-form-container">
    <div class="app-alerts-container">
      <div class="app-alerts" v-for="alert in $store.getters['store/getAlerts']" data-aos="fade-up"
           data-aos-delay="250">

        <div class="icon">
          <font-awesome-icon icon="fa-regular fa-face-smile"/>
        </div>
        <div class="message">
          <div class="title">Sukces</div>
          <p>
            {{ alert }}
          </p>

          <div class="closeMessage" @click="removeAlert(alert)">
            <font-awesome-icon icon="fa-solid fa-x"/>
          </div>
        </div>
      </div>

      <div class="app-errors" v-for="alert in $store.getters['store/getErrors']" data-aos="fade-up"
           data-aos-delay="250">

        <div class="icon">
          <font-awesome-icon icon="fa-regular fa-face-sad-tear"/>
        </div>
        <div class="message">
          <div class="title">Porażka</div>
          <p>
            {{ alert }}
          </p>

          <div class="closeMessage" @click="removeError(alert)">
            <font-awesome-icon icon="fa-solid fa-x"/>
          </div>
        </div>
      </div>
    </div>
    <div class="title">Zaloguj się</div>

    <form class="auth-form"  @submit.prevent="userLogin" method="post">
      <label class="auth-label">Podaj login</label>
      <div class="input-container">
        <i class="far fa-user"></i>
        <input class="input" type="text" v-model="login.username" minlength="4" required
               placeholder="Wprowadź nazwę użytkownika lub email">


      </div>
      <label class="auth-label">Podaj hasło</label>
      <div class="input-container">
        <i class="fas fa-lock"></i>
        <input id="password" class="input" type="password" v-model="login.password" minlength="4" required
               placeholder="Wprowadź hasło">

        <font-awesome-icon id="show_password" v-if="!hidden" icon="fa-solid fa-eye" v-on:click="reset"/>
        <font-awesome-icon id="hidden_password" v-else icon="fa-solid fa-eye-slash" v-on:click="reset"/>

      </div>
<!--      <router-link to="" class="remember-password">Zapomniałeś hasła?</router-link>-->


      <button class="auth-button" type="submit">Zaloguj <i class="fas fa-angle-right"></i></button>
    </form>

        <div class="links">
          Nie masz jeszcze konta? <router-link :to="{name: 'register'}">Kliknij tutaj, </router-link>aby się zarejestrować
        </div>
  </div>
</div>
</template>
<script>
export default {
  middleware: 'auth',
  auth : 'guest',
  data() {
    return {
      hidden: false,
      login: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    removeAlert(payload) {
      this.$store.dispatch('store/removeAlert', payload);
    },
    removeError(payload) {
      this.$store.dispatch('store/removeError', payload);
    },

    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', {data: this.login});
        console.log(response)
      } catch (err) {
        console.log(err.response.data.message)
        await this.$store.dispatch('store/addError', err.response.data.message)

      }
    },
    reset() {
      this.hidden = !this.hidden;
      if (this.hidden) {
        document.getElementById("password").type = "text";
      } else {
        document.getElementById("password").type = "password";
      }
    },
  }
}
</script>

<style lang="sass" >
@import "assets/sass/auth"
</style>
