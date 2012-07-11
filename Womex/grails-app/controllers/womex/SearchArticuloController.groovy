package womex

import java.util.Date;

import grails.converters.JSON

class SearchArticuloController {


	def index() {
	}

	def search() {
		//System.out.println(params);
		def code
		def descripcion
		def codrelev
		def codviaje
		if (params != null) {
			if (params.code != null)
				code = params.code
			if (params.descripcion != null)
				descripcion = "%" + params.descripcion + "%"
			if (params.codrelev != null)
				codrelev = "%" + params.codrelev + "%"
			if (params.codviaje != null)
				codviaje = params.codviaje
		}

		def c = Articulo.createCriteria()
		def results = c.list {
			maxResults(params.int('limit'))
			firstResult(params.int('start')?:0)
			and {
				if (code) {
					eq("id", Long.parseLong(code))
				}
				if (codrelev) {
					ilike("codrelev", codrelev)
				}
				if (descripcion) {
					ilike("descripcion", descripcion)
				}
				if (codviaje) {
					eq("viaje.id", Long.parseLong(codviaje))
				}
			}
		}
		def totalCount = Articulo.createCriteria().count{
			projections { count('id') }
			and {
				if (code) {
					eq("id", Long.parseLong(code))
				}
				if (codrelev) {
					ilike("codrelev", codrelev)
				}
				if (descripcion) {
					ilike("descripcion", descripcion)
				}
				if (codviaje) {
					eq("viaje.id", Long.parseLong(codviaje))
				}
			}
		}
		HashMap jsonMap = new HashMap()

		jsonMap.totalCount = totalCount
		jsonMap.articulos = results.collect {art ->
			return [cod: art.id, codrelev: art.codrelev, prefix: art.prefix, cubcod1: art.cubcod1, subcod2: art.subcod2, item: art.item, descripcion: art.descripcion,
				codtipoprod: art.codtipoprod, observaciones: art.observaciones, packaging: art.packaging, colores: art.colores, uxb: art.uxb, codunidadpeso: art.codunidadpeso,
				peso: art.peso, cbm: art.cbm, codtipoembalaje: art.codtipoembalaje, codmonedavalor: art.codmonedavalor, valor: art.valor, codlocal: art.codlocal, codproveedor: art.codproveedor,
				codciudad: art.codciudad, viaje: art.viaje.descripcion, prodterminado: art.prodterminado, bolsaindividual: art.bolsaindividual, codposicioncontainer: art.codposicioncontainer,
				costorepacking: art.costorepacking, preciomercaderia: art.preciomercaderia, preciofinal: art.preciofinal, aviosvalor: art.aviosvalor, codunidadcantminima: art.codunidadcantminima,
				codrelevador: art.codrelevador, fecha_alta: art.fecha_alta, fecha_mod: art.fecha_mod]
		}

		render jsonMap as JSON
	}

	def searchViajes = {

		def results = Viaje.findAll([sort:"descripcion", order:"desc"])

		HashMap jsonMap = new HashMap()
		
		jsonMap.viajes = results.collect {viaje ->
			return [cod: viaje.id, descripcion: viaje.descripcion]
		}

		render jsonMap as JSON
	}
}
