<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'

const zoom = ref(13)
const center = ref([47.4979, 19.0402]) // Budapest
</script>

<template>
  <div class="h-[calc(100vh-60px)] w-full">
    <l-map 
      :zoom="zoom" 
      :center="center" 
      class="h-full w-full"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </l-map>
  </div>
</template>
