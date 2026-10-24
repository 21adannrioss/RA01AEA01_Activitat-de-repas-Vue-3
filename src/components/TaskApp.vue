<script setup>
import { ref, computed } from 'vue'

// Funció per donar el mateix format a totes les dates (dd/mm/aaaa)
function formatarData(data) {
  return data.toLocaleDateString('ca-ES')
}

// Dades reactives del component
const llistaTasques = ref([
  {id: 1, titol: 'Rentar o guardar els plats', completada: true, dataCreacio: formatarData(new Date(2026, 9, 17))},
  {id: 2, titol: 'Treure les escombraries', completada: false, dataCreacio: formatarData(new Date(2026, 9, 17))},
  {id: 3, titol: 'Fer el llit', completada: true, dataCreacio: formatarData(new Date(2026, 9, 17))},
  {id: 4, titol: 'Respondre un correu', completada: false, dataCreacio: formatarData(new Date(2026, 9, 17))}
])

// Text que l'usuari escriu a l'input amb v-model
const textNovaTasca = ref('')

// Casella "Mostra només pendents" amb v-model
const nomesPendents = ref(false)

// Per mostrar un avís si intenta afegir una tasca buida amb v-show
const mostrarAvis = ref(false)

// Comptador per donar un id diferent a cada tasca nova
let seguentId = llistaTasques.value.length + 1


// Propietats computed

// Totes les tasques o només les pendents segons la casella
const tasquesVisibles = computed(() => {
  if(nomesPendents.value) return llistaTasques.value.filter((tasca) => !tasca.completada)
  return llistaTasques.value
})

// Nombre total de tasques
const totalTasques = computed(() => llistaTasques.value.length)

// Nombre de tasques que encara no estan completades
const totalPendents = computed(() => {
  return llistaTasques.value.filter((tasca) => !tasca.completada).length
})


// Funcions del component

// Afegeix una tasca nova a la llista
function afegirTasca() {
  const titol = textNovaTasca.value.trim() // trec els espais dels costats

  // Si està buit no s'afegeix i es mostra l'avís
  if(titol === '') {
    mostrarAvis.value = true
    return
  }

  llistaTasques.value.push({id: seguentId, titol: titol, completada: false, dataCreacio: formatarData(new Date())})

  seguentId++
  textNovaTasca.value = ''
  mostrarAvis.value = false
}

// Canvia entre completada i pendent
function canviarEstat(tasca) {
  tasca.completada = !tasca.completada
}

// Elimina la tasca que tingui aquest id
function eliminarTasca(idTasca) {
  llistaTasques.value = llistaTasques.value.filter((tasca) => tasca.id !== idTasca)
}
</script>

<template>
  <div class="gestor">
    <h1>Gestor de Tasques</h1>

    <!-- Input per escriure i el botó per afegir -->
    <!-- v-on (@): @click executa la funció en fer clic i @keyup.enter la executa en prémer Enter -->
    <div class="formulari">
      <input v-model="textNovaTasca" @keyup.enter="afegirTasca" type="text" placeholder="Escriu una nova tasca"/>
      <button @click="afegirTasca">Afegir</button>
    </div>

    <!-- Només s'amaga i es mostra amb v-show -->
    <p v-show="mostrarAvis" class="avis">Has d'escriure un títol per a la tasca</p>

    <!-- Filtre de pendents -->
    <label class="filtre">
      <input v-model="nomesPendents" type="checkbox"/>
      Mostra només pendents
    </label>

    <!-- Si hi ha tasques o no -->
    <ul v-if="tasquesVisibles.length > 0" class="llista">
      <li v-for="tasca in tasquesVisibles" :key="tasca.id">
        <!-- v-bind (:): :class posa la classe tatxada només si la tasca està completada -->
        <span :class="{tatxada: tasca.completada}">{{tasca.titol}}</span>
        <span class="data">({{tasca.dataCreacio}})</span>

        <button @click="canviarEstat(tasca)">
          <span v-if="tasca.completada">Desmarcar</span>
          <span v-else>Completar</span>
        </button>
        <!-- v-bind (:): :title posa el text que surt en passar el ratolí per sobre -->
        <button @click="eliminarTasca(tasca.id)" :title="'Elimina la tasca ' + tasca.titol">🗑️</button>
      </li>
    </ul>
    <p v-else class="buit">No hi ha tasques per mostrar</p>

    <p class="resum">Total: {{totalTasques}} | Pendents: {{totalPendents}}</p>
  </div>
</template>

<style scoped src="./TaskApp.css"></style>