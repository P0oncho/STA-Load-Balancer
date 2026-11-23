export const label = "Round-Robin";

export default class RoundRobin {
  // import vite.config;
  // Очень важное примечание к этому заданию: все полезные нагрузки запросов должны быть заменены числовым значением строки. В противном случае задание будет считаться невыполненным.

  constructor(servers) {
    // Ejemplo de un servidor:
    // {
    //   id: "server-2",
    //   power: 3,          // Unidades de trabajo por segundo simulado
    //   activeRequest: { id: "P01", payload: "08319462", work: 4 }, // null si está libre
    //   queuedRequests: [{ id: "P02", payload: "74150328", work: 2 }],
    //   activeProgress: 0.25 // Progreso de 0 a 1 (0 si está libre)
    // }
    // Los datos son de solo lectura y se actualizan durante la simulación.
    this.servers = servers;
    this.next = 0; // Índice del siguiente servidor al que se enviará la petición
  }

  async onRequestArrival(request, sendToServer) {
    // Ejemplo de la petición que llega:
    // {
    //   id: "request-17",
    //   payload: "08319462", // Datos que envía el cliente
    //   work: 4              // Unidades de trabajo necesarias
    // }
    let server = this.servers[0];

    if (this.next <= 3) {
      server = this.servers[0];
    } else if (this.next <= 6) {
      server = this.servers[1];
    } else if (this.next <= 8) {
      server = this.servers[2];
    } else {
      server = this.servers[3];
    }

    // Paso al siguiente turno y vuelvo al principio al llegar a 10
    this.next = this.next + 1;

    if (this.next > 9) {
      this.next = 0;
    }

    // Envía la petición al servidor y devuelve su respuesta al cliente.
    return sendToServer(server.id);
  }
}
