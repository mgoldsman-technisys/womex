package womex

class Articulo {

	//Integer cod;
	String codrelev;
	String prefix;
	Integer cubcod1;
	Integer subcod2;
	Integer item;
	String descripcion;
	Integer codtipoprod;
	String observaciones;
	String packaging;
	String colores;
	Integer uxb;
	Integer codunidadpeso;
	Double peso;
	Double cbm;
	Integer codtipoembalaje;
	Integer codmonedavalor;
	Double valor;
	Integer codlocal;
	String codproveedor;
	Integer codciudad;
	//Integer codviaje;
	Integer prodterminado;
	Integer bolsaindividual;
	Integer codposicioncontainer;
	Double costorepacking;
	Double preciomercaderia;
	Double preciofinal;
	Double aviosvalor;
	Integer codunidadcantminima;
	Integer codrelevador;
	Date fecha_alta;
	Date fecha_mod;
	// faltan imgfolder, imgpicture
	// faltan usr_alta, usr_mod
	
    static constraints = {

    }
	
	static belongsTo = [viaje: Viaje]
	static mapping = {		
		version false
		columns {
		  id column: "cod"
		  viaje column: "codviaje"
		}
	  }
	
	
	
}
