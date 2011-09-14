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

/** Float32Array  */
if(typeof Float32Array != "undefined")
  math.Float32Array = Float32Array;
else if(typeof WebGLFloatArray != "undefined") 
  math.Float32Array = WebGLFloatArray;
else
  math.Float32Array = Array;
  
/** The Vector[2] */
math.vec2 = 
{
  create : function()
  {
    var vec = new math.Float32Array(2);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<2; ++i)
          vec[i] = arguments[0][i];
          
      else
        for(var i=0; i<2; ++i)
          vec[i] = arguments[i];
    }
    
    return vec;
  },
  
  negate : function(vec)
  {
    vec[0] = -vec[0];
    vec[1] = -vec[1];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
  },
  
  dot : function(left, right)
  {
    return (left[0] * right[0] + left[1] * right[1]);
  },
  
  length : function(vec)
  {
    var x = vec[0];
    var y = vec[1];
    
    return Math.sqrt(x*x + y*y);
  },
  
  normalize : function(vec)
  {
    var x = vec[0];
    var y = vec[1];
    
    var n = Math.sqrt(x*x + y*y);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec[0] = x * n;
    vec[1] = y * n;
  }
};

/** The Vector[3] */
math.vec3 = 
{
  create : function()
  {
    var vec = new math.Float32Array(3);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<3; ++i)
          vec[i] = arguments[0][i];
          
      else
        for(var i=0; i<3; ++i)
          vec[i] = arguments[i];
    }
    
    return vec;
  },
  
  negate : function(vec)
  {
    vec[0] = -vec[0];
    vec[1] = -vec[1];
    vec[2] = -vec[2];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
  },
  
  dot : function(left, right)
  {
    return (left[0] * right[0] + left[1] * right[1] + left[2] * right[2]);
  },
  
  cross : function(left, right, result)
  {
    var xl = left[0];
    var yl = left[1];
    var zl = left[2];
    
    var xr = right[0];
    var yr = right[1];
    var zr = right[2];
    
    result[0] = (yl * zr) - (zl * yr); 
    result[1] = (zl * xr) - (xl * zr); 
    result[2] = (xl * yr) - (yl * xr);
  },
  
  length : function(vec)
  {
    var x = vec[0];
    var y = vec[1];
    var z = vec[2];
    
    return Math.sqrt(x*x + y*y + z*z);
  },
  
  normalize : function(vec)
  {
    var x = vec[0];
    var y = vec[1];
    var z = vec[2];
    
    var n = Math.sqrt(x*x + y*y + z*z);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec[0] = x * n;
    vec[1] = y * n;
    vec[2] = z * n;
  }
};

/** The Vector[4] */
math.vec4 = 
{
  create : function()
  {
    var vec = new math.Float32Array(4);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<4; ++i)
          vec[i] = arguments[0][i];
          
      else
        for(var i=0; i<4; ++i)
          vec[i] = arguments[i];
    }
    
    return vec;
  },
  
  negate : function(vec)
  {
    vec[0] = -vec[0];
    vec[1] = -vec[1];
    vec[2] = -vec[2];
    vec[3] = -vec[3];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0];
    result[1] = left[1] + right[1];
    result[2] = left[2] + right[2];
    result[3] = left[3] + right[3];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0];
    result[1] = left[1] - right[1];
    result[2] = left[2] - right[2];
    result[3] = left[3] - right[3];
  },
  
  dot : function(left, right)
  {
    return (left[0] * right[0] + left[1] * right[1] + left[2] * right[2] + left[3] * right[3]);
  },
  
  length : function(vec)
  {
    var x = vec[0];
    var y = vec[1];
    var z = vec[2];
    var w = vec[3];
    
    return Math.sqrt(x*x + y*y + z*z);
  },
  
  normalize : function(vec)
  {
    var x = vec[0];
    var y = vec[1];
    var z = vec[2];
    var w = vec[3];
    
    var n = Math.sqrt(x*x + y*y + z*z + w*w);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec[0] = x * n;
    vec[1] = y * n;
    vec[2] = z * n;
    vec[3] = w * n;
  }
};

/** The 2x2 Matrix */
math.mat2x2 = 
{
};

/** The 3x3 Matrix */
math.mat3x3 = 
{
};

/** The 4x4 Matrix */
math.mat4x4 = 
{
  create : function()
  {
    var mat = new math.Float32Array(16);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<16; ++i)
          mat[i] = arguments[0][i];
          
      else
        for(var i=0; i<16; ++i)
          mat[i] = arguments[i];
    }
    
    else
      math.mat4x4.identity(mat);

    return mat;
  },
  
  identity : function(mat)
  {
    var temp = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    
    for(var i=0; i<16; ++i)
      mat[i] = temp[i];
  },
  
  zero : function(mat)
  {
    var temp = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
    
    for(var i=0; i<16; ++i)
      mat[i] = temp[i];
  },
  
  add : function(left, right, result)
  {
    for(var i=0; i<16; ++i)
      result[i] = left[i] + right[i];
  },
  
  mult : function(left, right, result)
  {
    var l00 =  left[00], l01 =  left[01], l02 =  left[02], l03 =  left[03],
        l10 =  left[04], l11 =  left[05], l12 =  left[06], l13 =  left[07],
        l20 =  left[08], l21 =  left[09], l22 =  left[10], l23 =  left[11],
        l30 =  left[12], l31 =  left[13], l32 =  left[14], l33 =  left[15],
        r00 = right[00], r01 = right[01], r02 = right[02], r03 = right[03],
        r10 = right[04], r11 = right[05], r12 = right[06], r13 = right[07],
        r20 = right[08], r21 = right[09], r22 = right[10], r23 = right[11],
        r30 = right[12], r31 = right[13], r32 = right[14], r33 = right[15];

    result[00] = l00*r00 + l10*r01 + l20*r02 + l30*r03, 
    result[01] = l01*r00 + l11*r01 + l21*r02 + l31*r03, 
    result[02] = l02*r00 + l12*r01 + l22*r02 + l32*r03, 
    result[03] = l03*r00 + l13*r01 + l23*r02 + l33*r03, 
    result[04] = l00*r10 + l10*r11 + l20*r12 + l30*r13, 
    result[05] = l01*r10 + l11*r11 + l21*r12 + l31*r13, 
    result[06] = l02*r10 + l12*r11 + l22*r12 + l32*r13, 
    result[07] = l03*r10 + l13*r11 + l23*r12 + l33*r13, 
    result[08] = l00*r20 + l10*r21 + l20*r22 + l30*r23, 
    result[09] = l01*r20 + l11*r21 + l21*r22 + l31*r23, 
    result[10] = l02*r20 + l12*r21 + l22*r22 + l32*r23, 
    result[11] = l03*r20 + l13*r21 + l23*r22 + l33*r23, 
    result[12] = l00*r30 + l10*r31 + l20*r32 + l30*r33, 
    result[13] = l01*r30 + l11*r31 + l21*r32 + l31*r33, 
    result[14] = l02*r30 + l12*r31 + l22*r32 + l32*r33,
    result[15] = l03*r30 + l13*r31 + l23*r32 + l33*r33;
  },
  
  transpose : function(mat)
  {
    var                 m01 =  mat[01], m02 =  mat[02], m03 =  mat[03],
        m04 =  mat[04],                 m06 =  mat[06], m07 =  mat[07],
        m08 =  mat[08], m09 =  mat[09],                 m11 =  mat[11],
        m12 =  mat[12], m13 =  mat[13], m14 =  mat[14];
        
                   mat[01] = m04, mat[02] = m08, mat[03] = m12,
    mat[04] = m01,                mat[06] = m09, mat[07] = m13,
    mat[08] = m02, mat[09] = m06,                mat[11] = m14, 
    mat[12] = m03, mat[13] = m07, mat[14] = m11;
  },
  
  inverse : function(mat)
  {
    // gauss-jordan
    var m00 = mat[00], m01 = mat[01], m02 = mat[02], m03 = mat[03],
        m10 = mat[04], m11 = mat[05], m12 = mat[06], m13 = mat[07],
        m20 = mat[08], m21 = mat[09], m22 = mat[10], m23 = mat[11],
        m30 = mat[12], m31 = mat[13], m32 = mat[14], m33 = mat[15];
        
    var r00 = 1,       r01 = 0,       r02 = 0,       r03 = 0,
        r10 = 0,       r11 = 1,       r12 = 0,       r13 = 0,
        r20 = 0,       r21 = 0,       r22 = 1,       r23 = 0,
        r30 = 0,       r31 = 0,       r32 = 0,       r33 = 1;
    
    var r00 = 1.0 / m00,
        r11 = 1.0 / m11,
        r22 = 1.0 / m22,
        r33 = 1.0 / m33;
        
        m00 *= r00,    m01 *= r00,    m02 *= r00,    m03 *= r00,
        m10 *= r11,    m11 *= r11,    m12 *= r11,    m13 *= r11,
        m20 *= r22,    m21 *= r22,    m22 *= r22,    m23 *= r22,
        m30 *= r33,    m31 *= r33,    m32 *= r33,    m33 *= r33;
    
    var f10 = m10, f20 = m20; f30 = m30;
    /*            */  /*            */  /*            */  /*            */
    r10 -= f10 * r00, /*            */  r12 -= f10 * r02, r13 -= f10 * r03,
    r20 -= f20 * r00, r21 -= f20 * r01, /*            */  r23 -= f20 * r03,
    r30 -= f30 * r00, r31 -= f30 * r01, r32 -= f30 * r02  /*            */;

    /*            */  /*            */  /*            */  /*            */
    m10 -= f10 * m00, /*            */  m12 -= f10 * m02, m13 -= f10 * m03,
    m20 -= f20 * m00, m21 -= f20 * m01, /*            */  m23 -= f20 * m03,
    m30 -= f30 * m00, m31 -= f30 * m01, m32 -= f30 * m02  /*            */;
    
    
    var f01 = m01, f21 = m21; f31 = m31;
    /*            */  r01 -= f01 * r11, r02 -= f01 * r12, r03 -= f01 * r13,
    /*            */  /*            */  /*            */  /*            */
    r20 -= f21 * r10, r21 -= f21 * r11, /*            */  r23 -= f21 * r13,
    r30 -= f31 * r10, r31 -= f31 * r11, r32 -= f31 * r12  /*            */;
    
    /*            */  m01 -= f01 * m11, m02 -= f01 * m12, m03 -= f01 * m13,
    /*            */  /*            */  /*            */  /*            */
    /*            */  m21 -= f21 * m11, /*            */  m23 -= f21 * m13,
    /*            */  m31 -= f31 * m11, m32 -= f31 * m12;
    

    var f02 = m02, f12 = m12; f32 = m32;
    /*            */  r01 -= f02 * r21, r02 -= f02 * r22, r03 -= f02 * r23,
    r10 -= f12 * r20, r11 -= f12 * r21, r12 -= f12 * r22, r13 -= f12 * r23,
    /*            */  /*            */  /*            */  /*            */
    r30 -= f32 * r20, r31 -= f32 * r21, r32 -= f32 * r22  /*            */;
    
    /*            */  m01 -= f02 * m21, m02 -= f02 * m22, m03 -= f02 * m23,
    m10 -= f12 * m20, m11 -= f12 * m21, m12 -= f12 * m22, m13 -= f12 * m23,
    /*            */  /*            */  /*            */  /*            */
    /*            */  /*            */  m32 -= f32 * m22  /*            */;
    
    var f03 = m03, f13 = m13; f23 = m23;
    /*            */  r01 -= f03 * m31, r02 -= f03 * m32, r03 -= f03 * m33,
    r10 -= f13 * m30, r11 -= f13 * m31, r12 -= f13 * m32, r13 -= f13 * m33,
    r20 -= f23 * m30, r21 -= f23 * m31, /*            */  r23 -= f23 * m33;
    /*            */  /*            */  /*            */  /*            */
    
    /*            */  m01 -= f03 * m31, m02 -= f03 * m32, m03 -= f03 * m33,
    m10 -= f13 * m30, m11 -= f13 * m31, m12 -= f13 * m32, m13 -= f13 * m33,
    /*            */  /*            */  /*            */  m23 -= f23 * m33;
    /*            */  /*            */  /*            */  /*            */
    
    mat[00] = r00, mat[01] = r01, mat[02] = r02, mat[03] = r03, 
    mat[04] = r10, mat[05] = r11, mat[06] = r12, mat[07] = r13, 
    mat[08] = r20, mat[09] = r21, mat[10] = r22, mat[11] = r23, 
    mat[12] = r30, mat[13] = r31, mat[14] = r32, mat[15] = r33;
  },
  
  /** 1st base vector (right) */
  e0 : function(mat, vec)
  {
    vec[0] = mat[00];
    vec[1] = mat[04];
    vec[2] = mat[08];
    
    vector.normalize(vec);
  },

  /** 2nd base vector (up) */
  e1 : function(mat, vec)
  {
    vec[0] = mat[01];
    vec[1] = mat[05];
    vec[2] = mat[09];
    
    vector.normalize(vec);
  },

  /** 3rd base vector (fwd) */
  e2 : function(mat, vec)
  {
    vec[0] = mat[02];
    vec[1] = mat[06];
    vec[2] = mat[10];
    
    vector.normalize(vec);
  },

  /** 4th base vector (pos) */
  e3 : function(mat, vec)
  {
    vec[0] = mat[03];
    vec[1] = mat[07];
    vec[2] = mat[11];
  }
};