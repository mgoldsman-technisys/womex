package womex


class Viaje {

	String descripcion
	Date fecha_desde
	Date fecha_hasta
	String colorbg
	String colorfg
	Date fecha_alta
	Date fecha_mod
	Date usr_alta
	Date usr_mod

	static constraints = {
	}

	static mapping = {
		version false
		columns { id column: "cod" }
	}

	String toString(){
		return "${id} - ${descripcion}"
	}
}
