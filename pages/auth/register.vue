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
    <div class="title">Zarejestruj się</div>

    <form class="auth-form" @submit.prevent="register" method="post">
      <label class="auth-label">Podaj email</label>
      <div class="input-container">
        <i class="far fa-user"></i>
        <input class="input" type="email" v-model="credentials.email" minlength="4" required
               placeholder="Wprowadź email">
      </div>

      <label class="auth-label">Podaj login</label>
      <div class="input-container">
        <i class="far fa-user"></i>
        <input class="input" type="text" v-model="credentials.username" minlength="4" required
               placeholder="Wprowadź nazwę użytkownika">
      </div>

      <label class="auth-label">Podaj hasło</label>
      <div class="input-container">
        <i class="fas fa-lock"></i>
        <input id="password" class="input" type="password" v-model="credentials.password" minlength="4" required
               placeholder="Wprowadź hasło">

        <font-awesome-icon class="show_password" v-if="!hidden" icon="fa-solid fa-eye" v-on:click="reset"/>
        <font-awesome-icon class="hidden_password" v-else icon="fa-solid fa-eye-slash" v-on:click="reset"/>

      </div>

      <label class="auth-label">Powtórz hasło</label>
      <div class="input-container">
        <i class="fas fa-lock"></i>
        <input id="password2" class="input" type="password" v-model="credentials.password_confirmed" minlength="4"
               required
               placeholder="Wprowadź hasło">

        <font-awesome-icon class="show_password" v-if="!hidden" icon="fa-solid fa-eye" v-on:click="reset"/>
        <font-awesome-icon class="hidden_password" v-else icon="fa-solid fa-eye-slash" v-on:click="reset"/>

      </div>


      <button class="auth-button" type="submit">Zarejestruj <i class="fas fa-angle-right"></i></button>
    </form>

    <div class="links">
      Masz już konto?
      <router-link :to="{name: 'login'}">Kliknij tutaj,</router-link>
      aby się zalogować
    </div>
  </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      hidden: false,
      credentials: {
        email: null,
        username: null,
        password: null,
        password_confirmed: null
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
    async register() {
      try {
        await this.$axios.post('/auth/register', this.credentials);
          await this.$store.dispatch('store/addAlert', "Konto zostało pomyślnie założone")
          await this.$router.push({name: 'login'})
      } catch (err) {
        console.log(err)
        await this.$store.dispatch('store/addError', err.response.data.message)
      }

    },
    reset() {
      this.hidden = !this.hidden;
      if (this.hidden) {
        document.getElementById("password2").type = "text";
        document.getElementById("password").type = "text";
      } else {
        document.getElementById("password2").type = "password";
        document.getElementById("password").type = "password";
      }
    },
  }
}
</script>

<style lang="sass" >
@import "assets/sass/auth"
</style>
