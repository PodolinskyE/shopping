// shopping.js

/*
1a. Необходимо разработать SPA, которая позволит хранить/отображать магазины и товары магазинов пока существует страница.
Описание сущностей:
Магазин: наименование, адрес, режим работы, порядковый номер.
Товар: название, описание.

1b. Нужно сделать страницу, которая будет выводить список магазинов 
Не обязательно, будет плюсом вашему заданию: список должен быть в виде draggable между собой блоков, при изменении своей позиции у магазина должен меняться его личный порядковый номер.
В каждом блоке должна быть ссылка на товары магазина. По нажатии на ссылку отображение товаров магазина в виде таблицы.

Не обязательно, будет плюсом вашему заданию: 
На этой же странице должна отображаться карта с указателями магазинов, позиция должна определяться автоматически по адресу.
2. Добавление/редактирование магазинов / товаров достаточно сделать на клиенте (не нужно сохранять в БД).
3. Страница должна быть responsive. 
 
Требования к технологиям: UI – JS, Bootstrap, jQuery
*/

function Product ( opts = {}) {
	this.name = opts.name;
	this.description  = opts.description;
	this.shop = null;
	this.amount = null;
	this.cost = null;
};

function Shop ( opts = {} ) {
	this.number = opts.number;
	this.name = opts.name;
	this.address = opts.address;
	this.openTime = opts.openTime;
	this.closeTime = opts.closeTime;
	this.products = [];
};

Shop.prototype.getOpenTime = function () {
	var sh = this;
	return sh.openTime + ' - ' + sh.closeTime;
};

Shop.prototype.addProduct = function ( prd ) {
	prd.shop = this;
	this.products.push( prd );
	// return this;
};

Shop.prototype.deleteProduct = function ( prd ) {
	// TODO
}




