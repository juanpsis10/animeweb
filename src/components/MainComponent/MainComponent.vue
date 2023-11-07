<template>
  <div class="main">
    <h1>Animes en emisión</h1>
    <div class="anime-grid">
      <div
        v-for="anime in animeList"
        :key="anime.id"
        class="anime-card"
        @mouseover="hoverCard(true)"
        @mouseleave="hoverCard(false)"
      >
        <img :src="anime.coverImage.extraLarge" alt="Portada del anime" />
        <h2>{{ anime.title.romaji }}</h2>
        <p>{{ anime.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "MainComponent",
  setup() {
    const animeList = ref([]);
    const currentSeason = getCurrentSeason();
    let hoveredIndex = null;

    const hoverCard = (index, hovered) => {
      if (hovered) {
        hoveredIndex = index;
      } else if (hoveredIndex === index) {
        hoveredIndex = null;
      }
    };

    const fetchAnimeData = async () => {
      try {
        const response = await axios.post("https://graphql.anilist.co", {
          query: `
            query ($season: MediaSeason, $seasonYear: Int) {
              Page(page: 1, perPage: 40) {
                media(season: $season, seasonYear: $seasonYear, status: RELEASING, type: ANIME) {
                  id
                  title {
                    romaji
                    english
                    native
                  }
                  coverImage {
                    extraLarge
                  }
                }
              }
            }
          `,
          variables: {
            season: currentSeason.season,
            seasonYear: currentSeason.year,
          },
        });
        animeList.value = response.data.data.Page.media;
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    onMounted(() => {
      fetchAnimeData();
    });

    return {
      animeList,
      hoverCard,
      hoveredIndex,
    };
  },
};

function getCurrentSeason() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  // Define the ranges for each season
  const seasons = [
    { season: "WINTER", startMonth: 1, endMonth: 3 },
    { season: "SPRING", startMonth: 4, endMonth: 6 },
    { season: "SUMMER", startMonth: 7, endMonth: 9 },
    { season: "FALL", startMonth: 10, endMonth: 12 },
  ];

  // Determine the current season based on the month
  let currentSeason = "WINTER";
  for (const season of seasons) {
    if (month >= season.startMonth && month <= season.endMonth) {
      currentSeason = season.season;
      break;
    }
  }

  return { season: currentSeason, year };
}
</script>

<style scoped>
.main {
  background-color: #1e1f22;
}
.anime-grid {
  background-color: #232428;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5%; /* Márgenes de un 5% desde todos los bordes */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra */
  border-radius: 10px; /* Bordes redondeados */
  padding: 3%; /* Separación de las cartas del borde */
}

.anime-card {
  width: 11%; /* 40 cartas por página */
  margin-bottom: 20px;
  background-color: #111214;
  text-align: center;
  margin-right: 10px; /* Margen entre cartas */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra en cada carta */
  border-radius: 10%; /* Bordes redondeados para hacerlas circulares */
  overflow: hidden; /* Asegura que las imágenes no salgan del borde redondeado */
  transition: transform 0.3s, box-shadow 0.3s; /* Transición en transform y box-shadow */
}

.anime-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.anime-card img {
  width: 100%;
}

.anime-card h2 {
  color: #ffffff;
  margin-top: 10px;
  font-size: 80%; /* Tamaño de fuente al 80% del tamaño actual */
}
</style>
