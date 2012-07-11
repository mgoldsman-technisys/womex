/**
 * Query - List - Detail
 */
Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux', '../js/ux');

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*',
		'Ext.tip.QuickTipManager', 'Ext.ux.LiveSearchGridPanel',
		'Ext.form.field.ComboBox']);

Ext.onReady(function() {
	Ext.QuickTips.init();
	var model = Ext.define('Articulo', {
				extend : 'Ext.data.Model',
				idProperty : 'cod',
				fields : [{
							name : 'cod',
							type : 'int'
						}, {
							name : 'codrelev',
							type : 'string'
						}, {
							name : 'prefix',
							type : 'string'
						}, {
							name : 'cubcod1',
							type : 'int'
						}, {
							name : 'subcod2',
							type : 'int'
						}, {
							name : 'item',
							type : 'int'
						}, {
							name : 'descripcion',
							type : 'string'
						}, {
							name : 'codtipoprod',
							type : 'int'
						}, {
							name : 'observaciones',
							type : 'string'
						}, {
							name : 'packaging',
							type : 'string'
						}, {
							name : 'colores',
							type : 'string'
						}, {
							name : 'uxb',
							type : 'int'
						}, {
							name : 'codunidadpeso',
							type : 'int'
						}, {
							name : 'peso',
							type : 'double'
						}, {
							name : 'cbm',
							type : 'double'
						}, {
							name : 'codtipoembalaje',
							type : 'int'
						}, {
							name : 'codmonedavalor',
							type : 'int'
						}, {
							name : 'valor',
							type : 'double'
						}, {
							name : 'codlocal',
							type : 'int'
						}, {
							name : 'codproveedor',
							type : 'string'
						}, {
							name : 'codciudad',
							type : 'int'
						}, {
							name : 'viaje',
							type : 'string'
						}, {
							name : 'prodterminado',
							type : 'int'
						}, {
							name : 'bolsaindividual',
							type : 'int'
						}, {
							name : 'codposicioncontainer',
							type : 'int'
						}, {
							name : 'costorepacking',
							type : 'double'
						}, {
							name : 'preciomercaderia',
							type : 'double'
						}, {
							name : 'preciofinal',
							type : 'double'
						}, {
							name : 'aviosvalor',
							type : 'double'
						}, {
							name : 'codunidadcantminima',
							type : 'int'
						}, {
							name : 'cantminima',
							type : 'double'
						}, {
							name : 'codrelevador',
							type : 'int'
						}, {
							name : 'fecha_alta',
							type : 'date'
						}, {
							name : 'fecha_mod',
							type : 'date'
						}]
			});

	var modelViaje = Ext.define('Viaje', {
				extend : 'Ext.data.Model',
				idProperty : 'cod',
				fields : [{
							name : 'cod',
							type : 'int'
						}, {
							type : 'string',
							name : 'descripcion'
						}]
			});

	var storeArticle = Ext.create('Ext.data.Store', {
				pageSize : 50,
				model : 'Articulo',
				proxy : {
					type : 'rest',
					url : 'search',
					format : 'json',
					reader : {
						type : 'json',
						root : 'articulos',
						totalProperty : 'totalCount'
					},
					extraParams : {
						code : '',
						codrelev : '',
						descripcion : '',
						codviaje : ''
					}
				}
			});

	var storeViaje = Ext.create('Ext.data.Store', {
				model : 'Viaje',
				proxy : {
					type : 'rest',
					url : 'searchViajes',
					format : 'json',
					reader : {
						type : 'json',
						root : 'viajes'
					}
				}
			});

	var panel_right = Ext.create('Ext.form.Panel', {
		width : 300,
		height : 600,
		autoScroll : true,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		defaults : {
			flex : 1
		},
		// detail_area
		items : [{
			id : 'details',
			columnWidth : 0.8,
			margin : '0 0 0 0',
			xtype : 'fieldset',
			autoScroll : true,
			title : 'Detalle de articulo',
			defaults : {
				width : 330,
				labelWidth : 90
			},
			defaultType : 'displayfield',
			items : [{
						xtype : 'panel',
						style : 'padding-left:160px',
						width : 210,
						items : [{
									xtype : 'image',
									src : 'http://www.osnews.com/images/user.jpg',
									height : 50,
									width : 50,
									align : 'center',
									flex : 1
								}]
					}, {
						name : 'cod',
						fieldLabel : 'Cod.'
					}, {
						name : 'codrelev',
						fieldLabel : 'Cod. Relev.'
					}, {
						name : 'prefix',
						fieldLabel : 'Prefix'
					}, {
						name : 'cubcod1',
						fieldLabel : 'CubCod1'
					}, {
						name : 'subcod2',
						fieldLabel : 'SubCod2'
					}, {
						name : 'item',
						fieldLabel : 'Item'
					}, {
						name : 'descripcion',
						fieldLabel : 'Descripcion'
					}, {
						name : 'codtipoprod',
						fieldLabel : 'Tipo Prod.'
					}, {
						name : 'observaciones',
						fieldLabel : 'Observaciones'
					}, {
						name : 'packaging',
						fieldLabel : 'Packaging'
					}, {
						name : 'colores',
						fieldLabel : 'Colores'
					}, {
						name : 'uxb',
						fieldLabel : 'UXB'
					}, {
						name : 'codunidadpeso',
						fieldLabel : 'Unidad Peso'
					}, {
						name : 'peso',
						fieldLabel : 'Peso'
					}, {
						name : 'cbm',
						fieldLabel : 'CMB'
					}, {
						name : 'codtipoembalaje',
						fieldLabel : 'Tipo Embalaje'
					}, {
						fieldLabel : 'codmonedavalor',
						fieldLabel : 'Moneda'
					}, {
						name : 'valor',
						fieldLabel : 'Valor'
					}, {
						name : 'codlocal',
						fieldLabel : 'Local'
					}, {
						name : 'codproveedor',
						fieldLabel : 'Proveedor'
					}, {
						name : 'codciudad',
						fieldLabel : 'Ciudad'
					}, {
						name : 'viaje',
						fieldLabel : 'Viaje'
					}, {
						name : 'prodterminado',
						fieldLabel : 'Prod. Terminado'
					}, {
						name : 'bolsaindividual',
						fieldLabel : 'Bolsa Individual'
					}, {
						name : 'codposicioncontainer',
						fieldLabel : 'Posicion Container'
					}, {
						name : 'costorepacking',
						fieldLabel : 'Costo Repacking'
					}, {
						name : 'preciomercaderia',
						fieldLabel : 'Precio Mercaderia'
					}, {
						name : 'preciofinal',
						fieldLabel : 'Precio Final'
					}, {
						name : 'aviosvalor',
						fieldLabel : 'Avios Valor'
					}, {
						name : 'codunidadcantminima',
						fieldLabel : 'Unidad Cant. Minima'
					}, {
						name : 'cantminima',
						fieldLabel : 'Canti. Minima'
					}, {
						name : 'codrelevador',
						fieldLabel : 'Relevador'
					}, {
						name : 'fecha_alta',
						fieldLabel : 'Fecha Alta'
					}, {
						name : 'fecha_mod',
						fieldLabel : 'Fecha Mod.'
					}]
		}]
	});

	var pagingToolbar = new Ext.PagingToolbar({
				id : 'toolbar',
				pageSize : 50,
				store : storeArticle,
				displayInfo : true,
				displayMsg : 'Mostrando resultados {0} - {1} sobre {2}',
				emptyMsg : "No hay resultados"
			});

	var gridPanel = Ext.create('Ext.ux.LiveSearchGridPanel', {
				width : 700,
				height : 300,
				flex : 1,
				title : 'Lista de resultados',
				store : storeArticle,
				loadMask : true,
				disableSelection : false,
				columnLines : true,
				viewConfig : {
					// trackOver : false,
					stripeRows : true
				},
				// grid columns
				columns : [{
							text : 'Cod',
							witdh : 125,
							sortable : true,
							dataIndex : 'cod'
						}, {
							text : 'Cod Relev.',
							width : 125,
							sortable : true,
							dataIndex : 'codrelev'
						}, {
							text : 'Prefix',
							width : 50,
							sortable : true,
							dataIndex : 'prefix',
							hidden : true
						}, {
							text : 'cubcod1',
							width : 50,
							sortable : true,
							dataIndex : 'cubcod1',
							hidden : true
						}, {
							text : 'subcod2',
							width : 50,
							sorteable : true,
							dataIndex : 'subcod2',
							hidden : true
						}, {
							text : 'Item',
							width : 50,
							sorteable : true,
							dataIndex : 'item'
						}, {
							text : 'Descripcion',
							width : 225,
							sorteable : true,
							dataIndex : 'descripcion'
						}, {
							text : 'Viaje',
							width : 50,
							sorteable : true,
							dataIndex : 'viaje'
						}, {
							text : 'Observaciones',
							width : 225,
							sorteable : true,
							dataIndex : 'observaciones'
						}],
				// paging bar on the bottom
				bbar : pagingToolbar,
				renderTo : Ext.getBody()
			});

	// update panel body on selection change
	gridPanel.getSelectionModel().on('selectionchange',
			function(sm, selectedRecord) {
				var detailsPanel = Ext.getCmp('details');
				if (selectedRecord.length) {
					var article = storeArticle
							.getById(selectedRecord[0].data.cod);
					detailsPanel.up('form').getForm().loadRecord(article);
				} else {
					detailsPanel.up('form').getForm().reset();
				}
			});

	var stringGroup = {
		xtype : 'fieldset',
		title : '',
		layout : 'vbox',
		flex : 1,
		height : 121,
		defaults : {
			width : '235'
		},
		items : [{
					xtype : 'textfield',
					fieldLabel : 'Cod.',
					name : 'code'

				}, {
					xtype : 'textfield',
					fieldLabel : 'Cod. Relev',
					name : 'codrelev'
				}]
	};

	// Simple ComboBox using the data store
	var viajeCombo = Ext.create('Ext.form.field.ComboBox', {
				id : 'cmbViaje',
				fieldLabel : 'Viaje',
				displayField : 'descripcion',
				valueField : 'cod',
				width : 120,
				labelWidth : 130,
				store : storeViaje,
				queryMode : 'local',
				typeAhead : true
			});

	var stringGroup2 = {
		xtype : 'fieldset',
		title : '',
		layout : 'vbox',
		flex : 1,
		height : 121,
		defaults : {
			width : '235'
		},
		items : [{
					xtype : 'textfield',
					fieldLabel : 'Descripcion',
					name : 'descripcion'

				}, viajeCombo
				/*, {
					xtype : 'numberfield',
					fieldLabel : 'Viaje',
					name : 'codviaje'
				}*/]
	};

	var filterGroup = {
		xtype : 'fieldset',
		title : '',
		layout : 'hbox',
		border : false,
		items : [stringGroup, {
					xtype : 'component',
					width : 10
				}, stringGroup2]
	};

	var panelFilter = Ext.create('Ext.form.Panel', {
		renderTo : Ext.getBody(),
		title : 'Filtro de busqueda',
		bodyStyle : 'padding: 2px 2px 0',
		width : 500,
		flex : 1,
		collapsible : true,
		fieldDefaults : {
			labelAlign : 'top',
			msgTarget : 'side'
		},
		defaults : {
			border : false,
			xtype : 'panel',
			flex : 1,
			layout : 'anchor'
		},

		layout : 'hbox',
		items : [{
					items : [filterGroup]
				}],
		buttons : ['->', {
					text : 'Limpiar',
					handler : function() {
						panelFilter.getForm().reset();
					}
				}, {
					text : 'Buscar',
					handler : function() {
						var store = pagingToolbar.getStore();
					
						store.proxy.extraParams = {
							code : panelFilter.getForm().findField("code").value,
							codrelev : panelFilter.getForm()
									.findField("codrelev").value,
							descripcion : panelFilter.getForm()
									.findField("descripcion").value,
							codviaje : panelFilter.getForm()
									.findField("cmbViaje").value
						}
						
						store.loadPage(1, {
									extraParams : {
										start : 0
									}
								});
						pagingToolbar.bindStore(storeArticle);
						gridPanel.getView().refresh();

					}
				}]
	});

	var vbox = Ext.Panel({

				width : 700,
				height : 600,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				defaults : {
					bodyStyle : 'padding:15px'
				},
				items : [panelFilter, gridPanel]
			});

	var hbox = Ext.create('Ext.window.Window', {
				title : 'Womex busqueda de articulos',
				width : 1000,
				height : 450,
				maximizable : true,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				defaults : {
					bodyStyle : 'padding:15px'
				},

				items : [vbox, panel_right]
			});

	storeArticle.loadPage(1, {
				params : {
					code : panelFilter.getForm().findField("code").value,
					codrelev : panelFilter.getForm().findField("codrelev").value,
					descripcion : panelFilter.getForm()
							.findField("descripcion").value,
					codviaje : panelFilter.getForm().findField("cmbViaje").value,
					start : 0
				}
			});

	storeViaje.load();

	hbox.show();

});
