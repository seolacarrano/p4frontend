<template>
  <b-carousel>
    <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
      <figure class="image">
        <img :src="carousel.image">
      </figure>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
   data(){
        return {
            carousels: [
                { image: 'https://res.cloudinary.com/dqduwnrb1/image/upload/v1600711716/Screen_Shot_2020-09-21_at_2.06.17_PM_jyrzcl.png'},
                { image: 'https://res.cloudinary.com/dqduwnrb1/image/upload/v1600711716/Screen_Shot_2020-09-21_at_2.06.33_PM_wtegrd.png' },
                { image: 'https://res.cloudinary.com/dqduwnrb1/image/upload/v1600711716/Screen_Shot_2020-09-21_at_2.07.30_PM_exovua.png' },
                { image: 'https://res.cloudinary.com/dqduwnrb1/image/upload/v1600711716/Screen_Shot_2020-09-21_at_2.07.46_PM_o5z8ug.png' }
            ]
        }
    }
}
</script>

<style>
.is-active .al img {
    filter: grayscale(0%);
}
.al img {
    filter: grayscale(100%);
}

.image{
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
}
</style>



