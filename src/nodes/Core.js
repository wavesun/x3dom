/*
 * X3DOM JavaScript Library
 * http://www.x3dom.org
 *
 * (C)2009 Fraunhofer IGD, Darmstadt, Germany
 * Dual licensed under the MIT and GPL
 *
 * Based on code originally provided by
 * Philip Taylor: http://philip.html5.org
 */

// ### X3DNode ###
x3dom.registerNodeType(
    "X3DNode",
    "Core",
    defineClass(null, function (ctx) {

        // holds a link to the node name
        this._DEF = null;

        // links the nameSpace
        this._nameSpace = (ctx && ctx.nameSpace) ? ctx.nameSpace : null;

        // holds all value fields (e.g. SFFloat, MFVec3f, ...)
        this._vf = {};
        this._vfFieldTypes = {};
        
        // holds all child fields ( SFNode and MFNode )
        this._cf = {};
        this._cfFieldTypes = {};

        this._fieldWatchers = {};
        this._routes = {};

        this._listeners = {};

        this._parentNodes = [];

        // FIXME; should be removed and handled by _cf methods
        this._childNodes = [];

        this.addField_SFNode('metadata', x3dom.nodeTypes.X3DMetadataObject);
    },
    {
        type: function () {
            return this.constructor;
        },
        
        typeName: function () {
            return this.constructor._typeName;
        },

        addChild: function (node, containerFieldName) {
            if (node) {
                var field = null;
                if (containerFieldName) {
                    field = this._cf[containerFieldName];
                }
                else {
                    for (var fieldName in this._cf) {
                        if (this._cf.hasOwnProperty(fieldName)) {
                            var testField = this._cf[fieldName];
                            if (x3dom.isa(node,testField.type)) {
                                field = testField;
                                break;
                            }
                        }
                    }
                }
                if (field && field.addLink(node)) {
                    node._parentNodes.push(this);
                    this._childNodes.push(node);
                    node.parentAdded(this);
                    return true;
                }
            }
            return false;
        },

        removeChild: function (node) {
            if (node) {
                for (var fieldName in this._cf) {
                    if (this._cf.hasOwnProperty(fieldName)) {
                        var field = this._cf[fieldName];
                        if (field.rmLink(node)) {
                            for (var i = 0, n = node._parentNodes.length; i < n; i++) {
                                if (node._parentNodes[i] === this) {
                                    node._parentNodes.splice(i,1);
                                    node.parentRemoved(this);
                                }
                            }
                            for (var j = 0, m = this._childNodes.length; j < m; j++) {
                                if (this._childNodes[j] === node) {
                                    this._childNodes.splice(j,1);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        },

        parentAdded: function(parent) {
            // to be overwritten by concrete classes
        },

        parentRemoved: function(parent) {
            // attention: overwritten by concrete classes
            for (var i=0, n=this._childNodes.length; i<n; i++) {
                if (this._childNodes[i]) {
                    this._childNodes[i].parentRemoved(this);
                }
            }
        },

        getCurrentTransform: function () {
            if (this._parentNodes.length >= 1) {
                return this.transformMatrix(this._parentNodes[0].getCurrentTransform());
            }
            else {
                return x3dom.fields.SFMatrix4f.identity();
            }
        },

        transformMatrix: function (transform) {
            return transform;
        },

        getVolume: function () {
            //x3dom.debug.logWarning("Called getVolume for unbounded node!");
            return null;
        },

        invalidateVolume: function() {
            // overwritten
        },

        invalidateCache: function() {
            // overwritten
        },

        volumeValid: function() {
            return false;
        },

        // Collects all objects to be drawn
        collectDrawableObjects: function (transform, drawableCollection, singlePath, invalidateCache, planeMask) {
            // explicitly do nothing on collect traversal for (most) nodes
        },
        
        highlight: function(enable, color)
        {
            if (this._vf.hasOwnProperty("diffuseColor")) 
            {
                if (enable) {
                    if (this._actDiffuseColor === undefined) {
                        this._actDiffuseColor = new x3dom.fields.SFColor();
                        this._highlightOn = false;
                    }
                    
                    if (!this._highlightOn) {
                        this._actDiffuseColor.setValues(this._vf.diffuseColor);
                        this._highlightOn = true;
                    }
                    this._vf.diffuseColor.setValues(color);
                }
                else {
                    if (this._actDiffuseColor !== undefined) {
                        this._vf.diffuseColor.setValues(this._actDiffuseColor);
                        this._highlightOn = false;
                        // new/delete every frame can be very slow
                        // but prevent from copying if called not only on change
                        delete this._actDiffuseColor;
                    }
                }
            }

            for (var i=0, n=this._childNodes.length; i<n; i++)
            {
                if (this._childNodes[i])
                    this._childNodes[i].highlight(enable, color);
            }
        },

        findX3DDoc: function () {
            return this._nameSpace.doc;
        },

        doIntersect: function(line) {
            var isect = false;
            for (var i=0; i<this._childNodes.length; i++) {
                if (this._childNodes[i]) {
                    isect = this._childNodes[i].doIntersect(line) || isect;
                }
            }
            return isect;
        },

        postMessage: function (field, msg) {
            // TODO: timestamps and stuff
            this._vf[field] = msg;  // FIXME; _cf!!!
            var listeners = this._fieldWatchers[field];
            var thisp = this;
            if (listeners) {
                Array.forEach(listeners, function (l) { l.call(thisp, msg); });
            }
        },

        // method for handling field updates
        updateField: function (field, msg) {
            var f = this._vf[field];

            if (f === undefined) {
                var pre = "set_";
                if (field.indexOf(pre) == 0) {
                    var fieldName = field.substr(pre.length, field.length - 1);
                    if (this._vf[fieldName] !== undefined) {
                        field = fieldName;
                        f = this._vf[field];
                    }
                }
                if (f === undefined) {
                    f = {};
                    this._vf[field] = f;
                }
            }

            if (f !== null) {
                try {
                    this._vf[field].setValueByStr(msg);
                }
                catch (exc1) {
                    try {
                        switch ((typeof(this._vf[field])).toString()) {
                            case "number":
                                if (typeof(msg) == "number")
                                    this._vf[field] = msg;
                                else
                                    this._vf[field] = +msg;
                                break;
                            case "boolean":
                                if (typeof(msg) == "boolean")
                                    this._vf[field] = msg;
                                else
                                    this._vf[field] = (msg.toLowerCase() == "true");
                                break;
                            case "string":
                                this._vf[field] = msg;
                                break;
                        }
                    }
                    catch (exc2) {
                        x3dom.debug.logError("updateField: setValueByStr() NYI for " + typeof(f));
                    }
                }

                // TODO: eval fieldChanged for all nodes!
                this.fieldChanged(field);
            }
        },

        setupRoute: function (fromField, toNode, toField) {
            var pos;
            var fieldName;
            var pre = "set_", post = "_changed";

            // build correct fromField
            if (!this._vf[fromField]) {
                pos = fromField.indexOf(pre);
                if (pos === 0) {
                    fieldName = fromField.substr(pre.length, fromField.length - 1);
                    if (this._vf[fieldName]) {
                        fromField = fieldName;
                    }
                } else {
                    pos = fromField.indexOf(post);
                    if (pos > 0) {
                        fieldName = fromField.substr(0, fromField.length - post.length);
                        if (this._vf[fieldName]) {
                            fromField = fieldName;
                        }
                    }
                }
            }

            // build correct toField
            if (!toNode._vf[toField]) {
                pos = toField.indexOf(pre);
                if (pos === 0) {
                    fieldName = toField.substr(pre.length, toField.length - 1);
                    if (toNode._vf[fieldName]) {
                        toField = fieldName;
                    }
                }
                else {
                    pos = toField.indexOf(post);
                    if (pos > 0) {
                        fieldName = toField.substr(0, toField.length - post.length);
                        if (toNode._vf[fieldName]) {
                            toField = fieldName;
                        }
                    }
                }
            }

            var where = this._DEF + "&" + fromField + "&" + toNode._DEF + "&" + toField;

            if (!this._routes[where]) {
                if (!this._fieldWatchers[fromField]) {
                    this._fieldWatchers[fromField] = [];
                }
                this._fieldWatchers[fromField].push(
                    function (msg) {
                        toNode.postMessage(toField, msg);
                    }
                );

                if (!toNode._fieldWatchers[toField]) {
                    toNode._fieldWatchers[toField] = [];
                }
                toNode._fieldWatchers[toField].push(
                    // FIXME: THIS DOESN'T WORK FOR NODE (_cf) FIELDS
                    function (msg) {
                        toNode._vf[toField] = msg;
                        toNode.fieldChanged(toField);
                    }
                );

                // store this route to be able to delete it
                this._routes[where] = {
                    from: this._fieldWatchers[fromField].length - 1,
                    to: toNode._fieldWatchers[toField].length - 1
                };
            }
        },

        removeRoute: function (fromField, toNode, toField) {
            var pos;
            var fieldName;
            var pre = "set_", post = "_changed";

            // again, build correct fromField
            if (!this._vf[fromField]) {
                pos = fromField.indexOf(pre);
                if (pos === 0) {
                    fieldName = fromField.substr(pre.length, fromField.length - 1);
                    if (this._vf[fieldName]) {
                        fromField = fieldName;
                    }
                } else {
                    pos = fromField.indexOf(post);
                    if (pos > 0) {
                        fieldName = fromField.substr(0, fromField.length - post.length);
                        if (this._vf[fieldName]) {
                            fromField = fieldName;
                        }
                    }
                }
            }

            // again, build correct toField
            if (!toNode._vf[toField]) {
                pos = toField.indexOf(pre);
                if (pos === 0) {
                    fieldName = toField.substr(pre.length, toField.length - 1);
                    if (toNode._vf[fieldName]) {
                        toField = fieldName;
                    }
                }
                else {
                    pos = toField.indexOf(post);
                    if (pos > 0) {
                        fieldName = toField.substr(0, toField.length - post.length);
                        if (toNode._vf[fieldName]) {
                            toField = fieldName;
                        }
                    }
                }
            }

            // finally, delete route
            var where = this._DEF + "&" + fromField + "&" + toNode._DEF + "&" + toField;

            if (this._routes[where]) {
                this._fieldWatchers[fromField].splice(this._routes[where].from, 1);
                toNode._fieldWatchers[toField].splice(this._routes[where].to, 1);

                delete this._routes[where];
            }
        },

        fieldChanged: function (fieldName) {
            // to be overwritten by concrete classes
        },

        nodeChanged: function () {
            // to be overwritten by concrete classes
        },
        
		callEvtHandler: function(eventType, event) {
			var node = this;
			
			try {
				var attrib = node._xmlNode[eventType];
				event.target = node._xmlNode;
				
				if (typeof(attrib) === "function") {
					attrib.call(node._xmlNode, event);
				}
				else {
					var funcStr = node._xmlNode.getAttribute(eventType);
					var func = new Function('event', funcStr);
					func.call(node._xmlNode, event);
				}
				
				var list = node._listeners[event.type];
				if (list) {
					for (var it=0; it<list.length; it++) {
						list[it].call(node._xmlNode, event);
					}
				}
			}
			catch(ex) {
				x3dom.debug.logException(ex);
			}
			
			return event.cancelBubble;
		},
        
        initSetter: function (xmlNode, name) {
			if (xmlNode.__defineSetter__ !== undefined) {
				xmlNode.__defineSetter__(name, function(value) {
					xmlNode.setAttribute(name, value);
				});
			}
			else {
			    //IE has no __defineSetter__ !!!
				Object.defineProperty(xmlNode, name, {
					set: function(value) {
						xmlNode.setAttribute(name, value); 
					},
                    configurable : true
				});	
      		}
      		
			if (!xmlNode.attributes[name]) {
			    if (this._vf[name]) {
    			    var str = "";
    			    try {
    			        if (this._vf[name].toGL)
    			            str = this._vf[name].toGL().toString();
    			        else
    			            str = this._vf[name].toString();
    		        }
    		        catch(e) {
    		            str = this._vf[name].toString();
    		        }    
    		        if (!str) { str = ""; }
    		        xmlNode.setAttribute(name, str);
    	        }
		    }
        },

        // single fields
        addField_SFInt32: function (ctx, name, n) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                parseInt(ctx.xmlNode.getAttribute(name),10) : n;
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFInt32";
        },
        
        addField_SFFloat: function (ctx, name, n) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                +ctx.xmlNode.getAttribute(name) : n;
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFFloat";
        },
        
        addField_SFDouble: function (ctx, name, n) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                +ctx.xmlNode.getAttribute(name) : n;
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFDouble";
        },
        
        addField_SFTime: function (ctx, name, n) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                +ctx.xmlNode.getAttribute(name) : n;
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFTime";
        },
        
        addField_SFBool: function (ctx, name, n) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                ctx.xmlNode.getAttribute(name).toLowerCase() === "true" : n;
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFBool";
        },
        
        addField_SFString: function (ctx, name, n) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                ctx.xmlNode.getAttribute(name) : n;
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFString";
        },
        
        addField_SFColor: function (ctx, name, r, g, b) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.SFColor.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.SFColor(r, g, b);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFColor";
        },
        
        addField_SFColorRGBA: function (ctx, name, r, g, b, a) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.SFColorRGBA.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.SFColorRGBA(r, g, b, a);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFColorRGBA";
        },
        
        addField_SFVec2f: function (ctx, name, x, y) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.SFVec2f.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.SFVec2f(x, y);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFVec2f";
        },
        
        addField_SFVec3f: function (ctx, name, x, y, z) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.SFVec3f.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.SFVec3f(x, y, z);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFVec3f";
        },
        
        addField_SFVec3d: function(ctx, name, x, y, z) {
            this.addField_SFVec3f(ctx, name, x, y, z);
            this._vfFieldTypes[name] = "SFVec3d";
        },
        
        addField_SFRotation: function (ctx, name, x, y, z, a) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.Quaternion.parseAxisAngle(ctx.xmlNode.getAttribute(name)) :
                x3dom.fields.Quaternion.axisAngle(new x3dom.fields.SFVec3f(x, y, z), a);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFRotation";
        },
        
        addField_SFMatrix4f: function (ctx, name, _00, _01, _02, _03,
                                                  _10, _11, _12, _13,
                                                  _20, _21, _22, _23,
                                                  _30, _31, _32, _33) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.SFMatrix4f.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.SFMatrix4f(_00, _01, _02, _03,
                                            _10, _11, _12, _13,
                                            _20, _21, _22, _23,
                                            _30, _31, _32, _33);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFMatrix4f";
        },
        
        addField_SFImage: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.SFImage.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.SFImage(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "SFImage";
        },

        // multi fields
        addField_MFString: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFString.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFString(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFString";
        },
        
        addField_MFInt32: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFInt32.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFInt32(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFInt32";
        },
        
        addField_MFFloat: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFFloat.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFFloat(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFFloat";
        },
        
        addField_MFDouble: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFFloat.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFFloat(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFDouble";
        },
        
        addField_MFColor: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFColor.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFColor(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFColor";
        },
        
        addField_MFColorRGBA: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFColorRGBA.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFColorRGBA(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFColorRGBA";
        },
        
        addField_MFVec2f: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFVec2f.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFVec2f(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFVec2f";
        },
        
        addField_MFVec3f: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFVec3f.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFVec3f(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFVec3f";
        },
        
        addField_MFVec3d: function (ctx, name, def) {
            this.addField_MFVec3f(ctx, name, def);
            this._vfFieldTypes[name] = "MFVec3d";
        },
        
        addField_MFRotation: function (ctx, name, def) {
            this._vf[name] = ctx && ctx.xmlNode && ctx.xmlNode.hasAttribute(name) ?
                x3dom.fields.MFRotation.parse(ctx.xmlNode.getAttribute(name)) :
                new x3dom.fields.MFRotation(def);
                
            if (ctx && ctx.xmlNode) { this.initSetter(ctx.xmlNode, name); }
            this._vfFieldTypes[name] = "MFRotation";
        },
        
        // child node fields
        addField_SFNode: function (name, type) {
            this._cf[name] = new x3dom.fields.SFNode(type);
            this._cfFieldTypes[name] = "SFNode";
        },
        addField_MFNode: function (name, type) {
            this._cf[name] = new x3dom.fields.MFNode(type);
            this._cfFieldTypes[name] = "MFNode";
        }
    }
));

/* ### X3DMetadataObject ### */
x3dom.registerNodeType(
    "X3DMetadataObject",
    "Core",
    defineClass(x3dom.nodeTypes.X3DNode,
        function (ctx) {
            x3dom.nodeTypes.X3DMetadataObject.superClass.call(this, ctx);

            this.addField_SFString(ctx, 'name', "");
            this.addField_SFString(ctx, 'reference', "");
        }
    )
);

/* ### MetadataDouble ### */
x3dom.registerNodeType(
    "MetadataDouble",
    "Core",
    defineClass(x3dom.nodeTypes.X3DMetadataObject,
        function (ctx) {
            x3dom.nodeTypes.MetadataDouble.superClass.call(this, ctx);

            this.addField_MFDouble(ctx, 'value', []);
        }
    )
);

/* ### MetadataFloat ### */
x3dom.registerNodeType(
    "MetadataFloat",
    "Core",
    defineClass(x3dom.nodeTypes.X3DMetadataObject,
        function (ctx) {
            x3dom.nodeTypes.MetadataFloat.superClass.call(this, ctx);

            this.addField_MFFloat(ctx, 'value', []);
        }
    )
);

/* ### MetadataInteger ### */
x3dom.registerNodeType(
    "MetadataInteger",
    "Core",
    defineClass(x3dom.nodeTypes.X3DMetadataObject,
        function (ctx) {
            x3dom.nodeTypes.MetadataInteger.superClass.call(this, ctx);

            this.addField_MFInt32(ctx, 'value', []);
        }
    )
);

/* ### MetadataSet ### */
x3dom.registerNodeType(
    "MetadataSet",
    "Core",
    defineClass(x3dom.nodeTypes.X3DMetadataObject,
        function (ctx) {
            x3dom.nodeTypes.MetadataSet.superClass.call(this, ctx);

            this.addField_MFNode('value', x3dom.nodeTypes.X3DMetadataObject);
        }
    )
);

/* ### MetadataString ### */
x3dom.registerNodeType(
    "MetadataString",
    "Core",
    defineClass(x3dom.nodeTypes.X3DMetadataObject,
        function (ctx) {
            x3dom.nodeTypes.MetadataString.superClass.call(this, ctx);

            this.addField_MFString(ctx, 'value', []);
        }
    )
);

/* ### Field ### */
x3dom.registerNodeType(
    "Field",
    "Core",
    defineClass(x3dom.nodeTypes.X3DNode,
        function (ctx) {
            x3dom.nodeTypes.Field.superClass.call(this, ctx);

            this.addField_SFString(ctx, 'name', "");
            this.addField_SFString(ctx, 'type', "");
            this.addField_SFString(ctx, 'value', "");
        },
        {
            fieldChanged: function(fieldName) {
                var that = this;
                if (fieldName === 'value') {
                    Array.forEach(this._parentNodes, function (node) {
                        node.fieldChanged(that._vf.name);
                    });
                }
            }
        }
    )
);


/* ### X3DChildNode ### */
x3dom.registerNodeType(
    "X3DChildNode",
    "Core",
    defineClass(x3dom.nodeTypes.X3DNode,
        function (ctx) {
            x3dom.nodeTypes.X3DChildNode.superClass.call(this, ctx);
        }
    )
);

/* ### X3DBindableNode ### */
x3dom.registerNodeType(
    "X3DBindableNode",
    "Core",
    defineClass(x3dom.nodeTypes.X3DChildNode,
        function (ctx) {
          x3dom.nodeTypes.X3DBindableNode.superClass.call(this, ctx);

          this.addField_SFBool(ctx, 'bind', false);
          this.addField_SFString(ctx, 'description', "");
          this.addField_SFBool(ctx, 'isActive', false);

          this._autoGen = (ctx && ctx.autoGen ? true : false);
          if (this._autoGen)
              this._vf.description = "default" + this.constructor.superClass._typeName;
          
          // Bindable stack to register node later on 
          this._stack = null;
        },
        {
            bind: function (value) {
                if (this._stack) {
                    if (value) {
                        this._stack.push (this);
                    }
                    else {
                        this._stack.pop  (this);
                    }
                }
                else {
                    x3dom.debug.logError ('No BindStack in ' + this.typeName() + 'Bindable');
                }
            },

            activate: function (prev) {
                this.postMessage('isActive', true);
                x3dom.debug.logInfo('activate ' + this.typeName() + 'Bindable ' + 
                                    this._DEF + '/' + this._vf.description);
            },

            deactivate: function (prev) {
                this.postMessage('isActive', false);
                x3dom.debug.logInfo('deactivate ' + this.typeName() + 'Bindable ' + 
                                    this._DEF + '/' + this._vf.description);
            },

            fieldChanged: function(fieldName) {
                if (fieldName.indexOf("bind") >= 0) {
                    this.bind(this._vf.bind);
                }
            },

            nodeChanged: function() {
                this._stack = this._nameSpace.doc._bindableBag.addBindable(this);
            }
        }
    )
);


/* ### X3DInfoNode ### */
x3dom.registerNodeType(
    "X3DInfoNode",
    "Core",
    defineClass(x3dom.nodeTypes.X3DChildNode,
        function (ctx) {
            x3dom.nodeTypes.X3DInfoNode.superClass.call(this, ctx);
        }
    )
);

/* ### WorldInfo ### */
x3dom.registerNodeType(
    "WorldInfo",
    "Core",
    defineClass(x3dom.nodeTypes.X3DInfoNode,
        function (ctx) {
            x3dom.nodeTypes.WorldInfo.superClass.call(this, ctx);

            this.addField_MFString(ctx, 'info', []);
            this.addField_SFString(ctx, 'title', "");

            x3dom.debug.logInfo(this._vf.info);
            x3dom.debug.logInfo(this._vf.title);
        }
    )
);

/* ### X3DBoundedNode ### */
x3dom.registerNodeType(
    "X3DBoundedNode",
    "Core",
    defineClass(x3dom.nodeTypes.X3DChildNode,
        function (ctx) {
            x3dom.nodeTypes.X3DBoundedNode.superClass.call(this, ctx);

            this.addField_SFBool(ctx, 'render', true);
            this.addField_SFVec3f(ctx, 'bboxCenter', 0, 0, 0);
            this.addField_SFVec3f(ctx, 'bboxSize', -1, -1, -1);

            this._graph = {
                boundedNode:  this,    // backref to node object
                localMatrix:  x3dom.fields.SFMatrix4f.identity(),   // usually identity
                globalMatrix: null,    // new x3dom.fields.SFMatrix4f();
                volume:       new x3dom.fields.BoxVolume(),     // local bbox
                worldVolume:  new x3dom.fields.BoxVolume(),     // global bbox
                center:       new x3dom.fields.SFVec3f(0,0,0),  // center in eye coords
                coverage:     -1       // currently approx. number of pixels on screen
            };
        },
        {
            fieldChanged: function (fieldName) {
                // TODO; wait for sync traversal to invalidate en block
                if (this._vf.hasOwnProperty(fieldName)) {
                    this.invalidateVolume();
                    //this.invalidateCache();
                }
            },

            nodeChanged: function () {
                // TODO; wait for sync traversal to invalidate en block
                this.invalidateVolume();
                //this.invalidateCache();
            },

            parentAdded: function(parent) {
                // some default behavior if not overwitten
                this.invalidateVolume();
                //this.invalidateCache();
            },

            getVolume: function()
            {
                var vol = this._graph.volume;

                if (!this.volumeValid() && this._vf.render)
                {
                    for (var i=0, n=this._childNodes.length; i<n; i++)
                    {
                        var child = this._childNodes[i];
                        // render could be undefined, but undefined != true
                        if (!child || child._vf.render !== true)
                            continue;

                        var childVol = child.getVolume();

                        if (childVol && childVol.isValid())
                            vol.extendBounds(childVol.min, childVol.max);
                    }
                }

                return vol;
            },

            invalidateVolume: function()
            {
                var graph = this._graph;

                graph.volume.invalidate();

                // also clear cache
                graph.worldVolume.invalidate();
                graph.globalMatrix = null;

                // set parent volumes invalid, too
                for (var i=0, n=this._parentNodes.length; i<n; i++) {
                    var node = this._parentNodes[i];
                    if (node && node.volumeValid())
                        node.invalidateVolume();
                }
            },

            invalidateCache: function()
            {
                var graph = this._graph;

                //if (graph.volume.isValid() &&
                //    graph.globalMatrix == null && !graph.worldVolume.isValid())
                //    return;     // stop here, we're already done

                graph.worldVolume.invalidate();
                graph.globalMatrix = null;

                // clear children's cache, too
                //for (var i=0, n=this._childNodes.length; i<n; i++) {
                //    var node = this._childNodes[i];
                //    if (node)
                //        node.invalidateCache();
                //}
            },

            cacheInvalid: function()
            {
                return ( this._graph.globalMatrix == null ||
                        !this._graph.worldVolume.isValid() );
            },

            volumeValid: function()
            {
                return this._graph.volume.isValid();
            },

            graphState: function()
            {
                return this._graph;
            },

            forceUpdateCoverage: function()
            {
                return false;
            },

            setVisibility: function(on)
            {
                if (on != this._vf.render) {
                    this._actRender = this._vf.render;
                    this._vf.render = on;
                }

                for (var i=0, n=this._childNodes.length; i<n; i++)
                {
                    var child = this._childNodes[i];
                    if (child && child.setVisibility)
                        child.setVisibility(on);
                }
            },

            resetVisibility: function()
            {
                if (this._actRender !== undefined &&
                    this._actRender != this._vf.render) {
                    this._vf.render = this._actRender;
                }

                for (var i=0, n=this._childNodes.length; i<n; i++)
                {
                    var child = this._childNodes[i];
                    if (child && child.resetVisibility)
                        child.resetVisibility();
                }
            }
        }
    )
);

// ### X3DSensorNode ###
x3dom.registerNodeType(
    "X3DSensorNode",
    "Core",
    defineClass(x3dom.nodeTypes.X3DChildNode,
        function (ctx) {
            x3dom.nodeTypes.X3DSensorNode.superClass.call(this, ctx);
        }
    )
);

// deprecated, will be removed in 1.5
// ### Param ###
x3dom.registerNodeType(
    "Param",
    "Core",
    defineClass(x3dom.nodeTypes.X3DNode,
        function (ctx) {
            x3dom.nodeTypes.Param.superClass.call(this, ctx);
            
            x3dom.debug.logWarning('DEPRECATED: Param element needs to be child of X3D element '
                      + '[<a href="http://x3dom.org/docs/latest/configuration.html">DOCS</a>]');
        }
    )
);
