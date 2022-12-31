<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark"
      ><img
        src="https://api.maptiler.com/resources/logo.svg"
        alt="MapTiler logo"
    /></a>
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script>
import { Map, NavigationControl, Marker } from "maplibre-gl";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";

export default {
  name: "map-comp",
  setup() {
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);

    onMounted(() => {
      const apiKey = "ZwtP3C6lWvxJUocyoBkP";

      const initialState = { lng: 14.891921, lat: 38.162442, zoom: 14 };

      map.value = markRaw(
        new Map({
          container: mapContainer.value,
          style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        })
      );
      map.value.addControl(new NavigationControl(), "top-right");
      new Marker({ color: "#FF0000" })
        .setLngLat([initialState.lng, initialState.lat])
        .addTo(map.value);
    }),
      onUnmounted(() => {
        map.value?.remove();
      });

    return {
      map,
      mapContainer,
    };
  },
};
</script>


<style scoped>
@import "~maplibre-gl/dist/maplibre-gl.css";

.map-wrap {
  position: relative;
  width: 66vw;
  height: 600px;
  margin: 10vh auto;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>