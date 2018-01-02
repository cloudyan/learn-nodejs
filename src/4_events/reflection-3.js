
//

Pulsar.prototype.stop = function stop() {
  if (this.listeners('pulse').length === 0) {
    throw new Error('No listeners have been added!')
  }
}

const pulsar = new Pulsar(500, 5)

pulsar.stop()
