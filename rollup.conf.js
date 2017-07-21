import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	dest: 'bundles/ngx-rx-if.umd.js',
	format: 'umd',
	external: [
		'@angular/core',
		'@ngrx/store',
		'rxjs/Subscription',
		'rxjs/add/operator/map',
		'rxjs/add/operator/distinctUntilChanged'
	],
	globals: {
		'@angular/core': 'ng.core',
		'@ngrx/store': 'ngrx.store',
		'rxjs/Subscription': 'rxjs.subscription',
		'rxjs/add/operator/map': 'rxjs.add.operator.map',
		'rxjs/add/operator/distinctUntilChanged': 'rxjs.add.operator.distinctUntilChanged'
	},
	plugins: [
		commonjs()
	],
	moduleName: 'ngx.rx.if'
}