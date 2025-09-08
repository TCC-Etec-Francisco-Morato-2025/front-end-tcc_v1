import { defineStore } from "pinia";

const useAssuntosStore = defineStore('assuntos',{
  state: ()=>({
    assuntos: [
      { id: 1, nome: 'Leis de Newton', materia: 1 },
      { id: 1, nome: 'Quimica Orgânica', materia: 2 },
      { id: 1, nome: 'Verbo To Be', materia: 3 },
    ],
  })
  },
)

export default useAssuntosStore;
