package womex

import grails.converters.JSON

class ViajeController {

	def index() {
	}

	def list = {

		def results = Viaje.findAll()

		HashMap jsonMap = new HashMap()

		jsonMap.viajes = results.collect {viaje ->
			return [id: viaje.id, descripcion: viaje.descripcion]
		}

		render jsonMap as JSON
	}
}
