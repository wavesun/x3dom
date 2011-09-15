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
    vec[0] = -vec[0],
    vec[1] = -vec[1];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0],
    result[1] = left[1] + right[1];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0],
    result[1] = left[1] - right[1];
  },
  
  dot : function(left, right)
  {
    return left[0] * right[0] + left[1] * right[1];
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
    vec[0] = -vec[0],
    vec[1] = -vec[1],
    vec[2] = -vec[2];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0],
    result[1] = left[1] + right[1],
    result[2] = left[2] + right[2];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0],
    result[1] = left[1] - right[1],
    result[2] = left[2] - right[2];
  },
  
  dot : function(left, right)
  {
    return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
  },
  
  cross : function(left, right, result)
  {
    var xl = left[0],
        yl = left[1],
        zl = left[2]
        xr = right[0],
        yr = right[1],
        zr = right[2];
    
    result[0] = (yl * zr) - (zl * yr),
    result[1] = (zl * xr) - (xl * zr),
    result[2] = (xl * yr) - (yl * xr);
  },
  
  length : function(vec)
  {
    var x = vec[0],
        y = vec[1],
        z = vec[2];
    
    return Math.sqrt(x*x + y*y + z*z);
  },
  
  normalize : function(vec)
  {
    var x = vec[0],
        y = vec[1],
        z = vec[2];
    
    var n = Math.sqrt(x*x + y*y + z*z);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec[0] = x * n,
    vec[1] = y * n,
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
    vec[0] = -vec[0],
    vec[1] = -vec[1],
    vec[2] = -vec[2],
    vec[3] = -vec[3];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0],
    result[1] = left[1] + right[1],
    result[2] = left[2] + right[2],
    result[3] = left[3] + right[3];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0],
    result[1] = left[1] - right[1],
    result[2] = left[2] - right[2],
    result[3] = left[3] - right[3];
  },
  
  dot : function(left, right)
  {
    return left[0] * right[0] + left[1] * right[1] + left[2] * right[2] + left[3] * right[3];
  },
  
  length : function(vec)
  {
    var x = vec[0],
        y = vec[1],
        z = vec[2],
        w = vec[3];
    
    return Math.sqrt(x*x + y*y + z*z);
  },
  
  normalize : function(vec)
  {
    var x = vec[0],
        y = vec[1],
        z = vec[2],
        w = vec[3];
    
    var n = Math.sqrt(x*x + y*y + z*z + w*w);
    
    if(n != 0.0)
      n = 1.0 / n;
    else
      return;
      
    vec[0] = x * n,
    vec[1] = y * n,
    vec[2] = z * n,
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
    {
      mat[00] = 1, mat[01] = 0, mat[02] = 0, mat[03] = 0;
      mat[04] = 0, mat[05] = 1, mat[06] = 0, mat[07] = 0;
      mat[08] = 0, mat[09] = 0, mat[10] = 1, mat[11] = 0;
      mat[12] = 0, mat[13] = 0, mat[14] = 0, mat[15] = 1;
    }

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

    result[00] = l00 * r00 + l10 * r01 + l20 * r02 + l30 * r03, 
    result[01] = l01 * r00 + l11 * r01 + l21 * r02 + l31 * r03, 
    result[02] = l02 * r00 + l12 * r01 + l22 * r02 + l32 * r03, 
    result[03] = l03 * r00 + l13 * r01 + l23 * r02 + l33 * r03, 
    result[04] = l00 * r10 + l10 * r11 + l20 * r12 + l30 * r13, 
    result[05] = l01 * r10 + l11 * r11 + l21 * r12 + l31 * r13, 
    result[06] = l02 * r10 + l12 * r11 + l22 * r12 + l32 * r13, 
    result[07] = l03 * r10 + l13 * r11 + l23 * r12 + l33 * r13, 
    result[08] = l00 * r20 + l10 * r21 + l20 * r22 + l30 * r23, 
    result[09] = l01 * r20 + l11 * r21 + l21 * r22 + l31 * r23, 
    result[10] = l02 * r20 + l12 * r21 + l22 * r22 + l32 * r23, 
    result[11] = l03 * r20 + l13 * r21 + l23 * r22 + l33 * r23, 
    result[12] = l00 * r30 + l10 * r31 + l20 * r32 + l30 * r33, 
    result[13] = l01 * r30 + l11 * r31 + l21 * r32 + l31 * r33, 
    result[14] = l02 * r30 + l12 * r31 + l22 * r32 + l32 * r33,
    result[15] = l03 * r30 + l13 * r31 + l23 * r32 + l33 * r33;
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
  
  det : function(mat)
  {
    var m00 = mat[00], m01 = mat[01], m02 = mat[02], m03 = mat[03],
        m10 = mat[04], m11 = mat[05], m12 = mat[06], m13 = mat[07],
        m20 = mat[08], m21 = mat[09], m22 = mat[10], m23 = mat[11],
        m30 = mat[12], m31 = mat[13], m32 = mat[14], m33 = mat[15];
    
    var d0 = m00 * ((m11 * m22 * m33 + m12 * m23 * m31 + m13 * m21 * m32) -
                    (m11 * m23 * m32 + m12 * m21 * m33 + m13 * m22 * m31));
                    
    var d1 = m10 * ((m01 * m22 * m33 + m02 * m23 * m31 + m03 * m21 * m32) -
                    (m01 * m23 * m32 + m02 * m21 * m33 + m03 * m22 * m31));
                    
    var d2 = m20 * ((m01 * m12 * m33 + m02 * m13 * m31 + m03 * m11 * m32) -
                   (m01 * m13 * m32 + m02 * m11 * m33 + m03 * m12 * m31));
                   
    var d3 = m30 * ((m01 * m12 * m23 + m02 * m13 * m21 + m03 * m11 * m22) -
                   (m01 * m13 * m22 + m02 * m11 * m23 + m03 *m12 * m21));
                   
   return d0 - d1 + d2 - d3;
  },
  
  inverse : function(mat)
  {
    /*
    if(this.det(mat) == 0)
      return;
    */
    
    // based on code of glMatrix.js (Brandon Jones 2011)
    var m00 = mat[00], m01 = mat[01], m02 = mat[02], m03 = mat[03],
        m10 = mat[04], m11 = mat[05], m12 = mat[06], m13 = mat[07],
        m20 = mat[08], m21 = mat[09], m22 = mat[10], m23 = mat[11],
        m30 = mat[12], m31 = mat[13], m32 = mat[14], m33 = mat[15];

    var d00 = m00 * m11 - m01 * m10,
        d01 = m00 * m12 - m02 * m10,
        d02 = m00 * m13 - m03 * m10,
        d03 = m01 * m12 - m02 * m11,
        d04 = m01 * m13 - m03 * m11,
        d05 = m02 * m13 - m03 * m12,
        d06 = m20 * m31 - m21 * m30,
        d07 = m20 * m32 - m22 * m30,
        d08 = m20 * m33 - m23 * m30,
        d09 = m21 * m32 - m22 * m31,
        d10 = m21 * m33 - m23 * m31,
        d11 = m22 * m33 - m23 * m32;

    var det_inv = 1.0 / (d00 * d11 - d01 * d10 + d02 * d09 + d03 * d08 - d04 * d07 + d05 * d06);

    mat[00] = ( m11 * d11 - m12 * d10 + m13 * d09) * det_inv;
    mat[01] = (-m01 * d11 + m02 * d10 - m03 * d09) * det_inv;
    mat[02] = ( m31 * d05 - m32 * d04 + m33 * d03) * det_inv;
    mat[03] = (-m21 * d05 + m22 * d04 - m23 * d03) * det_inv;
    mat[04] = (-m10 * d11 + m12 * d08 - m13 * d07) * det_inv;
    mat[05] = ( m00 * d11 - m02 * d08 + m03 * d07) * det_inv;
    mat[06] = (-m30 * d05 + m32 * d02 - m33 * d01) * det_inv;
    mat[07] = ( m20 * d05 - m22 * d02 + m23 * d01) * det_inv;
    mat[08] = ( m10 * d10 - m11 * d08 + m13 * d06) * det_inv;
    mat[09] = (-m00 * d10 + m01 * d08 - m03 * d06) * det_inv;
    mat[10] = ( m30 * d04 - m31 * d02 + m33 * d00) * det_inv;
    mat[11] = (-m20 * d04 + m21 * d02 - m23 * d00) * det_inv;
    mat[12] = (-m10 * d09 + m11 * d07 - m12 * d06) * det_inv;
    mat[13] = ( m00 * d09 - m01 * d07 + m02 * d06) * det_inv;
    mat[14] = (-m30 * d03 + m31 * d01 - m32 * d00) * det_inv;
    mat[15] = ( m20 * d03 - m21 * d01 + m22 * d00) * det_inv;
  },
  
  translate : function(mat, vec)
  {
    mat[03] = vec[0];
    mat[13] = vec[1];
    mat[23] = vec[2];
  },

  scale : function(mat, vec)
  {
    mat[00] = vec[0];
    mat[11] = vec[1];
    mat[22] = vec[2];
  },
  
  lookAt : function(eye, at, up, mat)
  {
    var eye_x = eye[0], eye_y = eye[1], eye_z = eye[0],
        at_x  = at[0],  at_y  = at[1],  at_z  = at[2],
        up_x  = up[2],  up_y  = up[2],  up_z  = up[2];
        
    if(eye_x == at_x && eye_x == at_x && eye_x == at_x)
    {
      this.identity(mat);
      return;
    }
    
    // math.vec3.subtract(eye, at, dir);
    var dir_x = eye_x - at_x,
        dir_y = eye_y - at_y,
        dir_z = eye_z - at_z;
    
    // math.vec3.normalize(dir);
    var n_dir = 1.0 / Math.sqrt(dir_x*dir_x + dir_y*dir_y + dir_z*dir_z);
    dir_x *= n_dir,
    dir_y *= n_dir,
    dir_z *= n_dir;
    
    // math.vec3.cross(up, dir, right);
    var right_x = up_y*dir_z - up_z*dir_y,
        right_y = up_z*dir_x - up_x*dir_z,
        right_z = up_x*dir_y - up_y*dir_x;
    
    // math.vec3.normalize(right);
    var n_right = 1.0 / Math.sqrt(dir_x*dir_x + dir_y*dir_y + dir_z*dir_z);
    right_x *= n_right,
    right_y *= n_right,
    right_z *= n_right;
    
    // math.vec3.cross(dir, right, newup);
    var newup_x = dir_y*right_z - dir_z*right_y,
        newup_y = dir_z*right_x - dir_x*right_z,
        newup_z = dir_x*right_y - dir_y*right_x;
    
    // math.vec3.normalize(newup);
    var n_newup = 1.0 / Math.sqrt(newup_x*newup_x + newup_y*newup_y + newup_z*newup_z);
    newup_x *= n_newup,
    newup_y *= n_newup,
    newup_z *= n_newup;

    // this.mult(mat, temp, mat);
    mat[00] = right_x, mat[01] = newup_x, mat[02] = dir_x, mat[03] = 0,
    mat[04] = right_y, mat[05] = newup_y, mat[06] = dir_y, mat[07] = 0,
    mat[08] = right_z, mat[09] = newup_z, mat[10] = dir_z, mat[11] = 0,
    mat[12] = -(right_x * eye_x + right_y * eye_y + right_z * eye_z),
    mat[13] = -(newup_x * eye_x + newup_y * eye_y + newup_z * eye_z),
    mat[14] = -(dir_x   * eye_x + dir_x   * eye_y + dir_x   * eye_z),
    mat[15] = 1;
  },
  
  lookAt2 : function(eye, at, up, mat)
  {
    var dir = math.vec3.create();
    var newup = math.vec3.create();
    var temp = math.mat4x4.create();
    var right = math.mat4x4.create();
    
    math.vec3.subtract(eye, at, dir);
    math.vec3.normalize(dir);
    math.vec3.cross(up, dir, right);
    
    math.vec3.normalize(right);
    math.vec3.cross(dir, right, newup);
    math.vec3.normalize(newup);
    
    this.mult(mat, temp, mat);
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
  
/** The Quaternion */
math.quat = 
{
  create : function()
  {
    var quat = new math.Float32Array(3);
    
    if(arguments.length)
    {
      if(typeof arguments[0] == "object")
        for(var i=0; i<4; ++i)
          quat[i] = arguments[0][i];
          
      else
        for(var i=0; i<4; ++i)
          quat[i] = arguments[i];
    }
    
    return quat;
  },
  
  negate : function(quat)
  {
    quat[0] = -quat[0],
    quat[1] = -quat[1],
    quat[2] = -quat[2],
    quat[3] = -quat[3];
  },
  
  add : function(left, right, result)
  {
    result[0] = left[0] + right[0],
    result[1] = left[1] + right[1],
    result[2] = left[2] + right[2],
    result[3] = left[3] + right[3];
  },
  
  subtract : function(left, right, result)
  {
    result[0] = left[0] - right[0],
    result[1] = left[1] - right[1],
    result[2] = left[2] - right[2],
    result[3] = left[3] - right[3];
  },
  
  dot : function(left, right)
  {
    return left[0] * right[0] + left[1] * right[1] + left[2] * right[2] + left[3] * right[3];
  },
  
  mult : function(left, right, result)
  {
    result[0] = left[3] * right[0] + left[0] * right[3] + left[1] * right[2] - left[2] * right[1],
    result[1] = left[3] * right[1] + left[1] * right[3] + left[2] * right[0] - left[0] * right[2],
    result[2] = left[3] * right[2] + left[2] * right[3] + left[0] * right[1] - left[1] * right[0],
    result[3] = left[3] * right[3] - left[0] * right[0] - left[1] * right[1] - left[2] * right[2];
  },
  
  inverse : function(quat)
  {
    quat[0] = -quat[0],
    quat[1] = -quat[1],
    quat[2] = -quat[2];
  },
  
  normalize : function(quat)
  {
    var x = quat[0],
        y = quat[1],
        z = quat[2],
        w = quat[3];
    
    var d = x*x + y*y + z*z + w*w;
    if(d)
    {
      var f = 1.0 / Math.sqrt(d);
      quat[0] *= f;
      quat[1] *= f;
      quat[2] *= f;
      quat[3] *= f;
    }
  }
};