/**
 * Query - List - Detail
 */
Ext.Loader.setConfig({
			enabled : true
		});
Ext.Loader.setPath('Ext.ux', '../js/ux');

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*',
		'Ext.tip.QuickTipManager', 'Ext.ux.LiveSearchGridPanel']);

Ext.onReady(function() {
	Ext.QuickTips.init();
	var model = Ext.define('Article', {
				extend : 'Ext.data.Model',
				fields : [{
							name : 'id',
							type : 'int'
						}, {
							name : 'code',
							type : 'string'
						}, {
							name : 'description',
							type : 'string'
						}, {
							name : 'dateCreated',
							type : 'date'
						}, {
							name : 'lastUpdate',
							type : 'date'
						}]
			});

	var storeArticle = Ext.create('Ext.data.Store', {
				model : 'Article',
				proxy : {
					type : 'rest',
					url : 'list',
					format : 'json',
					reader : {
						type : 'json',
						root : 'articles'
					}
				}
			});
	storeArticle.load();

	var gridPanel = Ext.create('Ext.ux.LiveSearchGridPanel', {
				width : 700,
				height : 400,
				flex : 2,
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
							text : 'Id',
							witdh : 125,
							sortable : true,
							dataIndex : 'id'
						}, {
							text : 'Code',
							width : 125,
							sortable : true,
							dataIndex : 'code'
						}, {
							text : 'Description',
							width : 225,
							sortable : true,
							dataIndex : 'description'
						}, {
							text : 'Create Date',
							width : 225,
							sortable : true,
							dataIndex : 'dateCreated'
						}, {
							text : 'Last Update',
							width : 225,
							sorteable : true,
							dataIndex : 'lastUpdate'
						}],
				renderTo : Ext.getBody()
			});

	Ext.apply(Ext.form.VTypes, {
		daterange : function(val, field) {
			var date = field.parseDate(val);

			if (!date) {
				return;
			}
			if (field.startDateField
					&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
							.getTime()))) {
				var start = Ext.getCmp(field.startDateField);
				start.setMaxValue(date);
				start.validate();
				this.dateRangeMax = date;
			} else if (field.endDateField
					&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
							.getTime()))) {
				var end = Ext.getCmp(field.endDateField);
				end.setMinValue(date);
				end.validate();
				this.dateRangeMin = date;
			}
			/*
			 * Always return true since we're only using this vtype to set the
			 * min/max allowed values (these are tested for after the vtype
			 * test)
			 */
			return true;
		}
	});

	var dateStart = new Ext.form.DateField({
				allowBlank : true,
				name : 'dataStart',
				id : 'dataStart',
				fieldLabel : "Date Start",
				hideLabel : false,
				vtype : 'daterange',// type here
				endDateField : 'dateEnd', // and end date field
				format : 'd/m/Y'
			});

	var dateEnd = new Ext.form.DateField({
				allowBlank : true,
				id : 'dateEnd',
				name : 'dateEnd',
				fieldLabel : "Date End",
				hideLabel : false,
				vtype : 'daterange',// add type
				startDateField : 'dataStart',// start date field
				format : 'd/m/Y'
			});

	var dateGroup = {
		xtype : 'fieldset',
		title : '',
		layout : 'hbox',
		defaults : {
			anchor : '100%',
			labelStyle : 'padding-left:4px;'
		},
		items : [dateStart, {
					xtype : 'component',
					width : 10
				}, dateEnd]
	};

	var stringGroup = {
		xtype : 'fieldset',
		title : '',
		layout : 'vbox',
		flex : 1,
		height : 121,
		defaults : {
			width : '335'
		},
		items : [{
					xtype : 'textfield',
					fieldLabel : 'Code',
					name : 'code'

				}, {
					xtype : 'textfield',
					fieldLabel : 'Description',
					name : 'description'
				}]
	};

	var radioGroup = {
		xtype : 'fieldset',
		title : '',
		layout : 'anchor',
		flex : 1,
		border : false,
		defaults : {
			anchor : '100%',
			labelStyle : 'padding-left:4px;'
		},
		items : [{
					xtype : 'radiogroup',
					fieldLabel : 'Date Filter',
					bodyStyle : 'padding: 0px 0px 0',
					columns : 2,
					items : [{
								boxLabel : 'Created',
								name : 'rb-auto',
								inputValue : 1
							}, {
								boxLabel : 'Updated',
								name : 'rb-auto',
								inputValue : 2,
								checked : true
							}]
				}, dateGroup]
	};

	var filterGroup = {
		xtype : 'fieldset',
		title : '',
		layout : 'hbox',
		border : false,
		items : [stringGroup, {
					xtype : 'component',
					width : 10
				}, radioGroup]
	};

	var panelFilter = Ext.create('Ext.form.Panel', {
		renderTo : Ext.getBody(),
		title : 'Filtro de busqueda',
		bodyStyle : 'padding: 2px 2px 0',
		width : 600,
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
						storeArticle.load({
							params : {
								code : panelFilter.getForm().findField("code").value,
								description : panelFilter.getForm()
										.findField("description").value

							}
						});
						gridPanel.getView().refresh();

					}
				}]
	});

	var detail_area = new Ext.Panel({
				title : 'Detalle',
				region : 'west',
				layout : 'fit',
				items : []
			});

	var panel_right = new Ext.Panel({
				width : 400,
				height : 600,

				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				defaults : {
					flex : 1
				},
				items : [detail_area]
			});

	var vbox = Ext.Panel({

				width : 800,
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
				width : 1210,
				height : 650,
				layout : {
					type : 'hbox',
					align : 'stretch'
				},
				defaults : {
					bodyStyle : 'padding:15px'
				},
				items : [vbox, panel_right]
			});

	hbox.show();

});
