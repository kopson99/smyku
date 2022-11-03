<template>
  <div>
    <nav>
      <ul class="ul-parent">
        <li>
          <router-link :to="{name: 'home'}">
            <font-awesome-icon icon="fa-solid fa-gauge"/>
            <span>Home</span></router-link>
        </li>
        <li @click="logout">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket"/>
          <span>Wyloguj</span>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    async logout() {
      try {
        await this.$auth.logout('local');
        await this.$router.push('/login')
        await this.$store.dispatch('store/addAlert', "Zostałes pomyślnie wylogowny")
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>
