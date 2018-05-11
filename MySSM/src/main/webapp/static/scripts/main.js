require.config({
	urlArgs: 'ver=1',
    paths: {
        "jQuery": "jquery-1.11.1.min",
        "bootstrap": "bootstrap.min",
        "easyui": "easyui/jquery.easyui.min",
        "zhCN": "easyui/locale/easyui-lang-zh_CN",
         "config":"modules/config",
        "api":"modules/api",
        "lib":"modules/lib",
        "layer":"layer/layer",
        "text" : 'text',
        "json" : 'json' //json plugin

    },
	map  : {
            '*': {
                'css' : 'css.min'
            }
    },
    shim: {
    	"bootstrap": {
            export: "$",
            deps: ['jQuery','css!../css/bootstrap.min.css','css!../css/bootstrap-theme.min.css'],
			
        },
        'zhCN': {
            export: "$",
            deps: ['jQuery','easyui']
        },
        "easyui": {
            export: "$",
            deps: ['jQuery','css!../scripts/easyui/themes/default/easyui.css','css!../scripts/easyui/themes/icon.css']
        },
        "layer":
        {
            export: "$",
            deps: ['jQuery','css!../scripts/layer/skin/default/layer.css'],
        }

    }
});