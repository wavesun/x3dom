/*
 * X3DOM JavaScript Library
 * http://x3dom.org
 *
 * (C)2009 Fraunhofer Insitute for Computer
 *         Graphics Reseach, Darmstadt
 * Dual licensed under the MIT and GPL.
 *
 * Based on code originally provided by
 * Philip Taylor: http://philip.html5.org
 */
 
/** @namespace The math namespace. */
math = {};

math.Eps = 0.000001;

var force_native_arrays = false;

/** Float32Array  */
if(typeof Float32Array != "undefined" && !force_native_arrays)
  math.Float32Array = Float32Array;
else if(typeof WebGLFloatArray != "undefined" && !force_native_arrays) 
  math.Float32Array = WebGLFloatArray;
else
  math.Float32Array = Array;

/** Template vector functions */
math.vector =
{
  add : function(left, right, result)
  {
    for(var i=0; i<left._v.length; ++i)
      result._v[i] = left._v[i] + right._v[i];
  },
  
  sub : function(left, right, result)
  {
    for(var i=0; i<left._v.length; ++i)
      result._v[i] = left._v[i] - right._v[i];
  },
  
  dot : function(left, right)
  {
    var temp = 0.0;
    
    for(var i=0; i<left._v.length; ++i)
      temp += (left._v[i] * left._v[i]) + (right._v[i] * right._v[i]);
      
    return temp;
  },
  
  length : function(vec)
  {
    var temp = 0.0;
    
    for(var i=0; i<vec.width; ++i)
      temp += vec._v[i] * vec._v[i];
    
    return Math.sqrt(temp);
  },
  
  normalize : function(vec)
  {
    var n = math.vector.length(vec);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    for(var i=0; i<vec.width; ++i)
      vec._v[i] *= n;
  }
};

/** Template matrix functions */
math.matrix =
{
  index : function(x, y)
  {
    return [x + (y * this.width)];
  },
};

/** The Vector[2] */
math.vec2 = 
{
  _v : null,
  
  width : 2,
  
  add : math.vector.add,
  sub : math.vector.sub,
  dot : math.vector.dot,
  
  length : function(vec)
  {
    var x = vec._v[0];
    var y = vec._v[1];
    
    return Math.sqrt(x*x + y*y);
  },
  
  normalize : function(vec)
  {
    var x = vec._v[0];
    var y = vec._v[1];
    
    var n = Math.sqrt(x*x + y*y);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec._v[0] = x * n;
    vec._v[1] = y * n;
  },
  
  create : function()
  {
    this._v = new math.Float32Array(2);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<2; ++i)
          this._v[i] = arguments[0][i];
          
      else
        for(var i=0; i<2; ++i)
          this._v[i] = arguments[i];
    }
    
    return this;
  }
};

/** The Vector[3] */
math.vec3 = 
{
  _v : null,
  
  width : 3,
  
  add : math.vector.add,
  sub : math.vector.sub,
  dot : math.vector.dot,
  
  length : function(vec)
  {
    var x = vec._v[0];
    var y = vec._v[1];
    var z = vec._v[2];
    
    return Math.sqrt(x*x + y*y + z*z);
  },
  
  normalize : function(vec)
  {
    var x = vec._v[0];
    var y = vec._v[1];
    var z = vec._v[2];
    
    var n = Math.sqrt(x*x + y*y + z*z);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec._v[0] = x * n;
    vec._v[1] = y * n;
    vec._v[2] = z * n;
  },
  
  create : function()
  {
    this._v = new math.Float32Array(3);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<3; ++i)
          this._v[i] = arguments[0][i];
          
      else
        for(var i=0; i<3; ++i)
          this._v[i] = arguments[i];
    }
    
    return this;
  }
};

/** The Vector[4] */
math.vec4 = 
{
  _v : null,
  
  width : 4,
  
  add : math.vector.add,
  sub : math.vector.sub,
  dot : math.vector.dot,
  
  length : function(vec)
  {
    var x = vec._v[0];
    var y = vec._v[1];
    var z = vec._v[2];
    var w = vec._v[3];
    
    return Math.sqrt(x*x + y*y + z*z);
  },
  
  normalize : function(vec)
  {
    var x = vec._v[0];
    var y = vec._v[1];
    var z = vec._v[2];
    var w = vec._v[3];
    
    var n = Math.sqrt(x*x + y*y + z*z + w*w);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec._v[0] = x * n;
    vec._v[1] = y * n;
    vec._v[2] = z * n;
    vec._v[3] = w * n;
  },

  create : function()
  {
    this._v = new math.Float32Array(4);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<4; ++i)
          this._v[i] = arguments[0][i];
          
      else
        for(var i=0; i<4; ++i)
          this._v[i] = arguments[i];
    }
    
    return this;
  }
};

/** The 2x2 Matrix */

/** The 3x3 Matrix */

/** The 4x4 Matrix */
math.mat4x4 = 
{
  _m : null,
  
  width : 4,
  height : 4,
  
  create : function()
  {
    this._m = new math.Float32Array(16);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<16; ++i)
          this._m[i] = arguments[0][i];
          
      else
        for(var i=0; i<16; ++i)
          this._m[i] = arguments[i];
    }
        
    else
      math.mat4x4.identity(this);

    return this;
  },
  
  /** Sets a 4x4 matrix to identity */
  identity : function(mat)
  {
    var temp = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    
    for(var i=0; i<16; ++i)
      mat._m[i] = temp[i];
  },
  
  /** Sets a 4x4 matrix to zero */
  zero : function(mat)
  {
    var temp = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
    
    for(var i=0; i<16; ++i)
      mat._m[i] = temp[i];
  },
  
  /** 1st base vector (right) */
  e0 : function(mat, vec)
  {
    vec._v[0] = mat._m[00];
    vec._v[1] = mat._m[04];
    vec._v[2] = mat._m[08];
    
    vector.normalize(vec);
  },

  /** 2nd base vector (up) */
  e1 : function(mat, vec)
  {
    vec._v[0] = mat._m[01];
    vec._v[1] = mat._m[05];
    vec._v[2] = mat._m[09];
    
    vector.normalize(vec);
  },

  /** 3rd base vector (fwd) */
  e2 : function(mat, vec)
  {
    vec._v[0] = mat._m[02];
    vec._v[1] = mat._m[06];
    vec._v[2] = mat._m[10];
    
    vector.normalize(vec);
  },

  /** 4th base vector (pos) */
  e3 : function(mat, vec)
  {
    vec._v[0] = mat._m[03];
    vec._v[1] = mat._m[07];
    vec._v[2] = mat._m[11];
  }
};