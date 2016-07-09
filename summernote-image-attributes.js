(function(factory){
    if(typeof define==='function'&&define.amd){
        define(['jquery'],factory);
    }else if(typeof module==='object'&&module.exports){
        module.exports=factory(require('jquery'));
    }else{
        factory(window.jQuery);
    }
}(function($){
    $.extend(true,$.summernote.lang,{
        'en-US':{
            imageAttributes:{
                tooltip:'Image Attributes',
                tooltipShape:'Image Shape',
                tooltipShapeOptions: [ 'Rounded', 'Circle', 'Thumbnail', 'None' ],
                pluginImageTitle:'Image Attributes',
                pluginLinkTitle:'Link Attributes',
                title:'Title',
                alt:'Alt',
                class:'Class',
                classSelect:'Select Class',
                style:'Style',
                href:'URL',
                target:'Target',
                linkClass:'Link Class',
                rel:'Link Rel',
                relBlank:'Do not use Rel Attribute',
                relAlternate:'Alternate: Links to an alternate version of the document',
                relAuthor:'Author: Links to the Author of the Document',
                relBookmark:'Bookmark: Permanent URL used for Bookmarking',
                relHelp:'Help: Links to a Help Document',
                relLicense:'License: Links to copyright information for the document',
                relNext:'Next: The next document in a selection',
                relNofollow:'NoFollow: Links to an unendorsed document, like a paid link, also stops Search Engines following this link',
                relNoreferrer:'NoReferrer: Specifies that the browser should not send a HTTP Header',
                relPrefetch:'PreFetch: Specifies that the target document should be cached',
                relPrev:'Prev: The previous document in a selection',
                relSearch:'Search: Links to a search tool for the document',
                relTag:'Tag: A tag (Keyword) for the current document'
            }
        },
        'es-ES':{
            imageAttributes:{
                tooltip:'Propiedades de la Imagen',
                tooltipShape:'Forma de la Imagen',
                tooltipShapeOptions: [ 'Borde Redondeado', 'Formato Circular', 'Marco de foto', 'Normal' ],
                pluginImageTitle:'Atributos de la Imagen',
                pluginLinkTitle:'Atributos del Enlace',
                title:'Titulo',
                alt:'Alternativo',
                class:'Clases',
                classSelect:'Selecciona Forma',
                style:'Estilo',
                href:'URL',
                target:'Destino',
                linkClass:'Clase',
                rel:'Rel',
                relBlank:'No usar atributo Rel',
                relAlternate:'Alternate: Enlaza a una versión alternativa del documento',
                relAuthor:'Author: Enlaza al autor del documento',
                relBookmark:'Bookmark: URL permanente utilizada para enlazar',
                relHelp:'Help: Enlaza a un documento de Ayuda',
                relLicense:'License: Enlaza a un documento de información de Copyright',
                relNext:'Next: Enlaza al siguiente documento en una selección',
                relNofollow:'NoFollow: Enlaza a un documento no confirmado, como un enlace de pago, también evita que los buscadores sigan este enlace',
                relNoreferrer:'NoReferrer: Specifies that the browser should not send a HTTP Header',
                relPrefetch:'PreFetch: Specifies that the target document should be cached',
                relPrev:'Prev: Enlaza al documento anterior en una selección',
                relSearch:'Search: Enlaza a una herramienta de búsqueda para el documento',
                relTag:'Tag: Un etiqueta (palabra clave) para el documento actual'
            }
        },
        'fr-FR':{
            imageAttributes:{
                tooltip:'Attributs de l\'image',
                tooltipShape:'Forme de l\'image',
                tooltipShapeOptions: [ 'Arrondi', 'Cercle', 'Vignette', 'Aucune' ],
                pluginImageTitle:'Attributs de l\'image',
                pluginLinkTitle:'Attributs du lien',
                title:'Titre',
                alt:'Alt',
                class:'Class CSS',
                classSelect:'Choisir une Class',
                style:'Style',
                href:'URL',
                target:'Cible',
                linkClass:'Class CSS du lien',
                rel:'Lien Rel',
                relBlank:'Ne pas utiliser d\'attribut Rel',
                relAlternate:'Alternate: Lien vers une autre version du document',
                relAuthor:'Author: Lien vers l\'auteur du document',
                relBookmark:'Bookmark: Lien permant utilisé pour les signets',
                relHelp:'Help: Lien vers un document d\'aide',
                relLicense:'License: Lien vers les informations de droits d\'auteur du document',
                relNext:'Next: La page suivante de ce document',
                relNofollow:'NoFollow: Empêcher les moteurs de recherche de suivre ce lien',
                relNoreferrer:'NoReferrer: Précise que le navigateur ne doit pas envoyer d\'entête HTTP',
                relPrefetch:'PreFetch: Précise que le document cible doit être mis en cache',
                relPrev:'Prev: La page précédente de ce document',
                relSearch:'Search: Lien vers un outil de recherche du document',
                relTag:'Tag: Mot-clé du document'
            }
        },
    });
    $.extend($.summernote.options,{
        imageAttributes: {
            icon: '<i class="note-icon-pencil"/>',
            removeEmpty:true
        },
        imageShape: {
            icon: '<i class="note-icon-picture"/>',
            /* Must keep the same order as in lang.imageAttributes.tooltipShapeOptions */
            shapes: [ 'img-rounded', 'img-circle', 'img-thumbnail', '' ]
        }
    })
    $.extend($.summernote.plugins,{
        'imageAttributes':function(context){
            var self=this;
            var ui=$.summernote.ui;
            var $note=context.layoutInfo.note;
            var $editor=context.layoutInfo.editor;
            var $editable=context.layoutInfo.editable;
            var options=context.options;
            var lang=options.langInfo;
            context.memo('button.imageAttributes',function(){
                var button=ui.button({
                    contents:options.imageAttributes.icon,
                    tooltip:lang.imageAttributes.tooltip,
                    click:function(e){
                        context.invoke('imageAttributes.show');
                    }
                });
                return button.render();
            });
            this.initialize=function(){
                var $container=options.dialogsInBody?$(document.body):$editor;
                var $shapesOptions = '';
                $.each( options.imageShape.shapes, function( index, value ) {
                	if(value) $shapesOptions = $shapesOptions + '<option value="' + value + '">' + lang.imageAttributes.tooltipShapeOptions[index] + '</option>'
                });
                var body='<h5>'+lang.imageAttributes.pluginImageTitle+'</h5>'+
                        '<div class="form-group">'+
                            '<label class="control-label col-xs-2">'+lang.imageAttributes.title+'</label>'+
                            '<div class="input-group col-xs-10">'+
                                '<input type="text" class="note-image-attributes-title form-control">'+
                            '</div>'+
                        '</div>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.alt+'</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<input type="text" class="note-image-attributes-alt form-control">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.class+'</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<input type="text" class="note-image-attributes-class form-control">'+
                        '<div class="input-group-btn">'+
                            '<select class="note-image-attributes-class-select btn btn-default">'+
                                '<option value="">' + lang.imageAttributes.classSelect + '</option>'+
                                $shapesOptions+
                            '</select>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.style + '</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<input type="text" class="note-image-attributes-style form-control">'+
                    '</div>'+
                '</div>'+
                '<h5>'+lang.imageAttributes.pluginLinkTitle+'</h5>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.href+'</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<input type="text" class="note-image-attributes-href form-control">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.target+'</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<select class="note-image-attributes-target form-control">'+
                            '<option value="_self">Self</option>'+
                            '<option value="_blank">Blank</option>'+
                            '<option value="_top">Top</option>'+
                            '<option value="_parent">Parent</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.linkClass+'</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<input type="text" class="note-image-attributes-link-class form-control">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">'+
                    '<label class="control-label col-xs-2">'+lang.imageAttributes.rel+'</label>'+
                    '<div class="input-group col-xs-10">'+
                        '<select class="note-image-attributes-link-rel form-control">'+
                            '<option value="">'+lang.imageAttributes.relBlank+'</option>'+
                            '<option value="alternate">'+lang.imageAttributes.relAlternate+'</option>'+
                            '<option value="author">'+lang.imageAttributes.relAuthor+'</option>'+
                            '<option value="bookmark">'+lang.imageAttributes.relBookmark+'</option>'+
                            '<option value="help">'+lang.imageAttributes.relHelp+'</option>'+
                            '<option value="license">'+lang.imageAttributes.relLicense+'</option>'+
                            '<option value="next">'+lang.imageAttributes.relNext+'</option>'+
                            '<option value="nofollow">'+lang.imageAttributes.relNofollow+'</option>'+
                            '<option value="noreferrer">'+lang.imageAttributes.relNoreferrer+'</option>'+
                            '<option value="prefetch">'+lang.imageAttributes.relPrefetch+'</option>'+
                            '<option value="prev">'+lang.imageAttributes.relPrev+'</option>'+
                            '<option value="search">'+lang.imageAttributes.relSearch+'</option>'+
                            '<option value="tag">'+lang.imageAttributes.relTag+'</option>'+
                        '</select>'+
                    '</div>'+
                '</div>';
                this.$dialog=ui.dialog({
                    title:'Image Attributes',
                    body:body,
                    footer:'<button href="#" class="btn btn-primary note-image-attributes-btn">OK</button>'
                }).render().appendTo($container);
            };
            this.destroy=function(){
                ui.hideDialog(this.$dialog);
                this.$dialog.remove();
            };
            this.bindEnterKey=function($input,$btn){
                $input.on('keypress',function(event){
                    if(event.keyCode===13){
                        $btn.trigger('click');
                    }
                });
            };
            this.bindLabels=function(){
            	self.$dialog.find('.form-control:first').focus().select();
            	self.$dialog.find('label').on('click', function() {
            		$(this).parent().find('.form-control:first').focus();
            	});
            };
            this.bindClassesSelector=function(){
            	$('.note-image-attributes-class-select').on('change', function() {
					/* Options are mutually exclusive, so we just remove the others before adding */
					$.each( options.imageShape.shapes, function( index, value ) {
						$('.note-image-attributes-class').val( $('.note-image-attributes-class').val().replace(value, "") );
					});
					$('.note-image-attributes-class').val(
						$.unique( /* Ensure no duplicate classes */
							$.trim( $('.note-image-attributes-class').val() + ' ' + $(this).val() ) /* Concat and trim */
							.replace(/ +(?= )/g,'') /* Remove multiple spaces */
							.split(' ')
							).join(' ')
					)
            	});
            };
            this.show=function(){
                var $img=$($editable.data('target'));
                var imgInfo={
                    imgDom:$img,
                    title:$img.attr('title'),
                    alt:$img.attr('alt'),
                    class:$img.attr('class'),
                    style:$img.attr('style'),
                    imgLink:$($img.context).parent().is("a")?$($img.context).parent():null
                };
                this.showLinkDialog(imgInfo)
                    .then(function(imgInfo){
                        ui.hideDialog(self.$dialog);
                        var $img=imgInfo.imgDom;
                        if(options.imageAttributes.removeEmpty){
                            if(imgInfo.alt){
                                $img.attr('alt',imgInfo.alt);
                            }else{
                                $img.removeAttr('alt');
                            }
                            if(imgInfo.title){
                                $img.attr('title',imgInfo.title);
                            }else{
                                $img.removeAttr('title');
                            }
                            if(imgInfo.class){
                                $img.attr('class',imgInfo.class);
                            }else{
                                $img.removeAttr('class');
                            }
                            if(imgInfo.style){
                                $img.attr('style',imgInfo.style);
                            }else{
                                $img.removeAttr('style');
                            }
                        }else{
                            $img.attr('alt',imgInfo.alt);
                            $img.attr('title',imgInfo.title);
                            $img.attr('class',imgInfo.class);
                            $img.attr('style',imgInfo.style);
                        }
                        if($img.parent().is("a")){
                            $img.unwrap();
                        }
                        var hrefRegex=new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi);
                        if(imgInfo.href.match(hrefRegex)){
                            var lnktxt='<a';
                            if(imgInfo.linkClass){
                                lnktxt+=' class="'+imgInfo.linkClass+'"';
                            }
                            lnktxt+=' href="'+imgInfo.href+'"';
                            lnktxt+=' target="'+imgInfo.target+'"';
                            if(imgInfo.linkRel){
                                lnktxt+=' rel="'+imgInfo.linkRel+'"';
                            }
                            lnktxt+='></a>';
                            $img.wrap(lnktxt);
                        }
                        $note.val(context.invoke('code'));
                        $note.change();
                    });
            };
            this.showLinkDialog=function(imgInfo){
                return $.Deferred(function(deferred){
                    var $imageTitle=self.$dialog.find('.note-image-attributes-title'),
                        $imageAlt=self.$dialog.find('.note-image-attributes-alt'),
                        $imageClass=self.$dialog.find('.note-image-attributes-class'),
                        $imageStyle=self.$dialog.find('.note-image-attributes-style'),
                        $linkHref=self.$dialog.find('.note-image-attributes-href'),
                        $linkTarget=self.$dialog.find('.note-image-attributes-target'),
                        $linkClass=self.$dialog.find('.note-image-attributes-link-class'),
                        $linkRel=self.$dialog.find('.note-image-attributes-link-rel'),
                        $editBtn=self.$dialog.find('.note-image-attributes-btn');
                    if(imgInfo.imgLink){
                        $linkHref.val(imgInfo.imgLink.attr('href'));
                        $linkClass.val(imgInfo.imgLink.attr('class'));
                        $linkTarget.find('option').each(function(){
                            if($(this).val()==imgInfo.imgLink.attr('target')){
                                $(this).attr('selected','selected');
                            }
                        });
                        $linkRel.find('option').each(function(){
                            if($(this).val()==imgInfo.imgLink.attr('rel')){
                                $(this).attr('selected','selected');
                            }
                        });
                    }
                    ui.onDialogShown(self.$dialog,function(){
                        context.triggerEvent('dialog.shown');
                        $editBtn.click(function(e){
                            e.preventDefault();
                            deferred.resolve({
                                imgDom:imgInfo.imgDom,
                                title:$imageTitle.val(),
                                alt:$imageAlt.val(),
                                class:$imageClass.val(),
                                style:$imageStyle.val(),
                                href:$linkHref.val(),
                                target:$linkTarget.val(),
                                linkClass:$linkClass.val(),
                                linkRel:$linkRel.val()
                            });
                        });
                        $imageTitle.val(imgInfo.title).focus;
                        $imageAlt.val(imgInfo.alt);
                        $imageClass.val(imgInfo.class);
                        $imageStyle.val(imgInfo.style);
                        self.bindEnterKey(
                            $editBtn
                        );
                        self.bindLabels();
                        self.bindClassesSelector();
                    });
                    ui.onDialogHidden(self.$dialog,function(){
                        $editBtn.off('click');
                        if(deferred.state()==='pending'){
                            deferred.reject();
                        }
                    });
                    ui.showDialog(self.$dialog);
                });
            };
        },
        'imageShape':function(context){
            var ui=$.summernote.ui;
            var $editable=context.layoutInfo.editable;
            var $note=context.layoutInfo.note;
            var options=context.options;
            var lang=options.langInfo;
            context.memo('button.imageShape',function(){
            	var button = ui.buttonGroup([
            		ui.button({
            			className: 'dropdown-toggle',
            			contents: options.imageShape.icon + ' <span class="caret"></span>',
            			tooltip: lang.imageAttributes.tooltipShape,
            			data: {
            				toggle: 'dropdown'
            			}
            		}),
            		ui.dropdown({
            			className: 'dropdown-shape',
            			items: lang.imageAttributes.tooltipShapeOptions,
            			click: function (event) {
            					var $button = $(event.target);
            					var $img=$($editable.data('target'));
            					var index = $.inArray( $button.data('value'), lang.imageAttributes.tooltipShapeOptions );
            					/* Options are mutually exclusive, so we just remove the others before adding */
            					$.each( options.imageShape.shapes, function( index, value ) { $img.removeClass(value); });
            					$img.addClass( options.imageShape.shapes[index] );
            					context.invoke('editor.afterCommand');
            				}
            		})
            	]);
                return button.render();
            });
        }
    });
}));
