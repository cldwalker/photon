if(!lt.util.load.provided_QMARK_('lt.plugins.photon.selector')) {
goog.provide('lt.plugins.photon.selector');
goog.require('cljs.core');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.sidebar.command');
goog.require('lt.objs.sidebar.command');
lt.plugins.photon.selector.__BEH__set_selected = (function __BEH__set_selected(this$,v){return lt.objs.sidebar.command.exec_active_BANG_.call(null,v);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.photon.selector","set-selected","lt.plugins.photon.selector/set-selected",4322650788),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.photon.selector.__BEH__set_selected,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"select","select",4402849902),null], null), null));
lt.plugins.photon.selector.selector = (function selector(opts){var G__8296 = lt.objs.sidebar.command.filter_list.call(null,opts);lt.object.add_behavior_BANG_.call(null,G__8296,new cljs.core.Keyword("lt.plugins.photon.selector","set-selected","lt.plugins.photon.selector/set-selected",4322650788));
return G__8296;
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.photon')) {
goog.provide('lt.plugins.photon');
goog.require('cljs.core');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.objs.workspace');
goog.require('lt.objs.workspace');
goog.require('lt.plugins.photon.selector');
goog.require('lt.plugins.photon.selector');
goog.require('lt.objs.command');
goog.require('lt.objs.files');
goog.require('clojure.string');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.command');
lt.plugins.photon.directories = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
lt.plugins.photon.home = lt.objs.files.home.call(null);
lt.plugins.photon.expand_path = (function expand_path(path){return clojure.string.replace_first.call(null,path,/^~\//,lt.plugins.photon.home);
});
lt.plugins.photon.__GT_items = (function __GT_items(path){var children = lt.objs.files.ls_sync.call(null,path,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirs","dirs",1016987896),true], null));return cljs.core.map.call(null,(function (p1__8422_SHARP_){return cljs.core.PersistentHashMap.fromArrays.call(null,[new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"path","path",1017337751)],[lt.objs.files.basename.call(null,p1__8422_SHARP_),lt.objs.files.join.call(null,path,p1__8422_SHARP_)]);
}),children);
});
lt.plugins.photon.items = (function items(){return cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1017277949),cljs.core.mapcat.call(null,lt.plugins.photon.__GT_items,cljs.core.map.call(null,lt.plugins.photon.expand_path,cljs.core.deref.call(null,lt.plugins.photon.directories))));
});
lt.plugins.photon.add_selector = lt.plugins.photon.selector.selector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1114430258),lt.plugins.photon.items,new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"transform","transform",2066570974),(function (p1__8425_SHARP_,p2__8426_SHARP_,p3__8423_SHARP_,p4__8424_SHARP_){return [cljs.core.str("<p>"),cljs.core.str(p3__8423_SHARP_),cljs.core.str("</p><p class='binding'>"),cljs.core.str(new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(p4__8424_SHARP_)),cljs.core.str("</p>")].join('');
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"photon.add-folder","photon.add-folder",4332448574),new cljs.core.Keyword(null,"desc","desc",1016984067),"photon: Add folder from dropdown",new cljs.core.Keyword(null,"options","options",4059396624),lt.plugins.photon.add_selector,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (item){return lt.object.raise.call(null,lt.objs.workspace.current_ws,new cljs.core.Keyword(null,"add.folder!","add.folder!",2151595160),new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(item));
})], null));
}

//# sourceMappingURL=photon_compiled.js.map