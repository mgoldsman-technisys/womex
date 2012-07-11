package womex



import grails.converters.JSON

class SearchListController {

	def index() {
	}

	def list = {
		def code = "%"
		def description = "%"
		def dateCreated = null
		if (params != null) {
			if (params.code != null)
				code = "%" + params.code + "%"
			if (params.description != null)
				description = "%" + params.description + "%"
			if (params.dateCreated != null)
				dateCreated = params.dateCreated
		}
		def c = Article.createCriteria()
		def results = c.list {
			like("code", code)
			like("description", description)
		}
		HashMap jsonMap = new HashMap()
		
		jsonMap.articles = results.collect {art ->
			return [id: art.id, code: art.code, description: art.description, dateCreated: art.dateCreated, lastUpdate: art.lastUpdated]
		}

		render jsonMap as JSON
	}

	def search = {
		render Race.search(params.q, params)
	}
}
