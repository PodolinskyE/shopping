/**
	*
*/
var shopsData = [
	{'number' : 0, 'name' : 'Магазин #1', 'address' : 'Солнечная 3', 'openTime' : '9:00', 'closeTime' : '21:00'},
	{'number' : 1, 'name' : 'Ромашка', 'address' : 'Озерная 9', 'openTime' : '9:00', 'closeTime' : '23:00'},
	{'number' : 2, 'name' : 'Радуга', 'address' : 'Портовая 28', 'openTime' : '8:00', 'closeTime' : '22:00'}
];

var productsData = [
	[
		{'name' : 'Спички', 'description' : 'Спички борисовские элитные'},
		{'name' : 'Snikers', 'description' : 'Конфета шоколадная с арахисом'}
	],
	[
		{'name' : 'Snikers', 'description' : 'Конфета шоколадная с арахисом'},
		{'name' : 'Kinder', 'description' : 'Яйцо киндер-сюрприз'},
		{'name' : 'Барни', 'description' : 'Кекс барни'}
	],
	[
		{'name' : 'Ariel', 'description' : 'Порошок стиральынй ариель'},
		{'name' : 'Tide', 'description' : 'Порошок стиральынй тайд'},
		{'name' : 'MrPropper', 'description' : 'Чистящее средство Мистер проппер'}
	]
];

/*********************************************************************************************************/

function ShopItem( opts ) {
	var shi = this;
	shi.shop = new Shop( opts );
	
	var goods = productsData[shi.shop.number];
	if ( goods ) {
		goods.forEach( prd => shi.shop.addProduct( new Product( prd ) ));
	}
		
	shi.$header = $('<div class="panel-heading"></div>').text( shi.shop.number + ' ' + shi.shop.name );
	shi.$address = $('<p class="panel-body-description"></p>').text( shi.shop.address );
	shi.$openTime = $('<p class="panel-body-description"></p>').text( shi.shop.getOpenTime() );
	
	shi.$btn = $('<button type="button" class="btn btn-outline-primary btn-sm">Товары</button>');
	shi.$btn.click(function ( e ) {
		shi.showGoods();
	});	
	
	var $props = $('<div class="panel-body"></div>');
	shi.$li = $('<li class="panel panel-info"></li>');
	shi.$li.append( shi.$header ).append( $props );
	$props.append( shi.$address ).append( shi.$openTime ).append( shi.$btn );
	 
	shi.$li.data('object', shi);
}

ShopItem.prototype.update = function () {
	var shi = this;
	shi.$header.text( shi.shop.number + ' ' + shi.shop.name );
	shi.$address.text( shi.shop.address );
	shi.$openTime.text( shi.shop.getOpenTime() );
}

ShopItem.prototype.showGoods = function () {
	var shi = this;
	var shop = shi.shop;
	// debugger
	showGoods( shop );
}



function ShopList ( shopsData ) {
	
	this.$list = $('#draggablePanelList');
	this.shops = shopsData.map( opts => new ShopItem( opts ) );
	this.shops.forEach( $shp => this.$list.append( $shp.$li ));
}

ShopList.prototype.add = function ( shp ) {
	shp.shop.number = this.shops.length;
	this.shops.push( shp );
	this.$list.append( shp.$li );
	shp.update();
}




function refreshGoods ( $mbody, shop ) {
	var html, $ul;
	$mbody.find('ul').remove();
	
	html = shop.products.map( prd => {
		var str = 
		'<li class="list-group-item">' +
			'<div>' + prd.name + '</div>' +
			'<div>' + prd.description + '</div>' +
		'</li>';
		return str;
	});
	
	$ul = $('<ul class="list-group">' + html.join('') + '</ul>');
	$mbody.append($ul);
}



function showGoods ( shop ) {
	var $window = $('#goodsModal');
	var $title, $ul, html;
	var $mbody;
	
	
	if ( $window.length ) {
		$mbody = $window.find('.modal-body');
		refreshGoods($mbody, shop);
		$window.data('shop', shop);
	} else {
		$window = $(
			'<div id="goodsModal" class="modal">' +
				'<div class="modal-dialog" role="document">' +
					'<div class="modal-content">' +
						'<div class="modal-header">' +
							'<h5 class="modal-title">Товары</h5>' +
							'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
								'<span aria-hidden="true">&times;</span>' +
							'</button>' +
						'</div>' +
						'<form class="form-inline my-2 my-lg-0">' +
							'<input id="p_name" class="form-control mr-sm-2" type="text" placeholder="Название" aria-label="name">' +
							'<input id="p_desc" class="form-control mr-sm-2" type="text" placeholder="Описание" aria-label="desc">' +
							'<button id="productBtnAdd" class="btn btn-outline-success my-2 my-sm-0" type="submit">Добавить</button>' +
						'</form>' +
						'<div class="modal-body">' +
							// '<p>Modal body text goes here.</p>' +
						'</div>' +
						'<div class="modal-footer">' +
							// '<button type="button" class="btn btn-primary">Save changes</button>' +
							'<button type="button" class="close btn btn-secondary" data-dismiss="modal">Close</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		);
		
		
		$window.data('shop', shop);
		$ul = $('<ul class="list-group"></ul>');
		$mbody = $window.find('.modal-body');
		$mbody.append($ul);
		
		refreshGoods($mbody, shop);
		
		$('body').append( $window );
		
		
		$window.find('#productBtnAdd').click(function () {
			var shop = $(this).parents('#goodsModal').data('shop')
			var name = $(this).parents('form').find('input#p_name')[0].value;
			var desc = $(this).parents('form').find('input#p_desc')[0].value;
			var newProduct;
			// TODO check fields
			if ( name && desc ) {
				newProduct = new Product( {'name' : name, 'description' : desc} )
				shop.addProduct( newProduct );
				refreshGoods($mbody, shop);
				
			}
		});
	}
	
  $("#goodsModal").draggable({
      handle: ".modal-header"
  });
  
  
	$window.modal({"data-backdrop":"true"});
}



var shopList = new ShopList( shopsData );


jQuery(function($) {
	
	var panelList = $('#draggablePanelList');
	panelList.sortable({
		handle: '.panel-heading',
		update: function() {
			$('.panel', panelList).each(function(index, elem) {
				var $listItem = $(elem);
				var shopObj = $listItem.data('object')
				shopObj.shop.number = $listItem.index();
				shopObj.update();
			});
		}
	});
	
	var $navBtnAdd = $('#navBtnAdd');
	$navBtnAdd.click(function ( e ) {
		// debugger
		var name = $(this).parents('nav').find('input#name')[0].value;
		var address = $(this).parents('nav').find('input#address')[0].value;
		var openTime = $(this).parents('nav').find('input#openTime')[0].value;
		var closeTime = $(this).parents('nav').find('input#closeTime')[0].value;
		var nsh;
		
		// TODO check fields
		if ( name && address && openTime && closeTime ) {
			nsh = new ShopItem({'name' : name, 'address' : address, 'openTime' : openTime, 'closeTime' : closeTime});
			shopList.add( nsh );
		}
	});
});


