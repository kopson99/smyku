<template>
  <div class="app">

    <div class="main">
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


      <NavBar/>
      <div class="container" v-bind:class="{active: $store.getters['store/isActive']}">
        <div class="user-container">
          <div class="user">
            <font-awesome-icon icon="fa-solid fa-user" />
          </div>
        </div>
        <div class="router-container">
          <nuxt/>
        </div>

      </div>
      <!--      <FootBar/>-->
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import FootBar from "@/components/Footbar";

export default {
  middleware: ['auth'],
  components: {FootBar, NavBar},
  methods: {
    removeAlert(payload) {
      this.$store.dispatch('store/removeAlert', payload);
    },
    removeError(payload) {
      this.$store.dispatch('store/removeError', payload);
    },
  }
}
</script>
